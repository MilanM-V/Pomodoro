var savedBackground = localStorage.getItem('backgroundImage');
window.onload = function() {
    var savedBackground = localStorage.getItem('backgroundImage');
    var extraitSaved=localStorage.getItem('extraitImage')
    if (savedBackground) {
        document.body.style.backgroundImage = savedBackground;
    }else{
        document.body.style.backgroundImage = 'url(./images/fond1.gif)';
    }
    if(extraitSaved){
        extrait.src=extraitSaved
    }else{
        extrait.src='../images/fond1.gif'
    }
    colori()
};
var iteratio=0
var AllMusicItem=[]

var x=null;
var chronos='chrono25'

var distance = localStorage.getItem('timerPomodoro');

var distanceShort =localStorage.getItem('timerShort');

var distanceLong=localStorage.getItem('timerLong');

if(!distance){
    distance=25*60-1
}
if(!distanceShort){
    distanceShort=5*60-1
}
if(!distanceLong){
    distanceLong=10*60-1
}

var run=false
var repetition=0

var audio_source_bell_player=document.getElementById('audio-source-bell')
var Bell=localStorage.getItem('Bell');
if(Bell){
    audio_source_bell_player.src=Bell
}


const audioSourceBell = document.getElementById('music-player-bell');
var minutes = Math.floor((Number(distance)+1) /60);
var seconds = Math.floor((Number(distance)+1)-minutes*60);
var inputProgressBar=false
actChrono()

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Choisir un index aléatoire entre 0 et i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Échanger les éléments array[i] et array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function actChrono(){
    if(minutes<10 && seconds>9){
        document.getElementById("chrono").innerHTML ='0'+minutes + ":" + seconds;
    }else if(minutes<10 && seconds<10){
        document.getElementById("chrono").innerHTML ='0'+minutes + ":" + "0"+seconds;
    }else if(minutes>9 && seconds<10){
        document.getElementById("chrono").innerHTML =minutes + ":" + "0"+seconds;
    }else{
        document.getElementById("chrono").innerHTML =minutes + ":" + seconds;
    }
}

function chrono25(){
    chronos='chrono25'

    //update chrono
    if (x!==null){
        clearInterval(x)
    }
    x = setInterval(function() {


    //calcule du temps
    minutes = Math.floor((distance) /60);
    seconds = Math.floor((distance)-minutes*60);
    //modidier le text
    actChrono()
    
    distance-=1;
    //stop repetiton
    if (distance == 0) {
        audioSourceBell.play()
        distance=localStorage.getItem('timerPomodoro') || 25;
        clearInterval(x);
        if (repetition>3 && sequence=='true'){
            repetition=0
            chrono10()
        }else{
            chrono5()
            
        }
        
    }
    }, 1000);
}



function chrono5(){
    chronos='chrono5'

    //update chrono
    if (x!==null){
        clearInterval(x)
    }
    x = setInterval(function() {


    //calcule du temps
    minutes = Math.floor((distanceShort) /60);
    seconds = Math.floor((distanceShort)-minutes*60);
    //modidier le text
    actChrono()
    distanceShort-=1;
    //stop repetiton
    if (distanceShort ==0) {
        audioSourceBell.play()
        distanceShort=localStorage.getItem('timerShort') || 5;
        clearInterval(x);
        chrono25()
        repetition+=1
    }
    }, 1000);
}


function chrono10(){
    chronos='chrono10'

    //update chrono
    if (x!==null){
        clearInterval(x)
    }
    x = setInterval(function() {

    //calcule du temps
    minutes = Math.floor((distanceLong) /60);
    seconds = Math.floor((distanceLong)-minutes*60);
    //modidier le text
    actChrono()
    distanceLong-=1;
    //stop repetiton
    if (distanceLong ==0) {
        audioSourceBell.play()
        distanceLong=localStorage.getItem('timerLong') || 10;
        clearInterval(x);
        chrono25()
    }
    }, 1000);
}


const button_start=document.getElementById('start');
button_start.addEventListener('click',function(){
    if (run==false){
        if (MusicChrono=='true' && playlist.length>0){
            audioPlayer.play();  
        }
        
        if (chronos=='chrono25'){
            chrono25()
            run=true
        }else if (chronos=='chrono5'){
            chrono5()
            run=true
        }else{
            chrono10()
            run=true
        }
    }
})

const button_stop=document.getElementById('Stop');
button_stop.addEventListener('click',function(){
    if (x!==null){
        run=false
        clearInterval(x)
        x=null
    }
})

const button_restart=document.getElementById('restart');
button_restart.addEventListener('click',function(){
    if (x!==null ){
        clearInterval(x)
        if(chronos=='chrono25'){
            distance=Number(localStorage.getItem('timerPomodoro'))+1;
            if(distance==1){
                distance=25*60-1
            }
            minutes = Math.floor((distance+1) /60);
            seconds = Math.floor((distance+1)-minutes*60);
            actChrono()
            chrono25()
        }else if(chronos=='chrono5'){
            distanceShort =Number(localStorage.getItem('timerShort'))+1;
            if(distanceShort==1){
                distanceShort=5*60-1
            }
            minutes = Math.floor((distanceShort+1) /60);
            seconds = Math.floor((distanceShort+1)-minutes*60);
            actChrono()
            chrono5()
        }else{
            distanceLong =Number(localStorage.getItem('timerLong'))+1;
            if(distanceLong==1){
                distanceLong=10*60-1
            }
            minutes = Math.floor((distanceLong+1) /60);
            seconds = Math.floor((distanceLong+1)-minutes*60);
            actChrono()
            chrono10()
        }
        run=false

    }else{
        clearInterval(x)
        if(chronos=='chrono25'){
            distance=Number(localStorage.getItem('timerPomodoro'));
            if(!distance){
                distance=25*60-1
            }
            minutes = Math.floor((distance+1) /60);
            seconds = Math.floor((distance+1)-minutes*60);
            actChrono()
        }else if(chronos=='chrono5'){
            distanceShort =Number(localStorage.getItem('timerShort'));
            if(!distanceShort){
                distanceShort=5*60-1
            }
            minutes = Math.floor((distanceShort+1) /60);
            seconds = Math.floor((distanceShort+1)-minutes*60);
            actChrono()
        }else{
            distanceLong =Number(localStorage.getItem('timerLong'));
            if(!distanceLong){
                distanceLong=10*60-1
            }
            minutes = Math.floor((distanceLong+1) /60);
            seconds = Math.floor((distanceLong+1)-minutes*60);
            actChrono()
        }
    }
})



// Désactiver les raccourcis clavier pour zoomer
window.addEventListener("keydown", function(e) {
    if ((e.ctrlKey && e.key === '+') || (e.ctrlKey && e.key === '-') || (e.ctrlKey && e.key === '0')) {
        e.preventDefault();
    }
});
// Désactiver le zoom tactile (pinch-to-zoom)
window.addEventListener("gesturestart", function(e) {
    e.preventDefault();
});
window.addEventListener("wheel", function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });


