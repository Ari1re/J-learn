// Kana data. Katakana is generated from hiragana (same order, +0x60 code point).
window.KANA=(()=>{
const BASIC=[
 ['', 'あいうえお',['a','i','u','e','o']],
 ['k','かきくけこ',['ka','ki','ku','ke','ko']],
 ['s','さしすせそ',['sa','shi','su','se','so']],
 ['t','たちつてと',['ta','chi','tsu','te','to']],
 ['n','なにぬねの',['na','ni','nu','ne','no']],
 ['h','はひふへほ',['ha','hi','fu','he','ho']],
 ['m','まみむめも',['ma','mi','mu','me','mo']],
 ['y','や_ゆ_よ',['ya','','yu','','yo']],
 ['r','らりるれろ',['ra','ri','ru','re','ro']],
 ['w','わ___を',['wa','','','','wo']],
 ['n','ん____',['n','','','','']]
];
const DAKU=[
 ['g','がぎぐげご',['ga','gi','gu','ge','go']],
 ['z','ざじずぜぞ',['za','ji','zu','ze','zo']],
 ['d','だぢづでど',['da','ji','zu','de','do']],
 ['b','ばびぶべぼ',['ba','bi','bu','be','bo']],
 ['p','ぱぴぷぺぽ',['pa','pi','pu','pe','po']]
];
const YB=[['き','ky'],['し','sh'],['ち','ch'],['に','ny'],['ひ','hy'],['み','my'],['り','ry'],['ぎ','gy'],['じ','j'],['び','by'],['ぴ','py']];
const COMBO=YB.map(([k,r])=>[r,k+'ゃ'+'_'+k+'ゅ'+'_'+k+'ょ',[r+'a',r+'u',r+'o']]);
const NOTE={
 'し':'Written shi, not si.','ち':'Written chi, not ti.','つ':'Written tsu: like the “ts” in “cats”, then u.',
 'ふ':'Between f and h. Blow gently; your lips don’t touch your teeth.','を':'Read “o”. Used almost only as the object particle.',
 'ん':'The only kana with no vowel. Sounds like n, m or ng depending on the next sound.',
 'は':'Read “wa” when it is the topic particle.','へ':'Read “e” when it is the direction particle.',
 'ら':'The Japanese r is a light tap, somewhere between r, l and d.','り':'Light tap r, like the others in this row.','る':'Light tap r.','れ':'Light tap r.','ろ':'Light tap r.',
 'ぢ':'Sounds the same as じ. Rare: mostly in words like はなぢ (nosebleed).','づ':'Sounds the same as ず. Rare: mostly in words like つづく (to continue).',
 'う':'Often almost silent at the end of words, as in です (desu → “dess”).'
};
const HEX={'あ':['あめ','rain'],'い':['いぬ','dog'],'う':['うみ','sea'],'え':['えき','station'],'お':['おちゃ','tea'],
'か':['かさ','umbrella'],'き':['き','tree'],'く':['くつ','shoes'],'け':['けしごむ','eraser'],'こ':['こども','child'],
'さ':['さかな','fish'],'し':['しお','salt'],'す':['すし','sushi'],'せ':['せんせい','teacher'],'そ':['そら','sky'],
'た':['たまご','egg'],'ち':['ちず','map'],'つ':['つくえ','desk'],'て':['て','hand'],'と':['とり','bird'],
'な':['なつ','summer'],'に':['にく','meat'],'ぬ':['ぬいぐるみ','stuffed toy'],'ね':['ねこ','cat'],'の':['のみもの','a drink'],
'は':['はな','flower'],'ひ':['ひと','person'],'ふ':['ふね','boat'],'へ':['へや','room'],'ほ':['ほん','book'],
'ま':['まど','window'],'み':['みず','water'],'む':['むし','bug'],'め':['め','eye'],'も':['もも','peach'],
'や':['やま','mountain'],'ゆ':['ゆき','snow'],'よ':['よる','night'],
'ら':['らいねん','next year'],'り':['りんご','apple'],'る':['るす','not at home'],'れ':['れきし','history'],'ろ':['ろうそく','candle'],
'わ':['わたし','I, me'],'を':['ほんをよむ','read a book'],'ん':['ほん','book (ends in ん)'],
'が':['がっこう','school'],'ぎ':['ぎんこう','bank'],'ご':['ごはん','rice, meal'],'ざ':['ざっし','magazine'],'じ':['じかん','time'],'ず':['ちず','map'],'ぜ':['かぜ','wind; a cold'],'ぞ':['かぞく','family'],
'だ':['ともだち','friend'],'で':['でんわ','telephone'],'ど':['どこ','where'],'ば':['ばす','bus (usually バス)'],'び':['びょういん','hospital'],'ぶ':['ぶた','pig'],'べ':['たべる','to eat'],'ぼ':['ぼうし','hat'],
'ぱ':['かんぱい','cheers!'],'ぴ':['ぴかぴか','sparkling'],'ぷ':['てんぷら','tempura'],'ぺ':['ぺらぺら','fluent'],'ぽ':['さんぽ','a walk'],
'きゃ':['きゃく','guest'],'しゃ':['しゃしん','photo'],'しゅ':['しゅくだい','homework'],'しょ':['としょかん','library'],'ちゃ':['おちゃ','tea'],'ちゅ':['ちゅうい','caution'],'きょ':['きょう','today'],'りょ':['りょこう','trip'],'じゅ':['じゅぎょう','class, lesson'],'びょ':['びょういん','hospital'],'にゃ':['にゃあ','meow']};
const KEX={'ア':['アニメ','anime'],'イ':['イギリス','the UK'],'ウ':['ウール','wool'],'エ':['エアコン','air conditioner'],'オ':['オレンジ','orange'],
'カ':['カメラ','camera'],'キ':['キロ','kilo'],'ク':['クラス','class'],'ケ':['ケーキ','cake'],'コ':['コーヒー','coffee'],
'サ':['サッカー','soccer'],'シ':['シャツ','shirt'],'ス':['スポーツ','sports'],'セ':['セーター','sweater'],'ソ':['ソファ','sofa'],
'タ':['タクシー','taxi'],'チ':['チーズ','cheese'],'ツ':['ツアー','tour'],'テ':['テレビ','TV'],'ト':['トマト','tomato'],
'ナ':['ナイフ','knife'],'ニ':['ニュース','news'],'ヌ':['ヌードル','noodles'],'ネ':['ネクタイ','necktie'],'ノ':['ノート','notebook'],
'ハ':['ハンバーガー','hamburger'],'ヒ':['ヒーター','heater'],'フ':['フォーク','fork'],'ヘ':['ヘルメット','helmet'],'ホ':['ホテル','hotel'],
'マ':['マスク','mask'],'ミ':['ミルク','milk'],'ム':['ムード','mood'],'メ':['メール','email'],'モ':['モデル','model'],
'ヤ':['ヤード','yard (length)'],'ユ':['ユニフォーム','uniform'],'ヨ':['ヨーグルト','yogurt'],
'ラ':['ラジオ','radio'],'リ':['リボン','ribbon'],'ル':['ルール','rule'],'レ':['レストラン','restaurant'],'ロ':['ロボット','robot'],
'ワ':['ワイン','wine'],'ン':['パン','bread (ends in ン)'],
'ガ':['ガム','chewing gum'],'ギ':['ギター','guitar'],'グ':['グラス','glass'],'ゲ':['ゲーム','game'],'ゴ':['ゴール','goal'],'ジ':['ジュース','juice'],'ズ':['チーズ','cheese'],'ゼ':['ゼロ','zero'],
'ダ':['ダンス','dance'],'デ':['デザート','dessert'],'ド':['ドア','door'],'バ':['バス','bus'],'ビ':['ビル','building'],'ブ':['ブログ','blog'],'ベ':['ベッド','bed'],'ボ':['ボール','ball'],
'パ':['パン','bread'],'ピ':['ピアノ','piano'],'プ':['プール','pool'],'ペ':['ペン','pen'],'ポ':['ポスト','mailbox'],
'シャ':['シャツ','shirt'],'ジュ':['ジュース','juice'],'チョ':['チョコ','chocolate'],'ニュ':['ニュース','news'],'キャ':['キャンプ','camping'],'ショ':['ショップ','shop'],'メ':['メール','email']};
const LOOK=[
 ['シ','ツ','シ: the two short strokes sit on the left, and the long stroke sweeps up from bottom left. ツ: the short strokes sit on top, and the long stroke falls down from top right.'],
 ['ソ','ン','ソ: the short stroke is on top and the long stroke falls downward. ン: the short stroke is on the left and the long stroke sweeps upward.'],
 ['さ','ち','Mirror images at the bottom: さ’s curve opens one way, ち’s the other. Remember ち as “chi” and look for the hook at the bottom right.'],
 ['ぬ','め','ぬ ends with a small loop at the bottom right. め has no loop.'],
 ['わ','れ','ね','All three share the same left stroke. わ ends in a smooth curve, れ kicks out to the right, ね ends in a loop.'],
 ['る','ろ','る has a loop at the bottom. ろ is open.'],
 ['は','ほ','ほ has an extra line across the top.'],
 ['き','さ','き has two horizontal lines; さ has one.'],
 ['ク','タ','タ has an extra short stroke inside.'],
 ['ウ','ワ','ウ has a short stroke on top; ワ doesn’t.'],
 ['コ','ユ','ユ’s bottom line sticks out past the side.'],
 ['ノ','メ','メ is ノ with an extra stroke crossing it.']
];
const ALT={shi:['si'],chi:['ti'],tsu:['tu'],fu:['hu'],ji:['zi','di'],zu:['du'],wo:['o'],n:['nn',"n'"],sha:['sya'],shu:['syu'],sho:['syo'],cha:['tya','cya'],chu:['tyu','cyu'],cho:['tyo','cyo'],ja:['zya','jya'],ju:['zyu','jyu'],jo:['zyo','jyo']};
const kata=s=>s.replace(/[ぁ-ゖ]/g,c=>String.fromCharCode(c.charCodeAt(0)+0x60));
function build(rows,set){const out=[];rows.forEach(([r,str,ro],ri)=>{  const parts=set==='combo'?str.split('_'):[...str];
  parts.forEach((h,ci)=>{if(h==='_'||!h){out.push(null);return}out.push({h,k:kata(h),ro:ro[ci],set,row:ri,col:ci})})});return out}
const ALL={basic:build(BASIC,'basic'),daku:build(DAKU,'daku'),combo:build(COMBO,'combo')};
return {ALL,COLS:{basic:5,daku:5,combo:3},HEAD:{basic:['a','i','u','e','o'],daku:['a','i','u','e','o'],combo:['ya','yu','yo']},NOTE,HEX,KEX,LOOK,ALT,kata};
})();
