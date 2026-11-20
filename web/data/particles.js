window.PD=(()=>{const CAT={core:'Who / what',place:'Where / when',join:'Joining words',end:'Sentence endings',cmp:'Comparing / limits',link:'Linking clauses'};
const P=[
{p:'は',ro:'wa',c:'core',lv:'N5',name:'Topic marker',gist:'“As for ~”',ex:'Marks what the sentence is about. Everything after it is a comment on that topic.',warn:'Written は (ha) but always read “wa” as a particle.',eg:[['{私|わたし}[は]{学生|がくせい}です。','I am a student. (As for me, student.)'],['{今日|きょう}[は]{暑|あつ}いです。','It is hot today.']],tip:'Contrast too: {肉|にく}[は]{食|た}べません = “meat, I don’t eat” (but other things, yes).'},
{p:'が',ro:'ga',c:'core',lv:'N5',name:'Subject marker',gist:'Points out who or what',ex:'Marks the subject, especially new or important information. Also used with 好き, 嫌い, ある/いる, わかる and できる.',eg:[['{猫|ねこ}[が]います。','There is a cat.'],['{犬|いぬ}[が]{好|す}きです。','I like dogs.'],['{誰|だれ}[が]{来|き}ましたか。','Who came?']],tip:'Question words like {誰|だれ} and {何|なに} take が, never は.'},
{p:'を',ro:'o',c:'core',lv:'N5',name:'Object marker',gist:'The thing the action is done to',ex:'Marks the direct object of a verb: what you eat, read, buy or watch. It also marks a route you move through.',warn:'Written を (wo) but read “o”.',eg:[['{水|みず}[を]{飲|の}みます。','I drink water.'],['{本|ほん}[を]{読|よ}みました。','I read a book.'],['{橋|はし}[を]{渡|わた}ります。','I cross the bridge.']],tip:'Ask “what?” of the verb: the answer takes を.'},
{p:'に',ro:'ni',c:'place',lv:'N5',name:'Target point',gist:'At / to / on (a point)',ex:'Marks a point: a specific time, a destination, where something exists, or the person who receives something.',eg:[['7{時|じ}[に]{起|お}きます。','I wake up at 7.'],['{学校|がっこう}[に]{行|い}きます。','I go to school.'],['{部屋|へや}[に]{猫|ねこ}[が]います。','There is a cat in the room.'],['{友達|ともだち}[に]{本|ほん}[を]あげました。','I gave a book to a friend.']],tip:'Vague times like {今日|きょう} and {毎朝|まいあさ} take no に.'},
{p:'で',ro:'de',c:'place',lv:'N5',name:'Place of action, means',gist:'At (doing) / by / with',ex:'Marks where an action happens, or the tool or method you use.',eg:[['{図書館|としょかん}[で]{勉強|べんきょう}します。','I study at the library.'],['バス[で]{行|い}きます。','I go by bus.'],['{箸|はし}[で]{食|た}べます。','I eat with chopsticks.']],tip:'Action happening there → で. Just existing there → に.'},
{p:'へ',ro:'e',c:'place',lv:'N5',name:'Direction',gist:'Toward',ex:'Marks the direction you move in. With 行く and 来る it is usually swappable with に.',warn:'Written へ (he) but read “e”.',eg:[['{日本|にほん}[へ]{行|い}きたいです。','I want to go to Japan.'],['{家|いえ}[へ]{帰|かえ}ります。','I go home.']],tip:'へ feels like “heading toward”; に feels like “arriving at”.'},
{p:'から',ro:'kara',c:'place',lv:'N5',name:'From / because',gist:'Starting point or reason',ex:'Marks a starting point in time or place. After a reason clause it means “because”.',eg:[['9{時|じ}[から]{働|はたら}きます。','I work from 9.'],['{東京|とうきょう}[から]{来|き}ました。','I came from Tokyo.'],['{雨|あめ}だ[から]、{行|い}きません。','It is raining, so I won’t go.']],tip:'Pairs with まで: から…まで = from…until.'},
{p:'まで',ro:'made',c:'place',lv:'N5',name:'Until / up to',gist:'End point',ex:'Marks the end point in time or place.',eg:[['5{時|じ}[まで]{勉強|べんきょう}します。','I study until 5.'],['{駅|えき}[まで]{歩|ある}きます。','I walk as far as the station.']],tip:'まで = the action continues up to that point.'},
{p:'と',ro:'to',c:'join',lv:'N5',name:'And / with / quote',gist:'And (full list), together with',ex:'Joins nouns in a complete list, marks who you do something with, and marks quotes.',eg:[['{犬|いぬ}[と]{猫|ねこ}','dogs and cats'],['{友達|ともだち}[と]{映画|えいが}[を]{見|み}ました。','I watched a movie with a friend.'],['「よかった」[と]{言|い}いました。','I said “thank goodness.”']],tip:'と joins nouns only. Joining sentences uses other forms.'},
{p:'や',ro:'ya',c:'join',lv:'N5',name:'And (among others)',gist:'Things like A and B',ex:'Lists examples and implies there are more items.',eg:[['パン[や]{卵|たまご}[を]{買|か}いました。','I bought bread, eggs and so on.']],tip:'と = the full list. や = just some examples.'},
{p:'の',ro:'no',c:'join',lv:'N5',name:'Possessive / linker',gist:'’s / of',ex:'Links two nouns: the first describes or owns the second.',eg:[['{私|わたし}[の]{本|ほん}','my book'],['{日本語|にほんご}[の]{先生|せんせい}','a Japanese teacher'],['{犬|いぬ}[の]{名前|なまえ}','the dog’s name']],tip:'Read it backwards in English: A の B = B of A.'},
{p:'も',ro:'mo',c:'join',lv:'N5',name:'Also / too',gist:'Too, as well',ex:'Means “also”. It replaces は, が and を rather than stacking with them.',eg:[['{私|わたし}[も]{行|い}きます。','I will go too.'],['{犬|いぬ}[も]{猫|ねこ}[も]{好|す}きです。','I like both dogs and cats.']],tip:'Say {私|わたし}[も], never 私はも.'},
{p:'か',ro:'ka',c:'end',lv:'N5',name:'Question / or',gist:'? / or',ex:'At the end of a sentence it makes a question. Between nouns it means “or”.',eg:[['{学生|がくせい}です[か]。','Are you a student?'],['お{茶|ちゃ}[か]コーヒー','tea or coffee']],tip:'Spoken Japanese often drops か and just raises the pitch.'},
{p:'ね',ro:'ne',c:'end',lv:'N5',name:'Seeking agreement',gist:'Right? / Isn’t it?',ex:'Invites the listener to agree, or softens a statement. Warm and friendly.',eg:[['いい{天気|てんき}です[ね]。','Nice weather, isn’t it?'],['かわいい[ね]！','So cute, right?']],tip:'Use it when you both already know or feel the thing.'},
{p:'よ',ro:'yo',c:'end',lv:'N5',name:'Emphasis / telling',gist:'I’m telling you',ex:'Adds emphasis or gives the listener new information.',eg:[['この{犬|いぬ}[は]かわいいです[よ]。','This dog is cute, you know.']],tip:'Overusing it, or using it after commands, can sound pushy.'},
{p:'な',ro:'na',c:'end',lv:'N4',name:'Casual reflection',gist:'Huh / I see',ex:'A casual, slightly masculine ending for thinking aloud. After the plain verb form it can also mean “don’t!”.',eg:[['{寒|さむ}い[な]。','It’s cold, huh.'],['{触|さわ}る[な]！','Don’t touch!']],tip:'Use it only with friends or when talking to yourself.'},
{p:'より',ro:'yori',c:'cmp',lv:'N4',name:'Than',gist:'Than ~',ex:'Marks the thing being compared against.',eg:[['{犬|いぬ}[は]{猫|ねこ}[より]{大|おお}きいです。','Dogs are bigger than cats.']],tip:'Pairs with のほうが: 犬のほうが大きい = dogs are bigger.'},
{p:'だけ',ro:'dake',c:'cmp',lv:'N5',name:'Only (neutral)',gist:'Just / only',ex:'Limits something to that amount, with a positive verb.',eg:[['{一|ひと}つ[だけ]ください。','Just one, please.']],tip:'だけ is neutral: “only this much, and that’s that.”'},
{p:'しか',ro:'shika',c:'cmp',lv:'N4',name:'Only (not enough)',gist:'Nothing but',ex:'Means “only” but always takes a negative verb, and stresses that it is too little.',eg:[['{百円|ひゃくえん}[しか]ありません。','I only have 100 yen.']],tip:'しか + negative = “nothing but”.'},
{p:'けど',ro:'kedo',c:'link',lv:'N4',name:'But / though',gist:'~, but…',ex:'Joins two clauses with a contrast. It is the casual form of けれど.',eg:[['{高|たか}い[けど]、{買|か}います。','It’s expensive, but I’ll buy it.'],['どっちでもいい[けど]。','Either is fine, though.']],tip:'Ending a sentence with けど softens it and leaves it hanging.'}
];
const BY={};P.forEach(x=>BY[x.p]=x);
const MIX=[
{t:'は vs が',rule:'は sets the topic (“as for X…”). が points out the subject, often new or important information.',a:['{私|わたし}[は]{学生|がくせい}です。','As for me, I’m a student.'],b:['{私|わたし}[が]{学生|がくせい}です。','I’m the one who’s a student.'],tip:'Answering “who?” → が. Talking about something already known → は.'},
{t:'に vs で',rule:'に marks where something is, or a destination. で marks where an action happens.',a:['{部屋|へや}[に]います。','I am in the room.'],b:['{部屋|へや}[で]{寝|ね}ます。','I sleep in the room.'],tip:'いる and ある take に. Most action verbs take で.'},
{t:'に vs へ',rule:'Both mark where you are going. へ stresses the direction, に the arrival point.',a:['{東京|とうきょう}[に]{行|い}きます。','I’m going to Tokyo.'],b:['{東京|とうきょう}[へ]{行|い}きます。','I’m heading toward Tokyo.'],tip:'With 行く, 来る and 帰る either one is fine.'},
{t:'と vs や',rule:'と gives a complete list. や gives examples and implies more.',a:['パン[と]{卵|たまご}','bread and eggs (that’s all)'],b:['パン[や]{卵|たまご}','bread, eggs, etc.'],tip:'Shopping list with extras → や.'},
{t:'だけ vs しか',rule:'Both mean “only”. だけ is neutral with a positive verb; しか needs a negative verb and suggests “not enough”.',a:['{百円|ひゃくえん}[だけ]あります。','I have just 100 yen.'],b:['{百円|ひゃくえん}[しか]ありません。','I have only 100 yen (not enough).'],tip:'Feeling short of something → しか.'}
];
const BD=[
{en:'Every morning I walk with my dog in the park.',ch:[['{私|わたし}','は','Topic'],['{毎朝|まいあさ}','','Time (no particle)'],['{公園|こうえん}','で','Place of action'],['{犬|いぬ}','と','Together with'],['{散歩|さんぽ}します','','Verb']]},
{en:'Yesterday I gave my friend a Japanese book.',ch:[['{昨日|きのう}','','Time (no particle)'],['{友達|ともだち}','に','Receiver'],['{日本語|にほんご}','の','Describes next noun'],['{本|ほん}','を','Object'],['あげました','','Verb']]},
{en:'I studied at the library from 9 until 5.',ch:[['9{時|じ}','から','Start time'],['5{時|じ}','まで','End time'],['{図書館|としょかん}','で','Place of action'],['{勉強|べんきょう}しました','','Verb']]},
{en:'Tokyo is bigger than Osaka, isn’t it?',ch:[['{東京|とうきょう}','は','Topic'],['{大阪|おおさか}','より','Compared against'],['{大|おお}きいです','ね','Predicate + “right?”']]},
{en:'I like cats, but dogs are cute too, you know.',ch:[['{猫|ねこ}','が','Thing liked (好き takes が)'],['{好|す}きだ','けど','Contrast “but”'],['{犬|いぬ}','も','“Too”'],['かわいい','よ','Predicate + emphasis']]},
{en:'I go to school by bus at 8.',ch:[['8{時|じ}','に','Exact time'],['バス','で','Means'],['{学校|がっこう}','へ','Direction'],['{行|い}きます','','Verb']]}
];
const Q=[
['{毎朝|まいあさ}コーヒー＿{飲|の}みます。','I drink coffee every morning.','を',['を','で','に','が'],'Coffee is what you drink: the direct object takes を.'],
['{図書館|としょかん}＿{勉強|べんきょう}します。','I study at the library.','で',['で','を','が','へ'],'Studying is an action, and で marks where an action happens.'],
['7{時|じ}＿{起|お}きます。','I wake up at 7.','に',['に','で','を','の'],'A specific clock time takes に.'],
['{部屋|へや}＿{猫|ねこ}がいます。','There is a cat in the room.','に',['に','で','を','より'],'いる (to exist) marks the location with に, not で.'],
['バス＿{学校|がっこう}へ{行|い}きます。','I go to school by bus.','で',['で','に','を','が'],'The means of transport takes で.'],
['{私|わたし}は{犬|いぬ}＿{好|す}きです。','I like dogs.','が',['が','を','で','へ'],'好き marks the liked thing with が.'],
['{友達|ともだち}＿{映画|えいが}を{見|み}ました。','I watched a movie with a friend.','と',['と','を','が','へ'],'The person you do something with takes と.'],
['これは{私|わたし}＿{本|ほん}です。','This is my book.','の',['の','を','に','で'],'の links two nouns: my → book.'],
['9{時|じ}＿5{時|じ}まで{働|はたら}きます。','I work from 9 until 5.','から',['から','より','を','が'],'から…まで = from…until.'],
['{田中|たなか}さんは{学生|がくせい}です。{私|わたし}＿{学生|がくせい}です。','Tanaka is a student. I am a student too.','も',['も','を','で','へ'],'も = also, and it replaces は.'],
['パン＿{卵|たまご}を{買|か}いました。','I bought bread, eggs, and so on.','や',['や','を','で','に'],'や lists examples. と would also work here and mean “just these two”.'],
['あなたは{学生|がくせい}です＿。','Are you a student?','か',['か','を','の','へ'],'か at the end makes a question.'],
['いい{天気|てんき}です＿。','Nice weather, isn’t it?','ね',['ね','を','が','で'],'ね invites agreement about something you both can see.'],
['{犬|いぬ}は{猫|ねこ}＿{大|おお}きいです。','Dogs are bigger than cats.','より',['より','から','を','で'],'より marks what you compare against.'],
['{百円|ひゃくえん}＿ありません。','I only have 100 yen.','しか',['しか','より','へ','を'],'しか + a negative verb = only (not enough).'],
['{日本|にほん}＿{行|い}きたいです。','I want to go to Japan.','へ',['へ','を','で','より'],'へ marks the direction you are heading.']
];
return {CAT,P,BY,MIX,BD,Q};})();
