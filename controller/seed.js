require(`dotenv`).config();

const { CONNECTION_STRING } = process.env;
const Sequelize = require(`sequelize`);
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: `postgres`,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS good_travelers;
            DROP TABLE IF EXISTS evil_travelers;
            DROP TABLE IF EXISTS unsure_travelers;
            DROP TABLE IF EXISTS travelers CASCADE;
            DROP TABLE IF EXISTS joe;

            CREATE TABLE travelers(
                traveler_id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                age INT NOT NULL,
                occupation VARCHAR NOT NULL,
                good BOOLEAN NOT NULL,
                height VARCHAR NOT NULL,
                weight VARCHAR NOT NULL,
                difficulty VARCHAR NOT NULL,
                special_counter INT NOT NULL,
                interrogate_traveler TEXT NOT NULL,
                inspect_features TEXT NOT NULL, 
                inspect_clothing TEXT NOT NULL,
                inspect_wares TEXT NOT NULL,
                ask_for_help TEXT NOT NULL,
                inspect_special TEXT
                );

            INSERT INTO travelers(name, age, occupation, good, height, weight, difficulty, special_counter, interrogate_traveler, inspect_features, inspect_clothing, inspect_wares, ask_for_help, inspect_special)
            VALUES (
                'Esther Goodwill', 74, 'Retired Shopkeeper', true, '4'' 9''''', '95 lb', 'Easy', 1,
                'I am just trying to visit my daughter in the city. She just got married a few days ago. I tried to get here before the ceremony but my bones just don''t support me too well these days. I used the money she gave me for the trip to buy her a wedding gift. While I am disappointed that I missed the wedding, I am more than happy that I got her the gift. She will love it.',
                'Her eyes are a faded hazel and speak to her age. The wrinkles on her face, hands, and feet indicate her age properly. Her posture is slightly forward, leaning on the small cane she has in her hands as she tries to stay standing. She waves a small smile your way when she sees you.',
                'Esther is wearing a thin green dress that reaches down to her ankles. The bronze necklace she wears around her neck looks worn and used. Her flat sandals detail the journey she took to get in front of you. The straw hat hanging behind her had with a thin thread has a couple holes and do little to protect her from both shade and rain.',
                'You check her purse. There are a few copper coins, one silver coin, a worn but delicate comb, some candy, and a wrapped gift with the name of "Becky" written on it.',
                '"What are you blind? Look at her! Someone that old and frail could hardly prove a threat to the capital. Just let her through already you fool!"',
                'You rip open the old lady''s present. Inside of the wrapping, is a tiny music box. When you open it up, a little girl spins in a circle. The song it plays reminds you of the song your mother sang to you when you were but a child. It brings a tear to your eye.'
                ),
                    
                ('Johnathan Hershel', 22, 'Libraian''s Aide', true, '6'' 1''''', '172 lb', 'Easy', 1,
                'Hello sir. I was recently hired to be an assistant libraian at the capital''s public library. Honestly, I am surprised that they decided to move forward with me but I am very excited to start my job there. Books have always been my friends. I enjoy reading and sharing their stories to everyone. If you ever find some time, please come by and I''ll show you around, once I''ve acclimated myself to the area, of course.',
                'The skin on him looks to be as soft as a child''s, speaking to his age. His jawline has started to square and the start of a beard has become apparent. His posture is proper as he speaks with you and he maintains eye contact. Aside from his slightly shabby clothes, he seems to present himself with an air of confidence without being overbearing.',
                'Johnathan has a pair of black round glasses with lens thicker than one would expect. He has on a dark green unbuttoned overcoat that hides most of his white shirt inside. The man has a crude watch attached to his left wrist. His pants are brown and slightly scuffed at the bottom. His shoes are covered in minimal dirt, easily revealing the white that it once was.',
                'It appears he carries only a book in his arm and a small leather satchel tied to his belt. When he shifts his center of gravity, a light jingle is heard from it.',
                '"A young nerd like that, do you think he''s capable of harming a citizen of our kingdom? I''d be wary of him trying to change things that aren''t his to change but he''s still a kid. That''s something we can worry about in few decades."',
                'You inspect his leather pouch and find just a couple of silver and bronze coins inside. Tucked in a small worn cloth is a glass bead.'
                ),

                ('Jessebell Angler', 16, 'Student', true, '4'' 8''''', '81 lb', 'Easy', 2,
                'Me? I live here. I''m just returning from the forest as I needed to complete my art homework. We were asked to draw a scenary that inspired us and what better inspiration the the nature that surrounds the capital, right? That''s why I came out early to avoid the sun. Though, it did take me longer than expected.',
                'Her fingers have small callouses, indicating the constant use of them. Her outfit does remind you of uniform that the girls wore back when you were young and in school as well. Her face is clean of dirt. Only the shoes, socks, and skirt show dirt on them. The smile she gives you is wide as she waits to be let in.',
                'Jessebell is wearing a white buttoned up shirt with her collar undone. Her dark blue knee-length skirt is slightly frazzled, as if she had been walking in the forest. Her brown shoes are scuffed and hide her small feet. She is wearing knee-high socks that are mostly white save for the specks of dirt on it. In her hair is a small clip to push her bangs out of the way.',
                'On her person is a notebook with a pencil pushed into the ring binding. She also has a yellow purse on her that is held softly in her left hand. Inside are just some cheap cosmetics and a white cloth that has some gray shavings on it.',
                '"Hmm. I do recall seeing her leave the gates earlier this morning I believe. Her story about coming out early seems to be true, at the least. If you''re that worried, look at her notebook and make sure it''s just drawings or something."',
                'You open the notebook and find an average pencil drawing of the forest. The trees are detailed with slightly too many strokes but you think that was the point of it. The background is faded but you can still somewhat make out the deer walking away.'
                ),

                ('Duncan Turner', 28, 'Soldier', true, '6'' 2''''', '194 lb', 'Medium', 0,
                'Hello, I''m just returning from our daily security route. Not much happened today. Animals seem to be calm today and nothing seems to be out of the ordinary. I''d like to get in so that I can take this armor off take a bath. This smell eventually becomes you if yourself fester inside it long enough.',
                'There isn''t much to note. The armor hides anything that his body could be hiding. He is slightly leaning on his spear, indicating that he could be tired from working. His eyes stare straight at you as he waits to hear your decision.',
                'Duncan is wearing the exact same thing you are. It looks like he is a soldier. His face guard is lifted so that you can see a man inside. Other than that, there isn''t much to say. The armor you both wear covers your entire body. The only thing that adds any fashion to such a dull armor is the tabard you both wear with the emblem of the kingdom on it, a Gryphon in flight. There is one difference now that you are looking at the soldier in front of you. His tabard has a green band around the shoulders, indicating his rank is one below yours as you have a blue band.',
                'Duncan is carrying literally nothing but the spear in his hand.',
                '"Duncan''s a new hire from a few months ago, pup. How you manage to get anything done is beyond me. To be fair, I suppose, he is late so that is concerning. I''m going to have to up his daily workout for slacking off.Thanks for letting me know."',
                'N/A'
                ),

                ('Geoffrey Goldmine', 57, 'Merchant', true, '4'' 6''''', '271 lb', 'Medium', 2,
                'Have you never seen a wealthy merchant before, boy? I guess that''s why you''re here waiting at the door like a moron. Hurry up with your inspection already! I have a meeting I need to get to. I will lose out on millions if you make me late. And you don''t want that to happen to me, if you''re smart. Now hurry up and let me and my workers through.',
                'The man is big beyond belief. You didn''t know the human body could stretch so big. He does his best to sneer down at you from his carriage. His mustache is combed into a curl and offsets the frown he wears as he waits for you to let him through. The workers behind him look at you eagerly, hoping you don''t delay the apparently rich merchant',
                'Geoffrey is wearing the most lavish clothing you have ever seen. The robe he wears on top is red but weaved into it are intricate golden threads that wouldn''t surprise you if it was real gold. His pants are of the same design as his robe, at least of what you can see. His shoes are a magnificent white, showing that he most likely rode on his carriage all the way here. Attached to his ear is a chain the comes up to his gold trimmed monocle.',
                'There are many wagons behind the merchant - so much so you wonder what they''re bringing with them. When asking for a list of the products they were transporting, Geoffrey orders a worker to provide you with what you requested. You look into the wagons and find there are numerous crates and barrels. You look into a few of them in each wagon and find nothing suspicious. Many of the crates hold clothes that they put on the market and the barrels hold perishable foods. A few of the containers also held spirits and wine that normally are too high-end for the general public. Every product and produce had price tags attached to them. Nothing seems to be missing.',
                '"Ugh, I hate this man. He is a tough customer. He brings back so much and he knows we can''t inspect everything. Check what you can and just move, in my opinion. He''s not worth the effort. If you get in his way, he''ll either bribe you if you''re in a position of power, or he''ll crush you with the money he makes."',
                'Thinking that someone as rich as Geoffrey seemed to be, he must be hiding something. You look and look and just when you are about to give up, you see that there is a box that is slightly hidden from the rest in the last wagon. You pick it up and open it to find that there are a number of jewelry without price tags on them. When you bring it up to the man, he yells at you for searching through his personal belongings. He explains that they are his that he bought for his wives and that they wouldn''t have price tags or be on their tranpsort list because they aren''t being sold or transported for that purpose.'
                ),

                ('Veronica Highland', 43, 'Secretary of State', true, '5'' 8''''', '155 lb', 'Medium', 1, 
                'Thank you for your services soldier. Please let me know if there is anything I can do to further this inspection along. I am already late to meet the King but that is due to my own fault so please, take your time. I''ll be happy to assist.',
                'She keeps her right arm down by her side while her left harm is used to hold up a number of papers. She is standing to the side and leaning on left leg a little. Her posture is the proper as she goes over the document at the top of her pile. She glances up at you every now and again as you stare at her.',
                'Veronica is wearing a slightly dark brown pantsuit with a white button up under the suit jacket. She has on a pair of silver framed glasses that hang on her unpierced ears tightly. The woman also has a small black purse in her left arm, held safely by the bend of her elbow.',
                'She doesn''t allow you to look at the documents, insisting that they are a national document and you seeing them would be a security risk. She does show you the official seal of the King that proves what she says. Her purse, after you help her finagle it out of her arm, holds a pen, lipstick, and pepper spray.',
                '"I do believe I''ve seen her at the castle before. She''s supposed to be some sort of hot shot. It is weird that she''s out here alone so check her out well just in case. If nothing''s wrong, then let her through."',
                'After asking for help from your superior, you begin to wonder why someone as important as her is out here without an escort. You ask her promptly and she replies that her duty to the King sometimes require her to work as fast as she can. She grew up with a father who used to be a mercenary and knows how to defend herself. If the guards cannot keep up with her, she will go on ahead and do what must be done in order to complete her task perfectly.'
                ),

                ('Tina Goodfellow', 31, 'Circus Troupe Leader', true, '4'' 11''''', '106 lb', 'Hard', 2, 
                'Howdy, stranger! How are you this fine evening!? I can''t believe it''s already that time of year again. Last year, it rained so hard that we had to cancel early so we''re hoping to give a grand show this year. You should come by and see us when the tent is set up! Everyone will definitely enjoy what we have planned! We hope to leave you in awe when we are done so that we may return next year as well.',
                'She is sitting atop of her wagon with her legs separated and stares down at you with a wide grin. Her confidence is interesting to you as she is only a Circus Troupe Leader. Her face is painted white with a red diamond over her left eye. Below the right eye is a yellow star. The reins she uses for her horses actually have orange carrots for handles that she pretends to honk at you time to time.',
                'Tina wears a red suit jacket up top with a black shirt inside. Her pants are an off white but cleanly ironed. Her feet are covered with socks and shoes. Her cuffs are decorated with clown head cufflinks. You ask her to stand up and you find that the back of her jacket has the head of a lion stitched onto it. On her head is a frilly navy blue tophat that has a large feather sticking out of it.',
                'There are numerous show animals in cages being towed along with the circus - lions, tigers, and some smaller animals. The circus workers mostly ignore you as you walk around looking at their wares. It surprises you to see them ignore you - as if though this was just another inspection. As it is a circus troupe, you find everything here: clothes, food, animals, weapons that are dull and for show, hoops, and more. You do, however, locate a sharpened sword in the mix. You walk up close to the animals and they seem to mostly ignore you. They give you a glance before closing their eyes and sleeping once more.',
                '"Geez, they''re back again? I was wondering what all the noise was about. They did come here last year but, if I recall correctly, the monsoon that shortly ensued after their arrival forced them to shut down before they could even start. I honestly think they''re witches and should be put in jail. So do your job and I''ll support you."',
                'You take the sharpened sword with your boss and bring it to Tina and confront her about it. She stares back at you and laughs it off, stating that one of the workers probably put it in the mix by mistake. She iterates that some of their shows require a certain credibility so they keep one on hand to use in shows when needed, explaining again that it was placed with the fakes by mistake. She thanks you for bringing it to her attention and keeps a smile as she says so.'
                ),

                ('Logan Hopper', 46, 'Blacksmith', true, '6'' 5''''', '264 lb', 'Hard', 2,
                'I see my handiwork is doing just fine in the soldiers'' hands. I hope you''ve made good use of my work there, son. If there is anything that you need help with in regards to your weapon or armor, bring it to me and I will get it buffed, sharpened, and anything you need. Of course, for the right price anyway. I got some weapons, armors, and raw materials in my cart but feel free to look. I have nothing to hide.',
                'The man is rough, though that doesn''t begin to describe how he looks. His face and arms are covered with scars, cuts, and band-aids. The callouses on his hands are big and hard, a sign of the work he does. From the looks of it, though, he works so hard that the flames of his forge has burned all hair on his face, arms, and anywhere the fire gets to. It is surprising to a man like this but his dedication to his work outshines the light that reflects off of his bald head.',
                'Logan is wearing a thick dark gray apron over white shirt and tan pants. His shoes, though rough and scuffed, look to be in good shape. You can only imagine that the shoes he wears are durable in case if he drops a lump of iron on them. Aside from that, he doesn''t seem to be wearing much else.',
                'You look at the cart he is pulling behind him to find a number of weapons, armors, and raw materials. Many of the weapons are sharpened and look ready to be sold while others are still in pieces. The same can be said for the armors in that there are a bundle of complete and incomplete armors created. You check to see if there is a ledger of some sort that would list what was being transported but you see nothing of the sort.',
                '"I''m not entirely familiar with who supplies us our weapons and armor but I do know it comes from within the Kingdom - it''s something we as soldiers can be proud about. If he''s the one supplying us with our weapons, he deserves our praise. If you find that he''s hiding something, I''ll personally make sure that he gets what he deserves for trying to lie to us... Oh, but I do think I remember some sort of smith leaving town a few weeks ago..."',
                'You ask Logan about the injuries and band-aids and he explains that he was recently helping out another blacksmith a few towns over. The injuries came from helping them out. He doesn''t say much more than that when you ask him to go more in depth. You then ask him if he had a list of items he was transporting to the capital. Logan reaches into his pockets and locates for you a folded up manifest that does in fact have what you are looking for with nothing missing.'
                ),

                ('Mary Wellington', 19, 'Daughter of a Viscount', true, '5'' 7''''', '110 lb', 'Hard', 2,
                'How much longer are you going to make me wait here!? The fact that I, a noblewoman, have to wait in line with these plebians is already an insult. My father will hear of this. You better hope I don''t find you in the capital later!',
                'She stands and stares at you in a standoffish manner. Her left foot is slightly extended forward and quickly tapping itself as she waits for you to let her through. Her skin is pristine but it''s hard to say if that is really so as it is clear there is an abundant amount of makeup being used.',
                'Mary is wearing a delicate yellow and white dress. Her shoes are white and heeled, giving her an extra inch and a half of height. In her right hand is a pink wallet that she holds onto tightly. Her hands are enveloped in silk gloves and her hair is tied up so excessively that you aren''t even sure what kind of style it is. In her left hand is a closed yellow parasol that she is holding up. She would probably hit you with it if you weren''t a guard.',
                'She tells you that if you touch her purse, she will have her father cut your hand off. You continue to insist that it is needed and that if you aren''t allowed to inspect it you may have to deny her passage. As adamant as you are that this is standard protocol, she only glares back at you and doesn''t say anything further.',
                '"I hate these spoiled kids. Like we don''t have better things to do. Normally I''d tell you to just let her go but go ahead be a pest and do what you need. If you need help, I''ll be there."',
                'After speaking to your supervisor, Mary reluctantly gives you her purse. Of course, she reminds you that she will have her father hunt you down to cut your hands off to restore her honor. Ignoring the threat, you search in the purse and find a handful of gold coins, a compact, a small cloth folded into a makeshift pouch, and a nail file. You open the cloth and find a powdery substance - probably some sort of drug. There isn''t enough to consider her dealing the drug.'
                ),

                ('Chris Rain', 32, 'Mugger', false, '6'' 0''''', '202 lb', 'Easy', 1, 
                'I''m the bakery''s assistant at Baker Paul''s. I was just hired earlier last week and made the trip here from one town over.',
                'His jawline is strong and it is apparent that the man shaves. His posture is slightly poor as he speaks with you. His eye darts to your left and right once during your conversation. His clothes are in slight disarray, as if though he had struggled to put on his clothes for some reason.',
                'Chris has on a dark red unbuttoned trench coat that hides a dirty white shirt inside. The trench coat itself seems to have some traces of leaves on it as well. The man has a crude watch attached to his left wrist that is cracked. His pants are brown and slightly scuffed at the bottom. Like his coat, it is littered with traces of leaves. His shoes dirty and look slightly beat up. There is a small leather satchel tied to his belt. He is also carrying a backpack that is weirdly cleaner than the clothes he wears.',
                'The leather satchel has a small knife wrapped in a brown cloth inside of it. In his backpack, it looks like he is carrying a couple of days worth of rations, a worn bedroll, a torch, and an old crude map. The knife seems to have been wiped recently. There are no cooking equipment in his pack.',
                '"He says he''s the bakers'' assistant? He looks like he''s been out in the woods for weeks with how he looks and smells. Doesn''t look to me like he knows how to cook but looks can be deceiving I guess."',
                'Concerned why a baker''s assistant would need a knife, you ask Chris about it. He explains that having a weapon to protect himself, no matter what it may be, is better than having none. He continues by saying that he has been mugged before himself and feel safer having something to defend himself with. You then ask why he needed a torch and bedroll. He quickly answers, stuttering, that he was worried about travelling at night as he wasn''t sure if he would make it back while the sun was still out.'
                ),

                ('Serena Burns', 29, 'Arsonist', false, '5'' 7''''', '102 lb', 'Medium', 2, 
                'Hello. I travel around the world as a high-end book seller. I work with Stellar Reading and I go around from city to city and form contracts with stores, libraries and even nobles themselves and provide them with quality books. If you''re interested, I can give you a list of what I can provide... No?',
                'Her posture is better than average as she stands in front of you with her legs slightly apart from each other. She is wearing light red lipstick and has her wavy brown hair down. The way she glances at you is filled with confidence without any worry. She is carrying a black briefcase in her right hand.',
                'Serena wears a tight red dress that barely reaches to her knee. Thankfully, she is wearing stockings that help to somewhat cover the rest of her skin. Her red heels are clean, but it is clear that they are cleaned regularly as there are signs of dirt being smudged by a cloth. Both of her wrists are adorned with silver bracelets. She wears a pair of earrings in each ear, depicting an "x". Her hands are covered by tight red gloves as well. There is a distinct smell when you peer over her clothing. Something familiar, but you can''t put your hands on it.',
                'You open the briefcase and find that there are mostly documents of contracts inside of it. There is a rather large book of books she has inside of it as well. The briefcase seemed heavy when you opened it but seeing the large book makes you think otherwise.',
                '"She looks pretty professional. At the very least she looks clean. I do think it''s weird a woman is traveling by herself, especially without a weapon to keep herself safe - looking all pretty like that. It''s like she''s asking for bandits to kidnap her. Though she is a kid of clean for having traveled all the way here on foot. That''s really weird. And there seems to be a really weird smell from her. Reminds of me of smoke?"',
                'Feeling weird, you inspect the briefcase again. You don''t see anything weird about it so you start to feel the edges. Interestingly, you find a latch up top and pull down the top cover. Hidden inside, is a firecamp set including - flint, a fire ring, and a bottle of water. That is what the smell was. It seems that she smelled of smoke. She sees your concern and explains that she sometimes has to camp outside so having those materials help her to build a fire easily when she needs.'
                ),

                ('Sophia Hope', 24, 'Serial Killer', false, '5'' 3''''', '91 lb', 'Hard', 2,
                'Oh, hello... Sorry if I smell. I haven''t had a bath in days. I couldn''t stand being home any longer and ran away. I don''t have much money and I don''t have much talent, but I hope to start a new life here. I know one should love their parents but you wouldn''t say that if you knew what they did to me... Sorry, I don''t feel like sharing more about myself at the moment. Please let me know when I can go...',
                'She is hunched over a long wooden branch that she has been using to support her tiny frame. The stench that permeates around her starts to sink in and you realize she wasn''t kidding about the bath part. Her expression is ragged but there is strong life still in her eyes. She is dirty, but she doesn''t look starved. You, however, cannot help but wonder what the bruises and scars that are barely visible on her shoulders and continue onto her back are about.',
                'Sophia''s red sleeveless shirt is covered in so much dirt and dust that you almost thought it was a brown sweater - thankfully some red was still showing on the front of it. The woman has on a pair of brown pants that, honestly, were more like two potato sacks sewed together. She is barefoot and has only a vine to keep her pants from falling. Much of the mud on Sophia and her clothes seem to be new as it hasn''t dried just yet from the sun.',
                'She has nothing on her person but the long stick and a shiv that is tied around her waited with the vine. The top of the stick seems to have been shaved off crudely with the shive so that she could hold it without scraping hands too badly.',
                '"What is she, a street urchin? Our capital has no need for such a disgusting kid. Just tell them to bugger off. We don''t have time to be caring for her. We barely have enough people to keep the gates safe from terrorists and you want to spend what little time you have to clean her up? Trust me, it''s a lost cause. She''ll die in the city with how useless she is. Better to die out there where no one can hear her."',
                'Concerned about her bruises and scars, you ask if you could see her back. Although worried, she complies and turns around. Dirt covers the entirety of her shirt on the back. She pulls the it up for you to see. It is nothing like you have ever seen before. They weren''t created from a knife but it was obvious she was being abused by a whip of some sort and a blunt object. Many of the scars are from a long time ago and others more recent. She pulls her shirt down and turns back around to face you. Now that you''re up close, you see that the red on the shirt was actually blood. You pull her shirt towards and scowl; not at her, but at her circumstance. However, you quickly notice her fear and let her shirt go and apologize for the sudden scare.'
                );

            CREATE TABLE joe(
                joe_id SERIAL PRIMARY KEY,
                mental_health INT NOT NULL
            );

            INSERT INTO joe (mental_health)
            VALUES (100);
                    
            CREATE TABLE good_travelers(
                good_traveler_id SERIAL PRIMARY KEY,
                traveler_id INT REFERENCES travelers(traveler_id)
            );
        
            CREATE TABLE evil_travelers(
                evil_traveler_id SERIAL PRIMARY KEY,
                traveler_id INT REFERENCES travelers(traveler_id)
            );
        
            CREATE TABLE unsure_travelers(
                unsure_traveler_id SERIAL PRIMARY KEY,
                traveler_id INT REFERENCES travelers(traveler_id)
            );

            CREATE TABLE joe_events(
                joe_event_id SERIAL PRIMARY KEY,
                time_of_day VARCHAR NOT NULL,
                view_text TEXT NOT NULL,
                button_one VARCHAR NOT NULL,
                button_two VARCHAR NOT NULL,
                button_three VARCHAR NOT NULL
                );

            INSERT INTO joe_events(time_of_day, view_text, button_one, button_two, button_three)
            VALUES (
                'Morning', 'It''s a beautiful morning. You wake up feeling like it''s been the first time in a long time that you weren''t tired. Although you wake up feeling good, you do worry about what the day may bring. Something your therapist said about anxiety and the fact that you should look for a different career rings in the back of your mind.<br><br> Ignoring that gnawing thought you decide that you should get some food. The only thing in your fridge is a slice of bread and some mustard. While you could eat this, you wonder if this is the best breakfast to accompany your good mood.<br><br>What do you want to do?', 
                'Mustard and bread', 'Eat out?', 'Skip breakfast?'),
                ('Lunch', 'Feeling good still, you go out to eat with your boss. He compliments the work you''re doing boosts your confidence. Though, not wanting to become complacent, you make sure to not let it become arrogance. Lunch goes by quickly and was more fun than you expected, especially since it was with your boss. You stuffed yourself well since the bill was covered him. On your way back you notice masked fellow snatching the purse of an old lady. The masked thief looks fit and deftly rushes past the crowd of people. The old lady is screaming for help but no one seems to make a move. What do you do?', 
                'Stop the thief?', 'Stay out of it?', 'Get help?'),
                ('Lunch', 'Finally having a breather, you step away from your post as someone takes your place. Though your break is going to be a short thirty minutes for lunch, you wonder what you really want to do. The travelers today have been tough so far and you feel like the morning''s good mood has definitely passed and now you''re on the doorway to hell. Should you eat?', 
                'Yes, eat something!', 'Grab a snack instead?', 'Don''t eat.'),
                ('Lunch', 'Today has been a total nightmare. What''s worse is that it''s only been a few hours. You have no idea what is going on with the travelers today and you feel like going home sick. While it does sound enticing, your integrity keeps you from doing so. You need a break. Like an hour long break. Lunch is normally only 30 minutes but you feel like the extra time would do you well. Do you ask your boss for a long lunch?', 
                'No, it''s fine.', 'Yes, use up PTO.', 'Yes, ask for a favor.');

            CREATE TABLE joe_event_responses(
                joe_event_response_id SERIAL PRIMARY KEY,
                joe_event_id INT REFERENCES joe_events(joe_event_id),
                response TEXT NOT NULL
            );
    
            INSERT INTO joe_event_responses(joe_event_id, response)
            VALUES (
                1, 'You decide that you''ll just have the bread and spread the mustard on it. Although it isn''t a breakfast for champions, you aren''t one anyway. You eat it and feel good. Then you look at the expiration date on the mustard and see that it expired a few weeks ago. You hope it doesn''t affect your work later today...'),
                (1, 'You decide that going out to grab some food would probably be for the best, especially since your mustard was expired a few weeks ago. You''re glad you noticed it before you ate it. You go out and eat at the local cafe and eat some buttered toast and scrambled eggs. It was definitely worth coming out this morning.'),
                (1, 'You''re feeling a little lazy and choose to not eat. You spend the extra time in your bed and relaxing, something you haven''t been able to do in a while. Though your hunger bothers you, it isn''t something you''re not used to.'),
                (2, 'You start running after the thief. You were having a great day so you aren''t about to let this fool ruin it. You run and run and quickly realize how big of a mistake this was. What were you thinking? You just had a big lunch. The guy was sifting through the crowd like an octopus and you''re fully clad in armor. Why did you ask for help? You told yourself not to become complacent and arrogant but it seems it was too late. The thief has gotten away and you''re too ashamed to return back to the old lady. You sulk back towards your post and try to forget this humiliation.'),
                (2, 'You''re mindful of the fact that you just had a large lunch and it really isn''t your problem. You only deal with the travelers coming into the capital. Those that are already inside are the duties of other soldiers... Though... Thinking about it, if they''re in the capital, it is probably because you let them insdie. You begin to feel terrible. Just when you decide that you should chase after the thief, you are already at your post and your temp returned to his role. You curse under your breath before getting back to work.'),
                (2, 'Wanting to help, you start to run. But, you run to the nearby soldiers'' post and ask for help. You just had a large lunch and you know you won''t be able to run after the quick thief. The entire post takes off and it isn''t long before the thief is caught. Although the old lady thanks the other soldiers for their duty, you feel great. Not all good deeds need to be verbalized. Sometimes, it is enough to know that you made a difference and you definitely feel like you did. You return to your post with a brighter smile than you thought you could make.'),
                (3, 'You decide that it isn''t worth it to get into a conversation with your boss. You''ve been doing so poorly anyway they probably wouldn''t let you take the extra time. As they say, hard work is what''s rewarded - not complacent work. You decide to go eat lunch as fast as you can and get back early to do a better job than this morning.'),
                (3, 'You have some extra time off you can use to take a longer lunch. Deciding that you want to take ownership of your own actions through your own means, you let your boss know you''re using some of your time off to take a longer lunch. He easily approves of this and tells you to rest well. You feel good that this was easily handeled and that you''re doing the responsible thing. Though, you do wish you could have saved what little PTO you have.'),
                (3, 'You''ve never been on bad terms with your boss but you also never really got to know him. Although concerned about what the answer will be, you muster up what courage you have left and ask him for a longer lunch. You explain to him that you want the time to rest and clear your mind so that you can perform your job better today as you feel like it hasn''t been going well. Your boss responds well to his but also advises you to not expect this to always be a thing. He approves your long lunch and sends you off. You''re feeling great that this risk you took ended up working so well.'
            );
        `)
        .then(() => {
            console.log(`Database seeding was successful.`);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(`There was an error in seeding the database: ${err}`);
            res.status(500).send(err);
        });
    }
}