const Music={
    Arcane:["./musique/arcane/Arcane (League of Legends) - I Can't Hear It Now - Solo Piano.mp3",
        "./musique/arcane/ARCANE： What Could Have Been ｜ EPIC FEMALE COVER (feat. Aloma Steele).mp3",
        "./musique/arcane/OST Arcane (League of Legends) - Isha's Song by Eason Chan (Piano Cover ⧸ Version).mp3",
        "./musique/arcane/Stromae, Pomme - Ma Meilleure Ennemie (from Arcane Season 2) - Piano Cover ⧸ Version.mp3",
        "./musique/arcane/Twenty One Pilots - The Line (from Arcane Season 2) - Piano Version ⧸ Cover.mp3",
        "./musique/arcane/OST Arcane (League of Legends) - Ramsey - Goodbye (Piano Version).mp3"],
    Chill:["./musique/chill/C418  - Sweden - Minecraft Volume Alpha.mp3",
        "./musique/chill/Dinner In Paris.mp3",
        "./musique/chill/evergreens.mp3",
        "./musique/chill/finally home.mp3",
        "./musique/chill/Lofitopia - Day Dream.mp3",
        "./musique/chill/Make A Wish.mp3",
        "./musique/chill/purpose_not_found.mp3",
        "./musique/chill/reminiscence.mp3",
        "./musique/chill/Waiting For You.mp3"],
    Snk:["./musique/snk/Akuma no Ko - Attack on Titan Final Season Part 2 ED [Piano].mp3",
        "./musique/snk/Attack On Titan OST - Call of Silence (Ymir's Theme).mp3",
        "./musique/snk/red swan - attack on titan opening ｜ but it's lofi hip hop.mp3",
        "./musique/snk/進撃pf-medley20130629巨人.mp3"],
    Totoro:["./musique/Totoro/Evening Wind (From ＂My Neighbor Totoro＂).mp3",
        "./musique/Totoro/Mother (Okaasan) - My Neighbor Totoro Ost.mp3",
        "./musique/Totoro/My Neighbor Totoro - Mei is Missing (orchestra cover) となりのトトロ  - メイがいない.mp3",
        "./musique/Totoro/Path Of The Wind (Totoro OST) - Joe Hisaishi(Piano ver.).mp3",
    ],
    Chihiro:["./musique/Chihiro/Always With Me - Spirited Away (Piano).mp3",
        "./musique/Chihiro/Joe Hisaishi - One Summer's Day - Spirited Away Soundtrack.mp3",
        "./musique/Chihiro/Spirited Away OST - Reprise ⧸ Again.mp3",
    ],
    Kiki:["./musique/Kiki/A Town With An Ocean View (Umi no Mieru Machi) - Kiki's Delivery Service Ost.mp3",
        "./musique/Kiki/An Unusual Painting (Shimpi naru E) - Kiki's Delivery Service Ost.mp3",
        "./musique/Kiki/Departure (Tabidachi) - Kiki's Delivery Service Ost.mp3",
        "./musique/Kiki/On a Clear Day (Hareta Hi ni) - Kiki's Delivery Service Ost.mp3",
        "./musique/Kiki/Osono's Request (Osono-san no Tanomigoto) - Kiki's Delivery Service Ost.mp3",
    ],
    HP:["./musique/HP/A Window to the Past.mp3",
        "./musique/HP/Harry Potter and the Chamber of Secrets Soundtrack - 02. Fawkes the Phoenix.mp3",
        "./musique/HP/Hedwig's Theme (Theme from Harry Potter).mp3",
        "./musique/HP/Secrets of the Castle.mp3",
        "./musique/HP/The Chamber of Secrets.mp3",
    ],
    Naruto:["./musique/Naruto/Faint.mp3",
        "./musique/Naruto/Naruto Shippuden - Samidare ｜EXTENDED｜ (Early Summer Rain.mp3",
        "./musique/Naruto/Naruto Shippūden OST - Many Nights (Sen'ya).mp3",
        "./musique/Naruto/Naruto Shippūden OST I - Setting Sun (落日).mp3",
        "./musique/Naruto/Naruto Shippuden OST II - Colorful Mist.mp3",
        "./musique/Naruto/Naruto Shippuden OST Original Soundtrack 13 - Loneliness.mp3",
        "./musique/Naruto/Naruto Soundtrack- Sadness and Sorrow (FULL VERSION).mp3",
    ],
    Ds:["./musique/Ds/「Kamado Tanjiro no Uta」Demon Slayer： Kimetsu no Yaiba (鬼滅の刃) [Demon Slayer ep 19 Ending Song].mp3",
        "./musique/Ds/Demon Slayer but its lofi - Gurenge.mp3",
        "./musique/Ds/nezuko’s theme but it’s lofi (Demon Slayer).mp3",
        "./musique/Ds/Rengoku's Theme but it's Lofi ~ Demon Slayer.mp3",
        "./musique/Ds/Zankyou Sanka (but it's lofi hiphop) ｜ Demon Slayer： Kimetsu no Yaiba.mp3",
    ],
    Op:["./musique/Op/Binks Sake (instrumental).mp3",
        "./musique/Op/Luffys Fierce Attack (Sleep).mp3",
        "./musique/Op/One Piece   The worlds number one Oden store .mp3",
        "./musique/Op/One Piece - To The Grand Line ~ 8D Audio [ Kato Cover ] ｜｜ FALTU CREATIONS.mp3",
        "./musique/Op/One Piece Movie 9 OST - Episode of Chopper - Sorezore no Tatakai.mp3",
        "./musique/Op/One Piece Original SoundTrack - After Eating,Grand Line!.mp3",
        "./musique/Op/One Piece Original SoundTrack - Grand Line Island Cold.mp3",
        "./musique/Op/One Piece Soundtrack - Gold And Oden HD.mp3",
        "./musique/Op/One Piece~Music & Song Collection 1~03 - Hungry Luffy.mp3",
        "./musique/Op/The Very, Very, Very Strongest (Sleep).mp3",
    ],
    SKZ:["./musique/SKZ/[갯마을 차차차 OST Part 7] 승민 (Stray Kids) (SEUNGMIN)) - Here Always MV.mp3",
        "./musique/SKZ/Changbin, Seungmin ＂조각＂ ｜ [Stray Kids ： SKZ-RECORD].mp3",
        "./musique/SKZ/Deep end (필릭스) Deep end (Felix).mp3",
        "./musique/SKZ/Falling Up.mp3",
        "./musique/SKZ/Leave.mp3",
        "./musique/SKZ/Mixtape3.mp3",
        "./musique/SKZ/Seungmin ＂그렇게, 천천히, 우리(As we are)＂ ｜ [Stray Kids ： SKZ-PLAYER].mp3",
        "./musique/SKZ/Stray Kids ＂Gone Away (한, 승민, 아이엔)(Gone Away (HAN, Seungmin, I.N))＂.mp3",
        "./musique/SKZ/Stray Kids ＂Lonely St.＂ Video.mp3",
        "./musique/SKZ/Stray Kids ＂Youtiful＂.mp3",
        "./musique/SKZ/Stray Kids ＂말할 수 없는 비밀(Secret Secret)＂.mp3",
        "./musique/SKZ/Stray Kids 『Scars』.mp3",
        "./musique/SKZ/Stray Kids 『SLUMP -Japanese ver.-』Music Video(TVアニメ「神之塔 -Tower of God-」ver.).mp3",
        "./musique/SKZ/Stray Kids 'Mixtape2' Video.mp3",
        "./musique/SKZ/일상 Another Day .mp3",
    ],
    Ft:["./musique/Ft/Fairy Tail - Kizuna.mp3",
        "./musique/FAIRY TAIL - Sad Past (Kanashiki Kako) Theme by Yasuharu Takanashi.mp3",
        "./musique/Ft/FAIRY TAIL Main Theme - SLOW.mp3",
        "./musique/Ft/Fairy Tail OST IV (Disc.1)- To My Beloved.mp3",
        "./musique/Ft/Fairy Tail OST V (Disc.1) - Sorrow Returns.mp3",
        "./musique/Ft/Mirajane no theme Ost - [Extended].mp3",
    ],
    Ghibli:["./musique/MixGhibli/2： The Girl Who Fell from the Sky CitS OST.mp3",
        "./musique/MixGhibli/3： The Levitation Crystal CitS OST.mp3",
        "./musique/MixGhibli/15： Confessions in the Moonlight CitS OST.mp3",
        "./musique/MixGhibli/17： The Lost Paradise CitS OST.mp3",
        "./musique/MixGhibli/Howl's Moving Castle [OST - Theme Song].mp3",
        "./musique/MixGhibli/Joe Hisaishi - One Summer's Day [TK1Ij_-mank].mp3",
        "./musique/MixGhibli/Mother Sea (from 'Ponyo on the Cliff by the Sea').mp3",
        "./musique/MixGhibli/Nausicaä of the Valley of the Wind (Piano) Nausicaa Requiem.mp3",
    ],
    Anime:["./musique/MixAnime/A Tender Feeling.mp3",
        "./musique/MixAnime/Bleach OST 2-A requiem(12).mp3",
        "./musique/MixAnime/Bubble - UTAtoHIBIKI by Hiroyuki Sawano.mp3",
        "./musique/MixAnime/Friendly Feelings.mp3",
        "./musique/MixAnime/Fullmetal Alchemist Brotherhood OST - Trisha's Lullaby.mp3",
        "./musique/MixAnime/Fullmetal Alchemist Ost  - Bratja.mp3",
        "./musique/MixAnime/Gracefully.mp3",
        "./musique/MixAnime/Nuvema Town： Arrangement ► Pokémon Black & White.mp3",
        "./musique/MixAnime/Route 201 (Night)： Remastered ► Pokémon Diamond⧸Pearl & Platinum.mp3",
        "./musique/MixAnime/Sinnoh Route 228 (Day)： Remastered ► Pokémon Brilliant Diamond & Shining Pearl.mp3",
        "./musique/MixAnime/Suzume no Tojimari『Suzume』Theme Song.mp3",
        "./musique/MixAnime/The First Town.mp3",
        "./musique/MixAnime/The Promised Neverland OST - Isabella’s Lullaby.mp3",
        "./musique/MixAnime/Virbank City： Remastered (Extended Version) ► Pokémon Black & White 2.mp3",
        "./musique/MixAnime/You Say Run.mp3",
    ],
    Games:["./musique/MixJeuxVidéo/Crusader Kings 3 OST- The Dynasty (Main Theme).mp3",
        "./musique/MixJeuxVidéo/Departure - The Legend of Zelda： Twilight Princess.mp3",
        "./musique/MixJeuxVidéo/Gustavo Santaolalla - The Last of Us (Astray), from ＂The Last of Us Part I＂ Soundtrack.mp3",
        "./musique/MixJeuxVidéo/Gustavo Santaolalla - The Last of Us (You and Me) ｜ The Last of Us (Video Game Soundtrack).mp3",
        "./musique/MixJeuxVidéo/Isle of Songs - The Legend of Zelda： Skyward Sword.mp3",
        "./musique/MixJeuxVidéo/Kakariko Village - The Legend of Zelda： Ocarina of Time Music Extended.mp3",
        "./musique/MixJeuxVidéo/Korok Forest - The Legend of Zelda： Breath of The Wild- Extended.mp3",
        "./musique/MixJeuxVidéo/Ori and the Blind Forest – Main Theme [Menu Music].mp3",
        "./musique/MixJeuxVidéo/Ori and the Blind Forest - Naru, Embracing the Light (feat. Rachel Mellis) - OST.mp3",
        "./musique/MixJeuxVidéo/Ori and the Blind Forest - Riding the Wind (feat. Rachel Mellis) - OST.mp3",
        "./musique/MixJeuxVidéo/ORI AND THE WILL OF THE WISPS OST - Main Theme (Menu Music) [EXTENDED].mp3",
        "./musique/MixJeuxVidéo/RDR2 Soundtrack (Mission 6 Cinematic Mix) Eastward Bound.mp3",
        "./musique/MixJeuxVidéo/Zelda BOTW - Hateno Village (Day) - Music.mp3",
    ]

}


