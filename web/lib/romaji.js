/* Kana → Hepburn romaji for the app's text format.
   Input uses {漢字|かんじ} for furigana and [..] for highlights.
   Returns '' when the text has kanji without a reading (it can't be read reliably). */
(function(root){
const T={あ:'a',い:'i',う:'u',え:'e',お:'o',か:'ka',き:'ki',く:'ku',け:'ke',こ:'ko',さ:'sa',し:'shi',す:'su',せ:'se',そ:'so',
た:'ta',ち:'chi',つ:'tsu',て:'te',と:'to',な:'na',に:'ni',ぬ:'nu',ね:'ne',の:'no',は:'ha',ひ:'hi',ふ:'fu',へ:'he',ほ:'ho',
ま:'ma',み:'mi',む:'mu',め:'me',も:'mo',や:'ya',ゆ:'yu',よ:'yo',ら:'ra',り:'ri',る:'ru',れ:'re',ろ:'ro',わ:'wa',ゐ:'i',ゑ:'e',を:'o',ん:'n',
が:'ga',ぎ:'gi',ぐ:'gu',げ:'ge',ご:'go',ざ:'za',じ:'ji',ず:'zu',ぜ:'ze',ぞ:'zo',だ:'da',ぢ:'ji',づ:'zu',で:'de',ど:'do',
ば:'ba',び:'bi',ぶ:'bu',べ:'be',ぼ:'bo',ぱ:'pa',ぴ:'pi',ぷ:'pu',ぺ:'pe',ぽ:'po',ゔ:'vu',ぁ:'a',ぃ:'i',ぅ:'u',ぇ:'e',ぉ:'o',ゎ:'wa'};
const PUNCT={'。':'.','、':',','！':'!','？':'?','「':'“','」':'”','『':'“','』':'”','～':'~','〜':'~','・':' ','　':' ','（':'(','）':')','：':':','…':'…'};
const SMALLY={ゃ:'a',ゅ:'u',ょ:'o'},SMALLV={ぁ:'a',ぃ:'i',ぅ:'u',ぇ:'e',ぉ:'o'};
const PART={は:'wa',へ:'e',を:'o',が:'ga',に:'ni',で:'de',と:'to',も:'mo',の:'no',や:'ya',か:'ka'};
const isHira=c=>c>='ぁ'&&c<='ゖ';
const isKata=c=>(c>='ァ'&&c<='ヺ')||c==='ー';
const isKanji=c=>/[㐀-鿿豈-﫿々〆ヵヶ]/.test(c);
const toHira=s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
const cons=r=>r==='u'?'w':r==='vu'?'v':r==='fu'?'f':r==='tsu'?'ts':r==='te'?'t':r==='de'?'d':/^(shi|chi|ji)$/.test(r)?r.slice(0,-1):r.slice(0,-1);
// Plain kana run → romaji
function kana(str){
  const s=toHira(str);let out='',i=0,tsu=false;
  const add=r=>{if(tsu){out+=(r.startsWith('ch')?'t':/^[a-z]/.test(r)&&!/^[aeiou]/.test(r)?r[0]:'');tsu=false}out+=r};
  while(i<s.length){
    const c=s[i],n=s[i+1];
    if(c==='っ'){tsu=true;i++;continue}
    if(c==='ー'){const m=out.match(/[aeiou](?=[^aeiou]*$)/);if(m)out+=m[0];i++;continue}
    if(c==='ん'){out+=(n&&(/[あいうえおやゆよ]/.test(n)))?"n'":'n';i++;continue}
    const base=T[c];
    if(base){
      if(n&&SMALLY[n]&&base.endsWith('i')&&base.length>1){const st=/^(shi|chi|ji)$/.test(base)?base.slice(0,-1):base.slice(0,-1)+'y';add(st+SMALLY[n]);i+=2;continue}
      if(n&&SMALLV[n]&&base.length>1||n&&SMALLV[n]&&(c==='う'||c==='ゔ')){add(cons(base)+SMALLV[n]);i+=2;continue}
      add(base);i++;continue;
    }
    out+=PUNCT[c]??c;i++;
  }
  return out;
}
function toRomaji(markup){
  if(!markup)return '';
  // tokens: ruby {k|r}, forced particle [x], or single chars
  const toks=[];const re=/\{([^|}]+)\|([^}]+)\}|\[([^\]]+)\]|([\s\S])/g;let m;
  while((m=re.exec(String(markup)))){
    if(m[1])toks.push({t:'ruby',r:m[2]});
    else if(m[3]!==undefined){
      const inner=m[3];
      if(PART[inner]||/^(から|まで|より|だけ|しか|けど)$/.test(inner))toks.push({t:'part',c:inner});
      else{const sub=[];const r2=/\{([^|}]+)\|([^}]+)\}|([\s\S])/g;let k;while((k=r2.exec(inner)))sub.push(k[1]?{t:'ruby',r:k[2]}:{t:'ch',c:k[3]});toks.push(...sub)}
    }
    else toks.push({t:'ch',c:m[4]});
  }
  const strong=t=>t&&(t.t==='ruby'||(t.t==='ch'&&(isKanji(t.c)||isKata(t.c))));
  const after=t=>!t||t.t==='ruby'||t.t==='part'||(t.t==='ch'&&!isHira(t.c));
  // mark particles: single hiragana between a word and a non-hiragana / word start
  toks.forEach((t,i)=>{
    if(t.t!=='ch'||!PART[t.c])return;
    const p=toks[i-1],n=toks[i+1];
    if(!p||(p.t==='ch'&&!isHira(p.c)&&!isKanji(p.c)&&!isKata(p.c)))return;
    if(!after(n))return;
    if(p.t==='part')return;
    if(strong(p)||(p.t==='ch'&&isHira(p.c)&&'はへをがにでともの'.includes(t.c)))t.t='part';
  });
  let out='',buf='',run='';
  const flush=()=>{if(buf){out+=kana(buf);buf=''}};
  const gap=()=>{flush();out+=' '};
  for(let i=0;i<toks.length;i++){
    const t=toks[i];
    if(t.t==='ch'&&isKanji(t.c))return '';
    if(t.t==='part'){flush();const r=PART[t.c]||kana(t.c);out+=' '+r+' ';run='';continue}
    if(t.t==='ruby'){
      if(i>0&&toks[i-1].t==='ch'&&isKata(toks[i-1].c)){gap();buf+=t.r;run='';continue}
      // a hiragana word (2+ kana) right before a kanji word gets a space; single kana like お, ご or okurigana don't
      if(run.length>=2)gap();
      buf+=t.r;run='';continue;
    }
    // space where a kanji word meets a katakana word, either way round
    if(isKata(t.c)&&t.c!=='ー'&&i>0&&toks[i-1].t==='ruby')gap();
    if(t.t==='ch'&&!isKata(t.c)&&i>0&&toks[i-1].t==='ch'&&isKata(toks[i-1].c)&&toks[i+1]&&toks[i+1].t==='ruby'&&!isHira(t.c))gap();
    // space before the polite copula です
    if(t.c==='で'&&toks[i+1]&&toks[i+1].c==='す'&&i>0&&toks[i-1].t!=='part')gap();
    buf+=t.c;run=isHira(t.c)?run+t.c:'';
  }
  flush();
  return out.replace(/\s+([.,!?”)])/g,'$1').replace(/([“(])\s+/g,'$1').replace(/\s{2,}/g,' ').trim();
}
root.toRomaji=toRomaji;root.kanaToRomaji=kana;
})(typeof window!=='undefined'?window:globalThis);
