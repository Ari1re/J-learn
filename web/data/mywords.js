window.MW=(()=>{const W=[
["{犬|いぬ}", "inu", "dog", "N5", "The normal word for any dog. A puppy is 子犬 (child + dog).", "Slang: a spy or snitch."],
["{小|ちい}さい", "chiisai", "small", "N5", "Cute, casual form: 小っちゃい (ちっちゃい)", "Also: little, young, quiet (sound)."],
["いい", "ii", "good, fine", "N5", "でもいい = “~ is fine too”", "Also: enough, and “no thanks” (いいです when refusing)."],
["どっち", "docchi", "which one (of two)", "N5", "Casual form of どちら", "Also: which way, either."],
["{又|また}", "mata", "again", "N5", "Usually written in hiragana: また", "Also: and, also, moreover."],
["{可愛|かわい}い", "kawaii", "cute", "N4", "Usually written in hiragana: かわいい", "Also: adorable, dear. Usually written かわいい."],
["{子犬|こいぬ}", "koinu", "puppy", "N4", "Literally “child dog”: 子 (child) + 犬 (dog). Only for young dogs.", "Only for young dogs. Literally 子 (child) + 犬 (dog)."],
["ワンちゃん / ワンコ", "wan-chan / wanko", "doggy (cute word for any dog)", "N4", "ワン = woof. Like “doggo”: used for dogs of any age, not just puppies. ワンコ is also written ワン子.", ""],
["{頑張|がんば}る", "ganbaru", "to do your best", "N4", "頑張れ · 頑張って · 頑張ってください", "Also: to hang in there, to persist, to insist."],
["{呼|よ}ぶ", "yobu", "to call", "N4", "呼び方 = way of calling", "Also: to invite, to call by a name, to summon."],
["{呼|よ}び{方|かた}", "yobikata", "way of calling, name for", "N4", "呼び (calling) + 方 (way of ~ing)", "Also: what something is called."],
["{止|や}める", "yameru", "to stop", "N4", "Quitting a job is written 辞める", "Read やめる: to stop doing, to quit. Read とめる: to stop something (a car, a machine). Quitting a job: 辞める."],
["けど", "kedo", "but, though", "N4", "Casual form of けれど", "At the end of a sentence it softens it or leaves it hanging."],
["ふざける", "fuzakeru", "to joke around, mess around", "Bonus", "また ふざけるんだな = messing around again, huh?", "Also: to fool around, to mock. ふざけるな = don’t mess with me."],
["{精々|せいぜい}", "seizei", "at most, as best you can", "Bonus", "Usually hiragana; sarcastic in せいぜい頑張れ", "Also: to the best of one’s ability."]
];
const G=[
["~てください","-te kudasai","please do ~ (polite)","N5","{頑張|がんば}ってください: please do your best"],
["~て！","-te!","do ~ (casual request)","N5","{頑張|がんば}って！: good luck!"],
["~れ (command form)","-re","do ~! (blunt order)","N4","{頑張|がんば}れ: do your best!"],
["~なさい","-nasai","do ~ (firm, like a parent)","N4","やめなさい: stop it"],
["~{方|かた}","-kata","way of ~ing","N4","{呼|よ}び{方|かた}: way of calling"],
["~ってのも","tte no mo","the thing called ~ also","N4","Casual for というのも"],
["~でもいい","demo ii","~ is fine too","N4","どっちでもいい: either is fine"],
["~んだ","-n da","so it's that ~ (explaining)","N4","ふざけるんだ: so you're messing around"],
["~ね","ne","right? huh (seeks agreement)","N5","Soft and friendly"],
["~よ","yo","I'm telling you (emphasis)","N5","Sounds rough after けど or a command"],
["~な","na","huh, I see (casual)","N5","A bit masculine"]
];
const S=[
["かわいい{犬|いぬ}","kawaii inu","cute dog","N5","Neutral"],
["かわいいワンちゃん！","kawaii wan-chan!","what a cute doggy!","N4","Affectionate"],
["かわいい{子犬|こいぬ}","kawaii koinu","cute puppy","N4","Neutral"],
["せいぜい{頑張|がんば}れ","seizei ganbare","good luck with that (sarcastic)","Bonus","Sarcastic jab"],
["{頑張|がんば}ってください","ganbatte kudasai","please do your best","N5","Polite and sincere"],
["「ワン{子|こ}」ってのも{小|ち}っちゃい{犬|いぬ}の{呼|よ}び{方|かた}ですね。","“wanko” tte no mo chiccha-i inu no yobikata desu ne.","“Wanko” is also a name for a little dog, huh.","N4","Polite, chatty"],
["どっちでもいいけどよ。","docchi demo ii kedo yo.","Whatever, either works.","N4","Rough and blunt. Softer: どっちでもいいけどね"],
["やめなさいよ","yamenasai yo","stop it! cut it out!","N4","Scolding, or teasing between friends"],
["またふざけるんだな","mata fuzakerun da na","messing around again, huh?","Bonus","Teasing"]
];
return {W,G,S};})();