var playlist = JSON.parse(localStorage.getItem('playlist')) || Object.values(Music).flat();
localStorage.setItem('playlist',JSON.stringify(playlist))

// Initialiser les cases cochées par défaut au premier lancement
if (!localStorage.getItem('music_select')) {
    // Récupérer tous les noms des cases
    var music_select = Array.from(document.querySelectorAll('#playlist input'))
    .filter(input => input.name !== 'NoMusic')
    .map(input => input.name);
    // Sauvegarder dans localStorage
    localStorage.setItem('music_select', JSON.stringify(music_select));
    
}else{
    var music_select=JSON.parse(localStorage.getItem('music_select'))
}


if(localStorage.getItem('AllMusic')=='true'){
    document.querySelectorAll('#playlist input').forEach(input =>{
        if(input.name!=='NoMusic'){
            input.checked=true
        }
    })
}

// Appliquer l'état initial des cases à cocher
for(let i=0;i<music_select.length;i++){
    document.getElementsByName(music_select[i])[0].checked=true
}

if (playlist.length>0){
    playlist=shuffle(playlist)
}

var currentTrackIndex = 0;

const audioPlayer = document.getElementById('music-player');

const audioSource = document.getElementById('audio-source');
if (playlist.length>0){
    audioSource.src = playlist[currentTrackIndex];
}

var progressBar=document.getElementById('progressBar');

if(playlist.length!==0){
    audioPlayer.load();
    audioPlayer.addEventListener('loadedmetadata', () => {
        progressBar.max = audioPlayer.duration;
    });
}


audioPlayer.addEventListener('timeupdate', () => {
    if  (inputProgressBar==false){
        progressBar.value = audioPlayer.currentTime; 
    }
    
    progressBar.max = audioPlayer.duration || 0; 
    
});

progressBar.addEventListener('input', () => {
    inputProgressBar=true
});

progressBar.addEventListener('change', () => {
    audioPlayer.currentTime = progressBar.value; 
});

progressBar.addEventListener('mouseup', () => {
    inputProgressBar=false
});


// Lecture de la musique
function playMusic() {
    if(playlist.length==0){
        alert("Aucune musique selectionner");
    }else{
        const audioSource = document.getElementById('audio-source');
        audioSource.src = playlist[currentTrackIndex];
        audioPlayer.load();
        audioPlayer.addEventListener('loadedmetadata', () => {
            progressBar.max = audioPlayer.duration;
        });
        audioPlayer.currentTime=progressBar.value
        audioPlayer.play();
        cover()
        title()
        duree()
    }
    
        
}

// Mettre en pause la musique
function pauseMusic() {
    if(playlist.length==0){
        alert("Aucune musique selectionner");
    }else{
        audioPlayer.pause();
    }
    
}

// Passer à la musique suivante
function playNext() {
    if(playlist.length==0){
        alert("Aucune musique selectionner");
    }else{
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        progressBar.value=0
        
        const audioSource = document.getElementById('audio-source');
        audioSource.src = playlist[currentTrackIndex];
        
        audioPlayer.addEventListener('loadedmetadata', () => {
            progressBar.max = audioPlayer.duration;
        });
        if(!audioPlayer.paused){
            audioPlayer.load();
            audioPlayer.play();
        }else{
            audioPlayer.load();
        }
        cover()
        title()
        duree()
    }
    
    

    
    if(currentTrackIndex==playlist.length-1){
        playlist=shuffle(playlist)
    }
}

function playPrevious(){
    if(playlist.length==0){
        alert("Aucune musique selectionner");
    }else{
        if (currentTrackIndex==0){
            currentTrackIndex=playlist.length-1
        }else{
            currentTrackIndex=currentTrackIndex-1
        }
        progressBar.value=0
        const audioSource = document.getElementById('audio-source');
        audioSource.src = playlist[currentTrackIndex];
        if(!audioPlayer.paused){
            audioPlayer.load();
            audioPlayer.play();
        }
        cover()
        title()
        duree()
        audioPlayer.load();
        audioPlayer.addEventListener('loadedmetadata', () => {
            progressBar.max = audioPlayer.duration;
        });
    }
    

}



function cover(){
    if(playlist.length!==0){
        fetch(playlist[currentTrackIndex])
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                jsmediatags.read(new Blob([arrayBuffer]), {
                    onSuccess: function(tag) {
                        const picture = tag.tags.picture;
                        if (picture) {
                            const base64String = picture.data.reduce((data, byte) => data + String.fromCharCode(byte), "");
                            const base64 = "data:" + picture.format + ";base64," + btoa(base64String);
                            coverImage.src = base64;
                            const img = document.getElementById("coverImage");
                            img.src = base64;
                            img.style.display = "block";
                        } else {
                            coverImage.src = ""; // Aucune cover trouvée
                        }
                    },
                    onError: function(error) {
                        coverImage.src = ""; // Aucun cover trouvé ou problème de lecture des métadonnées
                    }
                });
            })
    }  
}
cover()

function title(){
    if(playlist.length!==0){
        fetch(playlist[currentTrackIndex])
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                jsmediatags.read(new Blob([arrayBuffer]), {
                    onSuccess: function(tag) {
                        const titre = tag.tags.title;
                        if (titre) {
                            document.getElementById("titreMusique").innerHTML=titre
                        }
                    },
                    onError: function(error) {
                        document.getElementById("titreMusique").innerHTML=getMusicTitle(playlist[currentTrackIndex])
                    }
                });
            })
    }
    
}
title()

