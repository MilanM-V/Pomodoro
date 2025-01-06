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
            /*gestion de la playlist Arcane (add)*/


            
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
                playlist=[]
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
                    playlist=[]
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
                console.log(audioPlayer.duration)
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

