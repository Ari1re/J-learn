/* Reads Anki decks (.apkg / .colpkg) and Anki plain-text exports (.txt / .tsv / .csv) in the browser.
   Needs JSZip, fzstd and sql.js (initSqlJs) for .apkg; text files need nothing. */
(function(root){
const ENT={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '};
function decode(s){return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,(m,e)=>{if(e[0]==='#'){const n=e[1]==='x'||e[1]==='X'?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return isFinite(n)?String.fromCodePoint(n):m}return ENT[e.toLowerCase()]??m})}
// Anki field HTML -> plain text, keeping furigana as {kanji|reading}
function clean(s){
  s=String(s||'')
    .replace(/\[sound:[^\]]*\]/g,'')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi,'')
    .replace(/<br\s*\/?>/gi,' / ').replace(/<\/(div|p|li)>/gi,' / ')
    .replace(/<[^>]+>/g,'');
  s=decode(s).replace(/[{}|]/g,' ');
  s=s.replace(/\s?([㐀-鿿豈-﫿々〆ヵヶ]+)\[([^\]\s]+)\]/g,'{$1|$2}');
  return s.replace(/(\s*\/\s*)+$/,'').replace(/^(\s*\/\s*)+/,'').replace(/\s+/g,' ').trim();
}
const RX={
  front:/^(expression|vocab(ulary)?([ -_]?(kanji|word))?|word|kanji|front|japanese|term|target|sentence|keyword|日本語|単語)/i,
  read:/(reading|kana|furigana|hiragana|pronunciation|読み)/i,
  mean:/(meaning|english|definition|gloss|translation|back|意味)/i,
  skip:/(audio|sound|image|picture|pic|media|pitch|frequency|freq|tags?)$/i
};
function guessMap(fields,sample){
  const idx=re=>fields.findIndex(n=>re.test(n));
  let f=idx(RX.front);if(f<0)f=0;
  let r=fields.findIndex((n,i)=>i!==f&&RX.read.test(n));
  let m=fields.findIndex((n,i)=>i!==f&&i!==r&&RX.mean.test(n));
  if(m<0){m=fields.findIndex((n,i)=>i!==f&&i!==r&&!RX.skip.test(n)&&sample.some(x=>x[i]));}
  return {f,r,m};
}
function splitCSV(line,sep){
  const out=[];let cur='',q=false;
  for(let i=0;i<line.length;i++){const c=line[i];
    if(q){if(c==='"'){if(line[i+1]==='"'){cur+='"';i++}else q=false}else cur+=c}
    else if(c==='"'&&cur==='')q=true; else if(c===sep){out.push(cur);cur=''} else cur+=c}
  out.push(cur);return out;
}
function parseText(name,text){
  const lines=text.replace(/^﻿/,'').split(/\r?\n/);
  let sep=/\.csv$/i.test(name)?',':'\t',cols=null,html=true,deckCol=-1;
  const rows=[];
  for(const l of lines){
    if(l.startsWith('#')){
      const m=l.match(/^#(\w[\w ]*):(.*)$/);if(!m)continue;const k=m[1].toLowerCase(),v=m[2].trim();
      if(k==='separator')sep={tab:'\t',comma:',',semicolon:';',pipe:'|',space:' ',colon:':'}[v.toLowerCase()]||v;
      else if(k==='columns')cols=v.split(sep==='\t'?'\t':sep);
      else if(k==='html')html=v==='true';
      else if(k==='deck column')deckCol=+v-1;
      continue;
    }
    if(!l.trim())continue;
    rows.push(splitCSV(l,sep));
  }
  if(!rows.length)throw new Error('No cards found in that file.');
  const width=Math.max(...rows.map(r=>r.length));
  const fields=cols&&cols.length>=width?cols.slice(0,width):Array.from({length:width},(_,i)=>cols&&cols[i]||`Column ${i+1}`);
  const notes=rows.map((r,i)=>({id:'t'+i,sub:deckCol>=0?clean(r[deckCol]||''):'',f:fields.map((_,j)=>clean(r[j]||''))}));
  const base=name.replace(/\.[^.]+$/,'');
  return [{name:base,notetype:'Text export',fields,notes,map:guessMap(fields,notes.slice(0,50).map(n=>n.f))}];
}
let SQLp=null;
function getSQL(){
  if(SQLp)return SQLp;
  const load=src=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=()=>rej(new Error('Could not load '+src));document.head.appendChild(s)});
  SQLp=(async()=>{
    try{await load('lib/sql-wasm.js');return await root.initSqlJs({locateFile:f=>'lib/'+f})}
    catch(e){root.initSqlJs=undefined;await load('lib/sql-asm.js');return await root.initSqlJs()}
  })();
  return SQLp;
}
function q(db,sql){try{const r=db.exec(sql);return r.length?r[0].values:[]}catch(e){return null}}
function readCollection(db){
  const tables=new Set((q(db,"SELECT name FROM sqlite_master WHERE type='table'")||[]).map(r=>r[0]));
  const models={};
  if(tables.has('notetypes')&&tables.has('fields')){
    (q(db,'SELECT id,name FROM notetypes')||[]).forEach(([id,name])=>models[id]={name,fields:[]});
    (q(db,'SELECT ntid,ord,name FROM fields')||[]).sort((a,b)=>a[1]-b[1]).forEach(([nt,ord,name])=>{if(models[nt])models[nt].fields[ord]=name});
  }else{
    const r=q(db,'SELECT models FROM col');
    if(r&&r[0]&&r[0][0]){const M=JSON.parse(r[0][0]);for(const id in M)models[id]={name:M[id].name,fields:(M[id].flds||[]).slice().sort((a,b)=>a.ord-b.ord).map(f=>f.name)}}
  }
  const decks={};
  if(tables.has('decks'))(q(db,'SELECT id,name FROM decks')||[]).forEach(([id,name])=>decks[id]=String(name).split('\x1f').join('::'));
  else{const r=q(db,'SELECT decks FROM col');if(r&&r[0]&&r[0][0]){const D=JSON.parse(r[0][0]);for(const id in D)decks[id]=D[id].name}}
  const rows=q(db,'SELECT n.id,n.mid,n.flds,MIN(c.did) FROM notes n LEFT JOIN cards c ON c.nid=n.id GROUP BY n.id')||q(db,'SELECT id,mid,flds,0 FROM notes')||[];
  return {models,decks,rows};
}
async function parseApkg(name,buf){
  if(!root.JSZip)throw new Error('The zip reader did not load.');
  const zip=await root.JSZip.loadAsync(buf);
  let bytes=null;
  if(zip.file('collection.anki21b')){
    const z=await zip.file('collection.anki21b').async('uint8array');
    if(!root.fzstd)throw new Error('The decompressor did not load.');
    bytes=root.fzstd.decompress(z);
  }else if(zip.file('collection.anki21'))bytes=await zip.file('collection.anki21').async('uint8array');
  else if(zip.file('collection.anki2'))bytes=await zip.file('collection.anki2').async('uint8array');
  else throw new Error('That file has no Anki collection inside.');
  const SQL=await getSQL();
  const db=new SQL.Database(bytes);
  let C;try{C=readCollection(db)}finally{db.close()}
  const groups={};
  for(const [id,mid,flds,did] of C.rows){
    const m=C.models[mid]||{name:'Notes',fields:[]};
    const f=String(flds).split('\x1f').map(clean);
    if(!f.some(Boolean))continue;
    const g=groups[mid]||(groups[mid]={notetype:m.name,fields:m.fields.length?m.fields.slice():f.map((_,i)=>`Field ${i+1}`),notes:[]});
    while(g.fields.length<f.length)g.fields.push(`Field ${g.fields.length+1}`);
    const dn=C.decks[did]||'';
    g.notes.push({id:'n'+id,sub:dn,f});
  }
  const list=Object.values(groups).filter(g=>g.notes.length).sort((a,b)=>b.notes.length-a.notes.length);
  if(!list.length)throw new Error('No cards found in that deck.');
  if(list.length===1&&list[0].notes.length===1&&/update|newer/i.test(list[0].notes[0].f.join(' ')))throw new Error('This export needs a newer importer. In Anki, export again with “Support older Anki versions” ticked.');
  const base=name.replace(/\.[^.]+$/,'');
  return list.map(g=>{
    const tops=new Set(g.notes.map(n=>n.sub.split('::')[0]).filter(Boolean));
    const top=tops.size===1?[...tops][0]:base;
    g.notes.forEach(n=>{n.sub=n.sub.split('::').slice(1).join(' › ')||n.sub.split('::')[0]||top});
    return {name:list.length>1?`${top} · ${g.notetype}`:top,notetype:g.notetype,fields:g.fields,notes:g.notes,map:guessMap(g.fields,g.notes.slice(0,50).map(n=>n.f))};
  });
}
async function parseFile(file){
  const name=file.name||'deck';
  if(/\.(apkg|colpkg)$/i.test(name))return parseApkg(name,await file.arrayBuffer());
  if(/\.(txt|tsv|csv)$/i.test(name))return parseText(name,await file.text());
  throw new Error('Use an .apkg deck or a .txt / .tsv / .csv export.');
}
root.AnkiImport={parseFile,parseApkg,parseText,clean,guessMap};
})(typeof window!=='undefined'?window:globalThis);