function duree(){
    if (playlist.length!==0){
        var audio= new Audio(playlist[currentTrackIndex])
        audio.onloadedmetadata=function(){
            const temps_musique=audio.duration
            if (temps_musique) {
                var heure = Math.floor(temps_musique / 3600);
                var minutes = Math.floor((temps_musique % 3600) / 60);
                var seconds = Math.floor(temps_musique % 60);
                if (heure>0){
                    if(minutes<10 && seconds>9){
                        document.getElementById("duree").innerHTML ="-"+heure+':'+'0'+minutes + ":" + seconds;
                    }else if(minutes<10 && seconds<10){
                        document.getElementById("duree").innerHTML ="-"+heure+':'+'0'+minutes + ":" + "0"+seconds;
                    }else if(minutes>9 && seconds<10){
                        document.getElementById("duree").innerHTML ="-"+heure+':'+minutes + ":" + "0"+seconds;
                    }else{
                        document.getElementById("duree").innerHTML ="-"+heure+':'+minutes + ":" + seconds;
                    }
                }else{
                    if(minutes<10 && seconds>9){
                        document.getElementById("duree").innerHTML ="-"+'0'+minutes + ":" + seconds;
                    }else if(minutes<10 && seconds<10){
                        document.getElementById("duree").innerHTML ="-"+'0'+minutes + ":" + "0"+seconds;
                    }else if(minutes>9 && seconds<10){
                        document.getElementById("duree").innerHTML ="-"+minutes + ":" + "0"+seconds;
                    }else{
                        document.getElementById("duree").innerHTML ="-"+minutes + ":" + seconds;
                    }
                }
                
            }
        }    
        audioPlayer.ontimeupdate = function(){
            var playbackTime = audioPlayer.currentTime;
            var audio= new Audio(playlist[currentTrackIndex])
            audio.onloadedmetadata=function(){
                const temps_musique=audio.duration-Math.floor(playbackTime.toFixed(2))
                if (Math.floor(temps_musique)==0){
                    playNext()
                    playMusic()
                }
                if (temps_musique) {
                    var heure = Math.floor(temps_musique / 3600);
                    var minutes = Math.floor((temps_musique % 3600) / 60);
                    var seconds = Math.floor(temps_musique % 60);
                    if (heure>0){
                        if(minutes<10 && seconds>9){
                            document.getElementById("duree").innerHTML ="-"+heure+':'+'0'+minutes + ":" + seconds;
                        }else if(minutes<10 && seconds<10){
                            document.getElementById("duree").innerHTML ="-"+heure+':'+'0'+minutes + ":" + "0"+seconds;
                        }else if(minutes>9 && seconds<10){
                            document.getElementById("duree").innerHTML ="-"+heure+':'+minutes + ":" + "0"+seconds;
                        }else{
                            document.getElementById("duree").innerHTML ="-"+heure+':'+minutes + ":" + seconds;
                        }
                    }else{
                        if(minutes<10 && seconds>9){
                            document.getElementById("duree").innerHTML ="-"+'0'+minutes + ":" + seconds;
                        }else if(minutes<10 && seconds<10){
                            document.getElementById("duree").innerHTML ="-"+'0'+minutes + ":" + "0"+seconds;
                        }else if(minutes>9 && seconds<10){
                            document.getElementById("duree").innerHTML ="-"+minutes + ":" + "0"+seconds;
                        }else{
                            document.getElementById("duree").innerHTML ="-"+minutes + ":" + seconds;
                        }
                    }
                    
                }
            }
        }
    }
    
}
duree()


// Obtenir les éléments
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal_content=document.getElementById('modal-content');

openModalBtn.onclick = function() {
    modal.style.display = "block"; 
    modal_content.style.display="block"
    setTimeout(function() {
        if (window.matchMedia("(max-width: 600px)").matches){
            modal_content.style.top = '2%';
        }else{
            modal_content.style.top = '-20%';
        }
        
        modal.style.opacity = 1;
    }, 10);

}

closeModalBtn.onclick = function() {
    modal.style.opacity = 0; 
    modal_content.style.top = '-50%';
    setTimeout(function() {
        modal.style.display = "none";
        modal_content.style.display = "none";
    }, 500); 
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.opacity = 0; 
        modal_content.style.top = '-50%';
        setTimeout(function() {
            modal.style.display = "none"; 
            modal_content.style.display = "none";
        }, 500);
    }
}

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

function getParentClasses(element) {
    let classes = [];
    let parent = element.parentElement;

    while (parent) {
        if (parent.classList.length > 0) {
            classes.push(...parent.classList);
        }
        parent = parent.parentElement; // Passe au parent suivant
    }

    return classes;
}


document.querySelectorAll('#playlist input').forEach(input =>{
    if(localStorage.getItem('NoMusic')=='true'){
        if(input.name=='NoMusic'){
            input.checked=true
        }else{
            input.checked=false
        }
    }
    if(localStorage.getItem('AllMusic')=='true'){
        if(input.name!=='NoMusic'){
            input.checked=true
        }
    }
    input.addEventListener('change',()=>{
        var taille_playlist=playlist.length
        if (input.name!=='All'){
            document.getElementById('all').checked=false
        }
        /* Gestion music quand case decocher */
        if (input.checked==false){
            /*gestion No Music*/
            if (input.name!=='NoMusic'){
                localStorage.setItem('AllMusic', 'false');
            }

            /*Gestion des playlist (remove)*/
            document.querySelectorAll('#playlist .dropdown-content input').forEach(inputTest =>{
                let nameInput=getParentClasses(inputTest)[4]
                if(input.name==inputTest.name){
                    document.getElementsByName(nameInput)[0].checked=false
                    music_select=music_select.filter(item=>item!==nameInput)
                    playlist=playlist.filter(item => item !==Music[nameInput][inputTest.value])
                    music_select=music_select.filter(item => item !==inputTest.name)
                }
            })
            document.querySelectorAll('#playlist .main-checkbox input').forEach(inputTest =>{
                if(inputTest.name==input.name){
                    document.querySelectorAll(`#playlist .${inputTest.name} .dropdown-content input`).forEach(inputDel =>{
                        inputDel.checked=false
                        music_select=music_select.filter(item=>item!==input.name)
                        let NameInput=inputTest.name
                        for(let i=0;i<Music[NameInput].length;i++){
                            playlist=playlist.filter(item =>item!==Music[NameInput][i])
                            music_select=music_select.filter(item=>item!==inputDel.name)
                        }
                    })
                }
            })
        }
        /**gestion case cocher */
        if (input.checked){
            /*gestion des playlists (add)*/


            
            let complete=true

            document.querySelectorAll('#playlist .dropdown .dropdown-content input').forEach(inputTest =>{
                if(input.name==inputTest.name){
                    let nameInput=getParentClasses(inputTest)[4]
                    document.querySelectorAll(`#playlist .${nameInput} .dropdown-content input`).forEach(inputTest =>{
                        if(inputTest.checked==false){
                            complete=false
                        }
                    })
                    if(complete==true){
                        document.getElementsByName(nameInput)[0].checked=true
                        music_select.push(nameInput)
                    }
                }
            })
            let done=false
            document.querySelectorAll('#playlist .dropdown .main-checkbox input').forEach(inputTest =>{
                if(input.name==inputTest.name){
                    done=true
                    let nameInput=getParentClasses(input)[2]
                    let NameInput=inputTest.name
                    for(let i=0;i<Music[NameInput].length;i++){
                        playlist=playlist.filter(item =>item!==Music[NameInput][i])
                    }
                    playlist.push(...Music[NameInput])
                    document.querySelectorAll(`#playlist .${input.name} input`).forEach(input =>{
                        input.checked=true
                        if(input.name){
                            music_select=music_select.filter(item=>item!==input.name)
                            music_select.push(input.name)
                        }
                    })
                }
            })
            if (done==false){
                let nameInput=getParentClasses(input)[4]
                document.querySelectorAll(`#playlist .${nameInput} .dropdown-content input`).forEach(inputTest =>{
                    if(input.name==inputTest.name){
                        playlist=playlist.filter(item =>item!==Music[nameInput][input.value])
                        playlist.push(Music[nameInput][input.value])
                        music_select.push(input.name)
                    }
                })
            }
            
            /*Gestion de NoMusic et All*/
            if (input.name!=='NoMusic'){
                localStorage.setItem('NoMusic', 'false');
                document.querySelectorAll('#playlist input').forEach(input =>{
                    if (input.name=='NoMusic'){
                        input.checked=false
                    }
                })
            }

            if (input.name=='NoMusic'){
                localStorage.setItem('NoMusic', 'true');
                localStorage.setItem('AllMusic', 'false');
                let allMusic = new Set(Object.values(Music).flat());
                playlist = playlist.filter(song => !allMusic.has(song));
                music_select=[]
                input.checked=true
                document.querySelectorAll('#playlist input').forEach(input =>{
                    if (input.name!=='NoMusic'){
                        input.checked=false
                    }
                })
            }else if (input.name=='All'){
                localStorage.setItem('AllMusic', 'true');
                document.querySelectorAll('#playlist input').forEach(input =>{
                    if (input.name!=='NoMusic'){
                        input.checked=true
                    }else{
                        input.checked=false
                    }
                    music_select=[]
                    let allMusic = new Set(Object.values(Music).flat());
                    playlist = playlist.filter(song => !allMusic.has(song));
                    if (input.name!=='All' && input.name!=='NoMusic'){
                        playlist.push(...Object.values(Music).flat())
                        document.querySelectorAll('#playlist input').forEach(input =>{
                            if(input.name!=='NoMusic' && input.name!=="All"){
                                music_select.push(input.name)
                            }
                        })
                    }
                })
            }
        }
        
        localStorage.setItem('playlist', JSON.stringify(playlist));
        localStorage.setItem('music_select', JSON.stringify(music_select));

        playlist=shuffle(playlist)
        if (audioPlayer.paused){
            currentTrackIndex=currentTrackIndex
            audioSource.src = playlist[currentTrackIndex];
            audioPlayer.load()
            audioPlayer.addEventListener('loadedmetadata', () => {
                progressBar.max = audioPlayer.duration;
            });
        }else if (taille_playlist>playlist.length){
            currentTrackIndex=currentTrackIndex
            
            playMusic()
        }
        
        cover()
        title()
        duree()
        
    })
})






const isMobile = window.matchMedia("(max-width: 768px)").matches;
const fond_select=document.getElementById('fond-select')


const optionsDesktop = [
    { value: "Train in tokyo", text: "Train in Tokyo" },
    { value: "Mont fuji", text: "Mont Fuji" },
    { value: "Train with nature", text: "Train with nature" },
    { value: "Chateau ambulant", text: "Chateau ambulant" },
    { value: "Star Wars", text: "Star Wars" },
    { value: "Chill with instruments", text: "Chill with instruments" },
    { value: "Reflet nocturne", text: "Reflet nocturne" },
    { value: "Coffee shop", text: "Coffee shop" },
    { value: "Kiki la petite sorcière", text: "Kiki la petite sorciere"},
    { value: "Kirby", text: "Kirby"},
];

const optionsMobile = [
    { value: "Train in tokyo", text: "Train in Tokyo" },
    { value: "Train with nature", text: "Train with nature" },
    { value: "Chateau ambulant", text: "Chateau ambulant" },
    { value: "Chill with instruments", text: "Chill with instruments" },
    { value: "Reflet nocturne", text: "Reflet nocturne" },
    { value: "Coffee shop", text: "Coffee shop" },
    { value: "Marché de nuit", text: "Marche de nuit" },
    { value: "Lily Pad Flowers", text: "Lily Pad Flowers" },
    { value: "Tropical Horizons", text: "Tropical Horizons" },
    { value: "Working studio", text: "Working studio" },
];

// Ajout des options dynamiquement
const options = isMobile ? optionsMobile : optionsDesktop;
options.forEach(option => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.text;
    fond_select.appendChild(opt);
});


let image=null
let ext=null
fond_select.addEventListener('change',(event)=>{
    if(event.target.value=='Train in tokyo'){
        image='url(./images/fond1.gif)'
        ext='../images/fond1.gif'
    }else if(event.target.value=="Train with nature"){
        image='url(./images/natureWithTrain.gif)'
        ext='../images/natureWithTrain.gif'
    }else if(event.target.value=='Chateau ambulant'){
        image='url(./images/chateauAmbulant.gif)'
        ext='../images/chateauAmbulant.gif'
    }else if(event.target.value=='Chill with instruments'){
        image='url(./images/instruments.gif)'
        ext='../images/instruments.gif'
    }else if(event.target.value=='Reflet nocturne'){
        image='url(./images/night.gif)'
        ext='../images/night.gif'
    }else if(event.target.value=='Coffee shop'){
        image='url(./images/cofeeShop.gif)'
        ext='../images/cofeeShop.gif'
    }
    if(isMobile){
        if(event.target.value=='Marché de nuit'){
            image='url(./images/NightTokyo.gif)'
            ext='../images/NightTokyo.gif'
        }else if(event.target.value=='Lily Pad Flowers'){
            image='url(./images/river.gif)'
            ext='../images/river.gif'
        }else if(event.target.value=='Tropical Horizons'){
            image='url(./images/vacance.gif)'
            ext='../images/vacance.gif'
        }else if(event.target.value=='Working studio'){
            image='url(./images/WorkStudio.gif)'
            ext='../images/WorkStudio.gif'
        }
    }else{
        if(event.target.value=='Kiki la petite sorcière'){
            image='url(./images/KikiLaPetiteSorcière.gif)'
            ext='../images/KikiLaPetiteSorcière.gif'
        }else if(event.target.value=='Kirby'){
            image='url(./images/Kirby.gif)'
            ext='../images/Kirby.gif'
        }else if(event.target.value=='Mont fuji'){
            image='url(./images/Fuji.gif)'
            ext='../images/Fuji.gif'
        }else if(event.target.value=='Star Wars'){
            image='url(./images/starWars.gif)'
            ext='../images/starWars.gif'
        }

    }
   
    document.body.style.backgroundImage =image
    extrait.src=ext
    localStorage.setItem('backgroundImage', image);
    localStorage.setItem('extraitImage', ext);
    savedBackground=image
    colori()

})

function colori(){
    if (savedBackground=='url(./images/cyberpunk.gif)'||savedBackground=='url(./images/natureWithTrain.gif)'||savedBackground=='url(./images/chateauAmbulant.gif)'
        ||savedBackground=='url(./images/Fuji.gif)'||savedBackground=='url(./images/cofeeShop.gif)'||savedBackground=='url(./images/NightTokyo.gif)'
        ||savedBackground=='url(./images/vacance.gif)'||savedBackground=='url(./images/WorkStudio.gif)'||savedBackground=='url(./images/Kirby.gif)'
    ){
        let timer=document.getElementById('chrono')
        timer.style.color='#f8bfd7'
        let music_timer=document.getElementById('duree')
        music_timer.style.color='#f8bfd7'
        let titre=document.getElementById('titreMusique')
        titre.style.color='#f8bfd7'
        let gear=document.getElementById("openModalBtn")
        gear.style.color='#f8bfd7'
        let bar=document.getElementById('progressBar')
        bar.style.backgroundColor='#ccb7b1'
        document.getElementById('coverImage').style.color='#ccb7b1'
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`
            #progressBar::-webkit-slider-thumb {
                background-color: #381717; /* Change la couleur de fond du thumb */
            #progressBar::-moz-range-thumb{
                background-color: #381717; /* Change la couleur de fond du thumb */
            }
            }
        `, style.sheet.cssRules.length);
        let footer=document.getElementById('copyright')
        footer.style.color='#f8bfd7'
        let header=document.getElementById('wrapper')
        header.style.color='#f8bfd7'
    }else{
        let timer=document.getElementById('chrono')
        timer.style.color='#000000'
        let music_timer=document.getElementById('duree')
        music_timer.style.color='#000000'
        let titre=document.getElementById('titreMusique')
        titre.style.color='#000000'
        let gear=document.getElementById("openModalBtn")
        gear.style.color='#000000'
        let bar=document.getElementById('progressBar')
        bar.style.backgroundColor='#381717'
        document.getElementById('coverImage').style.color='#000000'
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`
            #progressBar::-webkit-slider-thumb {
                background-color: #ccb7b1; /* Change la couleur de fond du thumb */
            #progressBar::-moz-range-thumb{
                background-color: #ccb7b1; /* Change la couleur de fond du thumb */
            }

            }
        `, style.sheet.cssRules.length);
        let footer=document.getElementById('copyright')
        footer.style.color='#000000'
        let header=document.getElementById('wrapper')
        header.style.color='#000000'
    }
}

var timerPomodoro=document.getElementById("numberInputWork")
var timerPomodoroNb=(Number(localStorage.getItem('timerPomodoro'))+1)/60;
if(!localStorage.getItem('timerPomodoro')){
    timerPomodoroNb=25
}
timerPomodoro.value=timerPomodoroNb

timerPomodoro.addEventListener('change',(event)=>{
    distance=(timerPomodoro.value*60)-1
    minutes = Math.floor((distance+1) /60);
    seconds = Math.floor((distance+1)-minutes*60);
    localStorage.setItem('timerPomodoro', distance);
    if (chronos=='chrono25'){
        actChrono()
    }
    

})

var timerShort=document.getElementById("numberInputShort")
var timerShortNb=(Number(localStorage.getItem('timerShort'))+1)/60;
if (!localStorage.getItem('timerShort')){
    timerShortNb=5
}
timerShort.value=timerShortNb
timerShort.addEventListener('change',(event)=>{
    distanceShort=(timerShort.value*60)-1
    minutes = Math.floor((distance+1) /60);
    seconds = Math.floor((distance+1)-minutes*60);
    localStorage.setItem('timerShort', distanceShort);
    if (chronos=='chrono5'){
        actChrono()
    }

})

var timerLong=document.getElementById("numberInputLong")
var timerLongNb=(Number(localStorage.getItem('timerLong'))+1)/60;
if (!localStorage.getItem('timerLong')){
    timerLongNb=10
}
timerLong.value=timerLongNb
timerLong.addEventListener('change',(event)=>{
    distanceLong=(timerLong.value*60)-1
    minutes = Math.floor((distance+1) /60);
    seconds = Math.floor((distance+1)-minutes*60);
    localStorage.setItem('timerLong', distanceLong);
    if (chronos=='chrono10'){
        actChrono()
    }

})

var parametre_sequence=document.getElementById("checkbox-sequence")
sequence=localStorage.getItem('Sequence');
if (!sequence){
    sequence='true'
}

if (sequence=='true'){
    parametre_sequence.checked=true
}else if (sequence=='false'){
    parametre_sequence.checked=false
}



parametre_sequence.addEventListener('change',()=>{
    if(parametre_sequence.checked){
        sequence='true'
    }else{
        sequence='false'
    }
    localStorage.setItem('Sequence', sequence);
})

var parametre_music=document.getElementById("checkbox-music")
MusicChrono=localStorage.getItem('MusicChrono');
if (!MusicChrono){
    MusicChrono='true'
}

if (MusicChrono=='true'){
    parametre_music.checked=true
}else if (MusicChrono=='false'){
    parametre_music.checked=false
}



parametre_music.addEventListener('change',()=>{
    if(parametre_music.checked){
        MusicChrono='true'
    }else{
        MusicChrono='false'
    }
    localStorage.setItem('MusicChrono', MusicChrono);
})

var volume=localStorage.getItem('Volume');
var progressBarSound=document.getElementById('progressBarSound')

if (!volume){
    volume=0.5
    progressBarSound.value=0.5
}else{
    progressBarSound.value=volume
}
audioPlayer.volume=volume

progressBarSound.addEventListener('input',()=>{
    volume=progressBarSound.value
    audioPlayer.volume=volume
    
})

progressBarSound.addEventListener('mouseup',()=>{
    localStorage.setItem('Volume', volume);
})


var selectBel=document.getElementById('bell-select')
var audio_source_bell=document.getElementById('audio-source-bell')
var lien=null

selectBel.addEventListener('change',(event)=>{
    if(event.target.value=='Boxing Bell'){
        lien="./musique/bells/Boxing Bell Sound Effect [0sORXQ-KHXw].mp3"
        audio_source_bell.src=lien
    }else if(event.target.value=='Meditation Bell'){
        lien="./musique/bells/iPhone Chime Alarm⧸Ringtone (Apple Sound) - Sound Effect for Editing [rKhehGcObNI].mp3"
        audio_source_bell.src=lien
    }else if(event.target.value=='Ram Bell'){
        lien="./musique/bells/Meditation bell sound relaxation deep sleep [8tHQfe5D69I].mp3"
        audio_source_bell.src=lien
    }else if(event.target.value=='Iphone Bell'){
        lien="./musique/bells/Ram Bell Sound [FuPvbVgEH_c].mp3"
        audio_source_bell.src=lien
    }
    audioSourceBell.load()
    localStorage.setItem('Bell', lien);
})

var btn_bell=document.getElementById('SoundBell')

btn_bell.onclick=function(){
    audioSourceBell.play()
}

var volumeBell=localStorage.getItem('VolumeBell');
var progressBarbell=document.getElementById('progressBarbell')

if (!volumeBell){
    volumeBell=0.5
    progressBarbell.value=0.5
}else{
    progressBarbell.value=volumeBell
}
audioSourceBell.volume=volumeBell

progressBarbell.addEventListener('input',()=>{
    volumeBell=progressBarbell.value
    audioSourceBell.volume=volumeBell
    
})

progressBarbell.addEventListener('mouseup',()=>{
    localStorage.setItem('VolumeBell', volumeBell);
})

document.querySelectorAll('.dropdown .arrow').forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const dropdown = arrow.closest('.dropdown');
        dropdown.classList.toggle('open');
        arrow.classList.toggle('rotate');
    });
});

document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(subCheckbox => {
    subCheckbox.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});



const token = localStorage.getItem("access_token");
if (token && isTokenExpired(token)) {
    refreshAccessToken();
    

}else if(token && !isTokenExpired(token)){
    user_id();

}else if(!token){
    let message_no_compte = document.createElement('span');
    message_no_compte.id = "message_no_compte"
    let collect = document.getElementById("tab5")
    collect.append(message_no_compte);
    document.getElementById('InputChooseMusic').style.display="none"
    message_no_compte.innerHTML = "Vous devez-vous connecter pour pouvoir utiliser cette fonctionnalite"
    let btnCompte=document.createElement('button');
    btnCompte.innerText='Se connecter';
    btnCompte.className='Back';
    btnCompte.onclick = function() {
        window.location.href = './html/compte.html';
    };
    let btnCreateCompte=document.createElement('button');
    btnCreateCompte.innerText='Cree un compte';
    btnCreateCompte.className='BackCreate';
    btnCreateCompte.onclick = function() {
        window.location.href = './html/creer-compte.html';
    };
    collect.append(btnCompte)
    collect.append(btnCreateCompte)
    let message_compte = document.getElementById("connect");
    if (message_compte) {
        message_compte.remove();
    }
}



const API_KEY = 'AIzaSyCFrfNK2zvw0YFTyioiGELElw8gwI4OIFc';
const searchInput = document.getElementById('youtubeSearch');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const preview = document.getElementById('preview');

if(token){
    const downloadButton = document.getElementById('downloadButton');

    downloadButton.disabled = true;

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (!query) {
            alert('Veuillez entrer un terme de recherche.');
            return;
        }

        // Appel à l'API YouTube
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${API_KEY}`);
        const data = await response.json();
        displayResults(data.items);
    });

    document.getElementById('youtubeSearch').addEventListener('keydown',async(event)=>{
        if(event.key=='Enter'){
            const query = searchInput.value.trim();
            if (!query) {
                alert('Veuillez entrer un terme de recherche.');
                return;
            }
    
            // Appel à l'API YouTube
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${API_KEY}`);
            const data = await response.json();
            displayResults(data.items);
    
        }
    })
    downloadButton.addEventListener('click',()=>{
        downloadVideo()
    })
}



let id=0
let videoId=""
let userId=""


function displayResults(items) {
    downloadButton.disabled = false;

    searchResults.innerHTML = '';
    items.forEach(item => {
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;

        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const img = document.createElement('img');
        img.src = thumbnail;
        img.alt = title;
        img.id='idVideo'+id;
        img.className='VideoImg'
        img.value=item.id.videoId;
        img.ariaValueNow=item.id.videoId;

        const text = document.createElement('span');
        text.textContent = title;
        text.id='idVideo'+id;
        text.className='VideoTitle'
        id=id+1;

        resultItem.appendChild(img);
        resultItem.appendChild(text);
        searchResults.appendChild(resultItem);
    });
    document.querySelectorAll(".VideoImg").forEach(element=>{
        element.addEventListener('click',()=>{
            document.querySelectorAll(".VideoTitle").forEach(element2=>{
                if(element.id==element2.id){
                    videoId=element.ariaValueNow
                    element2.style.color='#fbff00'
                }else{
                    element2.style.color='#ffffff'
                }
            })
        })
    })
}


const loadingSpinner = document.getElementById("loader");
const btnDl=document.getElementById('downloadButton')

async function downloadVideo() {
    let videoId5=videoId
    let userId5=userId
    loadingSpinner.style.display = "block";
    if(isMobile){
        btnDl.style.left="6vw";
    }else{
        btnDl.style.left="2vw";
    }
    
    if (videoId5!=="" && userId5!==""){
        const response = await fetch('http://127.0.0.1:8000/download_youtube_video', {
            method: 'POST',
            headers: { 
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json' },
            body: JSON.stringify({url:`https://www.youtube.com/watch?v=${videoId5}`,user_id:userId5})
        });
        loadingSpinner.style.display = "none";
        if(isMobile){
            btnDl.style.left="14vw";
        }else{
            btnDl.style.left="7vw";
        }
        
        if (response.ok) {
            alert('Téléchargement réussi');
        }else if(response.status==410){
            alert("Erreur la vidéo que vous essayer de télécharger n'est pas une musique");
        }else {
        alert('Erreur lors du téléchargement.');
        }
    }else{
        loadingSpinner.style.display = "none";
        if(isMobile){
            btnDl.style.left="14vw";
        }else{
            btnDl.style.left="7vw";
        }
    }
}

const tabsMusique = document.querySelectorAll('.tabMusique');
const tabMusique_content = document.querySelectorAll('.tab-content-Musique');
if(token){
    tabsMusique.forEach(tabMusique => {
        tabMusique.addEventListener('click', () => {
            
            tabsMusique.forEach(t => t.classList.remove('active'));
            tabMusique_content.forEach(content => content.classList.remove('active'));

            tabMusique.classList.add('active');
            document.getElementById(tabMusique.dataset.tab).classList.add('active');
        });
    });
    const tab5=document.getElementById('tab5.1')
    tab5.addEventListener('click',()=>{
        document.querySelectorAll('.result-music').forEach(element => {
            element.remove();
        });
        Mymusique()
    })

}


async function Mymusique(){
    let userId10=String(userId)
    const token = localStorage.getItem("access_token");
    const response=await fetch("http://127.0.0.1:8000/get_music/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id_music:userId10}),
    }).then(response => response.json())
        .then(data => {
            const tabMusique1=document.getElementById("tabMusique1")
            let list_music=data.music_dict.map(item => item.path)
            const inputMusicPerso=document.querySelectorAll('.inputMusicPerso') 
            for(let i=0;i<inputMusicPerso.length;i++){
                AllMusicItem.push(inputMusicPerso[i].id)
            }
            
            
            window.search=function search() {
                
                
                
                
                const query = document.getElementById("searchInput").value.trim();
                const resultDiv = document.getElementById("result");
            
                if (query === "") {
                    try{
                        document.querySelectorAll('.result-music').forEach(element => {
                            element.remove();
                        });
                    }finally{
                        let resultChoiceAllMusic = document.createElement('div');
                        resultChoiceAllMusic.id = 'result-choice-all-music';
                        resultChoiceAllMusic.className = 'result-music';

                        const textAllMusicPerso = document.createElement('label');
                        textAllMusicPerso.textContent = "Tout selectionner";

                        const inputAllMusicPerso=document.createElement("input");
                        inputAllMusicPerso.type="checkbox";
                        inputAllMusicPerso.id='inputAllMusicPerso'

                        resultChoiceAllMusic.appendChild(inputAllMusicPerso)
                        resultChoiceAllMusic.appendChild(textAllMusicPerso)
                        tabMusique1.appendChild(resultChoiceAllMusic);  

                        let resultChoiceNoMusic = document.createElement('div');
                        resultChoiceNoMusic.id = 'result-choice-no-music';
                        resultChoiceNoMusic.className = 'result-music';

                        const textNoMusicPerso = document.createElement('label');
                        textNoMusicPerso.textContent = "Tout deselectionner";

                        const inputNoMusicPerso=document.createElement("input");
                        inputNoMusicPerso.type="checkbox";
                        inputNoMusicPerso.id='inputNoMusicPerso'

                        resultChoiceNoMusic.appendChild(inputNoMusicPerso)
                        resultChoiceNoMusic.appendChild(textNoMusicPerso)
                        tabMusique1.appendChild(resultChoiceNoMusic);   

                        for(let i=0;i<list_music.length;i++){
                            
                            let resultMusic = document.createElement('div');
                            resultMusic.className = 'result-music';
                            resultMusic.id=`result-music${i}`
                            

                            const text = document.createElement('label');
                            text.textContent = list_music[i];

                            const button = document.createElement('button');
                            button.className = 'trash-button'; 
                            button.id=`trash-button${i}`
                            
                            
                            const icon = document.createElement('i');
                            icon.className = 'fa-solid fa-trash'; 

                            button.appendChild(icon);

                            const input=document.createElement("input");
                            input.type="checkbox";
                            input.id=list_music[i];
                            input.className="inputMusicPerso"
                            
                            resultMusic.appendChild(input)
                            resultMusic.appendChild(text)
                            resultMusic.appendChild(button)
                            tabMusique1.appendChild(resultMusic);  
                            
                            
                        }
                        }
                    document.querySelectorAll('.trash-button').forEach(element => {
                        element.addEventListener('click',()=>{
                            pageDelMusic(element)
                        })
                    });
                    if(iteratio==0){
                        
                        const inputMusicPerso=document.querySelectorAll('.inputMusicPerso') 
                        for(let i=0;i<inputMusicPerso.length;i++){
                            AllMusicItem.push(inputMusicPerso[i].id)
                        }
                        iteratio=1
                    }
                    AllMusicPerso()
                    addMusicPerso()
                    NoMusicPerso()
                    cochedMusicPerso()
                    
                }else{
                    document.querySelectorAll('.result-music').forEach(element => {
                        element.remove();
                        AllMusicItem=AllMusicItem
                    });
                // Calculer les similarités pour chaque élément
                

                const scoredItems = AllMusicItem.map(item => ({
                    item, 
                    score: jaroWinkler(query.toLowerCase(), item.toLowerCase()) // Le score calculé
                }));
                    
                
                // Trier par similarité décroissante
                scoredItems.sort((a, b) => b.score - a.score);
                for(let i=0;i<3;i++){
                    
                    const bestMatch = scoredItems[i]
                    let resultMusic = document.createElement('div');
                    resultMusic.className = 'result-music';
                    resultMusic.id='result-music'

                    const text = document.createElement('label');
                    text.textContent = bestMatch.item;

                    const input=document.createElement("input");
                    input.type="checkbox";
                    input.id=bestMatch.item;
                    input.className="inputMusicPerso"

                    resultMusic.appendChild(input)
                    resultMusic.appendChild(text)
                    tabMusique1.appendChild(resultMusic);  
                    addMusicPerso()
                    cochedMusicPerso()
                }
                }
            
                
                // Afficher le meilleur résultat
            
            }
            search()
            

            
        })
}

function pageDelMusic(element){
    let supprfenetreConteneur = document.createElement('div');
    supprfenetreConteneur.className='supprfenetreConteneur'

    let supprfenetre = document.createElement('div');
    supprfenetre.className='supprfenetre'

    const textsupprfenetre=document.createElement('label')
    textsupprfenetre.className='textsupprfenetre'
    textsupprfenetre.innerHTML=`Etes vous sur de vouloir supprimer cette musique ? `
    supprfenetre.appendChild(textsupprfenetre);  
    
    const buttonclosesupprfenetre=document.createElement('button')
    buttonclosesupprfenetre.className='buttonclosesupprfenetre'
    buttonclosesupprfenetre.id="buttonclosesupprfenetre"
    const iconClose = document.createElement('i');
    iconClose.className = 'fa-solid fa-xmark'; 
    buttonclosesupprfenetre.appendChild(iconClose);  
    supprfenetre.appendChild(buttonclosesupprfenetre);
    
    
    const buttonyesupprfenetre=document.createElement('button')
    buttonyesupprfenetre.className='buttonyesupprfenetre'
    buttonyesupprfenetre.appendChild(document.createTextNode(' Supprimer'));  
    supprfenetre.appendChild(buttonyesupprfenetre);  
    supprfenetreConteneur.appendChild(supprfenetre)
    document.getElementById('tabMusique1').appendChild(supprfenetreConteneur);  
    
    buttonclosesupprfenetre.addEventListener('click', () => {
        supprfenetreConteneur.remove();
        document.removeEventListener('click', handleOutsideClick);
    });

    buttonyesupprfenetre.addEventListener('click',async()=>{
        let userId5=userId
        await fetch("http://127.0.0.1:8000/supprMusic/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name_music:document.querySelector(`#${element.parentElement.id} label `).innerHTML,user_id:userId5}),
        })
        document.querySelectorAll('.result-music').forEach(element => {
            element.remove();
        });
        Mymusique()
        supprfenetreConteneur.remove();
    })
    
    const handleOutsideClick = (event) => {
        if (!supprfenetre.contains(event.target)) {
            supprfenetreConteneur.remove();
            document.removeEventListener('click', handleOutsideClick);
        }
    };

    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);


}

var music_select_Perso=JSON.parse(localStorage.getItem('music_select_Perso')) || []

function NoMusicPerso(){
    const inputNoMusicPerso=document.getElementById('inputNoMusicPerso')
    const inputMusicPerso=document.querySelectorAll('.inputMusicPerso')
    inputNoMusicPerso.addEventListener('change',()=>{
        localStorage.setItem('AllMusicPerso',false)
        document.getElementById('inputAllMusicPerso').checked=false
        if(inputNoMusicPerso.checked){
            localStorage.setItem('NoMusicPerso',true)
            for(let i=0;i<inputMusicPerso.length;i++){
                inputMusicPerso[i].checked=false
                music_select_Perso=music_select_Perso.filter(item=>item!==inputMusicPerso[i].id)
                for(let j=0;j<playlist.length;j++){
                    if(inputMusicPerso[i].id== getMusicTitle(playlist[j])){
                        playlist=playlist.filter(items=>items!==playlist[j])
                    }
                }
            }
            localStorage.setItem('playlist', JSON.stringify(playlist));
            localStorage.setItem('music_select_Perso', JSON.stringify(music_select_Perso));
        }else{
            localStorage.setItem('NoMusicPerso',false)
        }
        
    })
}

function AllMusicPerso(){
    const inputAllMusicPerso=document.getElementById('inputAllMusicPerso')
    const inputMusicPerso=document.querySelectorAll('.inputMusicPerso')
    let listAllMusicPerso=[]
    inputAllMusicPerso.addEventListener('change',async ()=>{
        if(inputAllMusicPerso.checked){
            localStorage.setItem('AllMusicPerso',true)
            localStorage.setItem('NoMusicPerso',false)
            document.getElementById('inputNoMusicPerso').checked=false
            for(let i=0;i<inputMusicPerso.length;i++){
                music_select_Perso=music_select_Perso.filter(item=>item!==inputMusicPerso[i].id)
                localStorage.setItem('music_select_Perso', JSON.stringify(music_select_Perso));
                inputMusicPerso[i].checked=false
                for(let j=0;j<playlist.length;j++){
                    if(inputMusicPerso[i].id== getMusicTitle(playlist[j])){
                        playlist=playlist.filter(items=>items!==playlist[j])
                    }
                    
                }
            }
            for(let i=0;i<inputMusicPerso.length;i++){
                listAllMusicPerso.push(inputMusicPerso[i].id)
            }
            const token = localStorage.getItem("access_token");

            await fetch("http://127.0.0.1:8000/get_plays_music/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name_music:listAllMusicPerso}),
            }).then(response => response.json())
            .then(data => {
                let list_music=data.map(item => item.signedURL)
                for(let i=0;i<list_music.length;i++){
                    playlist.push(list_music[i])
                }
                for(let i=0;i<inputMusicPerso.length;i++){
                    inputMusicPerso[i].checked=true
                    music_select_Perso.push(inputMusicPerso[i].id)
                }
                list_music=[]
                listAllMusicPerso=[]
                playlist=shuffle(playlist)
                localStorage.setItem('playlist', JSON.stringify(playlist));
                localStorage.setItem('music_select_Perso', JSON.stringify(music_select_Perso));

                duree()
                title()
                cover()
            })
            
        }else{
            localStorage.setItem('AllMusicPerso',false)
            for(let i=0;i<inputMusicPerso.length;i++){
                music_select_Perso=music_select_Perso.filter(item=>item!==inputMusicPerso[i].id)
                localStorage.setItem('music_select_Perso', JSON.stringify(music_select_Perso));
                inputMusicPerso[i].checked=false
                for(let j=0;j<playlist.length;j++){
                    if(inputMusicPerso[i].id== getMusicTitle(playlist[j])){
                        playlist=playlist.filter(items=>items!==playlist[j])
                    }
                }
                playlist=shuffle(playlist)
                localStorage.setItem('playlist', JSON.stringify(playlist));
            }
        }
    })
}
    

function addMusicPerso(){
    const inputMusicPerso=document.querySelectorAll('.inputMusicPerso')
    inputMusicPerso.forEach(music=>{
        music.addEventListener('change',async ()=>{
        const token = localStorage.getItem("access_token");
        const response=await fetch("http://127.0.0.1:8000/get_play_music/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name_music:music.id}),
    }).then(response => response.json())
        .then(data => {
            let list_music = Object.values(data)
            if(music.checked){
                playlist.push(list_music[0])
                document.getElementById("titreMusique").innerHTML=music.id
                playlist=shuffle(playlist)
                localStorage.setItem('playlist', JSON.stringify(playlist));
                music_select_Perso.push(music.id)
                localStorage.setItem('music_select_Perso', JSON.stringify(music_select_Perso));
                duree()
            }else{
                document.getElementById('inputAllMusicPerso').checked=false
                localStorage.setItem('AllMusicPerso',false)
                music_select_Perso=music_select_Perso.filter(item=>item!==music.id)
                localStorage.setItem('music_select_Perso', JSON.stringify(music_select_Perso));                
                for(let i=0;i<playlist.length;i++){
                    if(music.id== getMusicTitle(playlist[i])){
                        playlist=playlist.filter(items=>items!==playlist[i])
                    }
                }

                playlist=shuffle(playlist)
                localStorage.setItem('playlist', JSON.stringify(playlist));


            }
            
            })
        })
    })
}

function getMusicTitle(url) {
    // Extraire le chemin du fichier
    const path = url.split('/').pop().split('?')[0];

    // Décoder les caractères spéciaux
    const decodedTitle = decodeURIComponent(path);



    return decodedTitle;
}


function cochedMusicPerso(){
    const inputMusicPerso=document.querySelectorAll('.inputMusicPerso')
    inputMusicPerso.forEach(music=>{
        
        for(let i=0;i<music_select_Perso.length;i++){
            if(music.id==music_select_Perso[i]){
                music.checked=true
            }
        }
    })
    try{
        if(localStorage.getItem('AllMusicPerso')=='true'){
            const inputAllMusicPerso=document.getElementById('inputAllMusicPerso')
            if(inputAllMusicPerso){
                inputAllMusicPerso.checked=true
            }
        }
        if(localStorage.getItem('NoMusicPerso')=='true'){
            const inputNoMusicPerso=document.getElementById('inputNoMusicPerso');
            if(inputNoMusicPerso){
                inputNoMusicPerso.checked=true
            }
        }
    }finally{
        
    }
    
}







function jaroWinkler(s1, s2) {
    const m = 0.1; // Poids de la longueur commune
    const p = 0.1; // Poids pour ajuster l'importance des premiers caractères

    const s1Len = s1.length;
    const s2Len = s2.length;
    
    if (s1Len === 0 || s2Len === 0) return 0;

    const matchDistance = Math.floor(Math.max(s1Len, s2Len) / 2) - 1;
    let matches = 0;
    let transpositions = 0;

    // Tableau pour les marques de caractères correspondants
    const s1Matches = Array(s1Len).fill(false);
    const s2Matches = Array(s2Len).fill(false);

    // Trouver les correspondances
    for (let i = 0; i < s1Len; i++) {
        for (let j = Math.max(0, i - matchDistance); j < Math.min(s2Len, i + matchDistance + 1); j++) {
            if (s1[i] === s2[j] && !s2Matches[j]) {
                s1Matches[i] = true;
                s2Matches[j] = true;
                matches++;
                break;
            }
        }
    }

    // Si aucun caractère ne correspond, la similarité est nulle
    if (matches === 0) return 0;

    // Calculer les transpositions
    let k = 0;
    for (let i = 0; i < s1Len; i++) {
        if (s1Matches[i]) {
            while (!s2Matches[k]) k++;
            if (s1[i] !== s2[k]) transpositions++;
            k++;
        }
    }

    transpositions /= 2;

    // Calcul du score de Jaro
    const jaro = ((matches / s1Len) + (matches / s2Len) + ((matches - transpositions) / matches)) / 3;

    // Appliquer la correction de Jaro-Winkler pour les premiers caractères
    const l = s1.split('').findIndex((char, i) => char !== s2[i]);
    const jaroWinklerScore = jaro + (Math.min(l, 4) * p * (1 - jaro));

    return jaroWinklerScore;
}

document.getElementById('searchInput').addEventListener('input',()=>{
    search()
})
    
function getCookies(cookieName) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [name, value] = cookies[i].split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return null; 
}



if(token){
    document.querySelector('.logIn').remove()
    document.querySelector('.CreateAccount').remove()
    let btnLogOut=document.createElement('button')
    btnLogOut.className="logOut"
    btnLogOut.innerHTML='Se deconnnecter'
    document.querySelector('.connection').appendChild(btnLogOut)
    
    btnLogOut.addEventListener('click',()=>{
        localStorage.removeItem('access_token')
        window.location.reload(); 

    })
    
}else{
    document.querySelector('.logIn').addEventListener('click',()=>{
        window.location.href = "./html/compte.html";
    })

    document.querySelector('.CreateAccount').addEventListener('click',()=>{
        window.location.href = "./html/creer-compte.html";
    })
}


document.querySelector('.infoDlMusic').addEventListener('click',()=>{
    let fermerInfoContent = document.createElement('div');
    fermerInfoContent.className='supprfenetreConteneur'

    let fermerInfo = document.createElement('div');
    fermerInfo.className='fermerInfo'

    const textfermerInfo=document.createElement('label')
    textfermerInfo.className='textfermerInfo'
    textfermerInfo.innerHTML=`Avec cette fonctionnaliter vous pouvez rechercher votre musique puis la telecharger, vous pourrer alors la retrouver dans vos music pour l'ecouter`
    fermerInfo.appendChild(textfermerInfo);  
    
    const buttonclosefermerInfo=document.createElement('button')
    buttonclosefermerInfo.className='buttonclosefermerInfo'
    buttonclosefermerInfo.id="buttonclosefermerInfo"
    const iconClose = document.createElement('i');
    iconClose.className = 'fa-solid fa-xmark'; 
    buttonclosefermerInfo.appendChild(iconClose);  
    fermerInfo.appendChild(buttonclosefermerInfo);

    fermerInfoContent.appendChild(fermerInfo); 
    document.getElementById('tabMusique2').appendChild(fermerInfoContent);  
    
    buttonclosefermerInfo.addEventListener('click', () => {
        fermerInfoContent.remove();
        document.removeEventListener('click', handleOutsideClick);
    });
    
    const handleOutsideClick = (event) => {
        if (!fermerInfo.contains(event.target)) {
            fermerInfoContent.remove();
            document.removeEventListener('click', handleOutsideClick);
        }
    };

    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);

})