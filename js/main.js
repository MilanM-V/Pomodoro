
var x=null;
var chronos='chrono25'

var distance = localStorage.getItem('timerPomodoro') || [];

var distanceShort =localStorage.getItem('timerShort') || [];

var distanceLong=localStorage.getItem('timerLong') || [];

var run=false
var repetition=0
const audioSourceBell = document.getElementById('music-player-bell');
var minutes = Math.floor((Number(distance)+1) /60);
var seconds = Math.floor((Number(distance)+1)-minutes*60);
console.log(minutes+':'+seconds)
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
    minutes = Math.floor((distance+1) /60);
    seconds = Math.floor((distance+1)-minutes*60);
    //modidier le text
    actChrono()
    
    distance-=1;
    //stop repetiton
    if (distance == 0) {
        audioSourceBell.play()
        distance=localStorage.getItem('timerPomodoro') || [];
        clearInterval(x);
        if (repetition<3){
            chrono5()
        }else{
            chrono10()
            repetition=0
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
    minutes = Math.floor((distanceShort+1) /60);
    seconds = Math.floor((distanceShort+1)-minutes*60);
    //modidier le text
    actChrono()
    distanceShort-=1;
    //stop repetiton
    if (distanceShort ==0) {
        audioSourceBell.play()
        distanceShort=localStorage.getItem('timerShort') || [];
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
    minutes = Math.floor((distanceLong+1) /60);
    seconds = Math.floor((distanceLong+1)-minutes*60);
    //modidier le text
    actChrono()
    distanceLong-=1;
    //stop repetiton
    if (distanceLong ==0) {
        audioSourceBell.play()
        distanceLong=localStorage.getItem('timerLong') || [];
        clearInterval(x);
        chrono25()
    }
    }, 1000);
}


const button_start=document.getElementById('start');
button_start.addEventListener('click',function(){
    if (run==false){
        audioPlayer.play();  
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
            distance=localStorage.getItem('timerPomodoro') || [];
            actChrono()
            chrono25()
        }else if(chronos=='chrono5'){
            distanceShort =localStorage.getItem('timerShort') || [];
            actChrono()
            chrono5()
        }else{
            distanceLong =localStorage.getItem('timerLong') || [];
            actChrono()
            chrono10()
        }
        run=false

    }else{
        clearInterval(x)
        if(chronos=='chrono25'){
            distance=localStorage.getItem('timerPomodoro') || [];
            minutes = Math.floor((distance+1) /60);
            seconds = Math.floor((distance+1)-minutes*60);
            actChrono()
        }else if(chronos=='chrono5'){
            distanceShort =localStorage.getItem('timerShort') || [];
            minutes = Math.floor((distanceShort+1) /60);
            seconds = Math.floor((distanceShort+1)-minutes*60);
            actChrono()
        }else{
            distanceLong =localStorage.getItem('timerLong') || [];
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

var playlist = [];


// Initialiser les cases cochées par défaut au premier lancement
if (!localStorage.getItem('playlist_select')) {
    // Récupérer tous les noms des cases
    const defaultChecked = Array.from(document.querySelectorAll('#playlist input')).map(input => input.name);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('playlist_select', JSON.stringify(defaultChecked));
}

// Récupérer les données de localStorage au chargement
var playlist_select = JSON.parse(localStorage.getItem('playlist_select')) || [];

// Appliquer l'état initial des cases à cocher
document.querySelectorAll('#playlist input').forEach(input => {
    if (playlist_select.includes(input.name)) {
        input.checked = true;
        if (input.name=='Arcane'){
            playlist.push("./musique/arcane/Arcane (League of Legends) - I Can't Hear It Now - Solo Piano [+ Sheet Music] [8YFFXHfKP1o].mp3",
                "./musique/arcane/Stromae, Pomme - Ma Meilleure Ennemie (from Arcane Season 2) - Piano Cover ⧸ Version [0Z7jXlBV_nU].mp3",
                "./musique/arcane/OST Arcane (League of Legends) - Isha's Song by Eason Chan (Piano Cover ⧸ Version) [Us1IwcpRE1Y].mp3",
                "./musique/arcane/ARCANE： What Could Have Been ｜ EPIC FEMALE COVER (feat. Aloma Steele) [Vva-uRgATZ0].mp3"
            )
        }
        if(input.name=='Snk'){
            playlist.push("./musique/snk/attack on titan lofi ~ akuma no ko (aot season 4 part 2 ending) [IOZd-HarjZw].mp3",
                "./musique/snk/Attack On Titan OST - Call of Silence (Ymir's Theme) [buZcLljh9eI].mp3",
                "./musique/snk/red swan - attack on titan opening ｜ but it's lofi hip hop [AU-JN4bWI44].mp3",
                "./musique/snk/進撃pf-medley20130629巨人 [IPWiiR5MVv4].mp3"
            )
        }
        if(input.name=='Chill'){
            playlist.push("./musique/chill/C418  - Sweden - Minecraft Volume Alpha [aBkTkxKDduc].mp3",
                "./musique/chill/Dinner In Paris [cfCKtt7OwdI].mp3",
                "./musique/chill/Lofitopía - Day Dream [Ft2wWaP8avI].mp3",
                "./musique/chill/purpose_not_found.mp3 [sinlicB1WyU].mp3"
            )
        }
    }
});
playlist=shuffle(playlist)
var currentTrackIndex = 0;

const audioPlayer = document.getElementById('music-player');



audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = audioPlayer.currentTime; 
    progressBar.max = audioPlayer.duration || 0; 
    
});

progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = progressBar.value; 
});

// Lecture de la musique
function playMusic() {
    const audioSource = document.getElementById('audio-source');
    audioSource.src = playlist[currentTrackIndex];
    audioPlayer.load();
    audioPlayer.play();
    audioPlayer.currentTime=progressBar.value
    cover()
    title()
        
}

// Mettre en pause la musique
function pauseMusic() {
    audioPlayer.pause();
}

// Passer à la musique suivante
function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
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
    
    
    if(currentTrackIndex==playlist.length-1){
        playlist=shuffle(playlist)
    }
}

function playPrevious(){
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
    
}



function cover(){
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
cover()

function title(){
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
title()

function duree(){
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
        modal_content.style.top = '-20%';
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



var In=true

// Initialiser les cases cochées par défaut au premier lancement
if (!localStorage.getItem('playlist_select')) {
    // Récupérer tous les noms des cases
    const defaultChecked = Array.from(document.querySelectorAll('#playlist input')).map(input => input.name);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('playlist_select', JSON.stringify(defaultChecked));
}

document.querySelectorAll('#playlist input').forEach(input =>{
    input.addEventListener('change',()=>{
        In=true
        for (let i=0;i<playlist_select.length;i++){
            if (playlist_select[i]==input.name)
                In=false
        }
        if (input.checked){
            if (In==true){
                if (input.name=='Arcane'){
                    playlist_select.push('Arcane')
                }
                if(input.name=='Snk'){
                    playlist_select.push('Snk')
                }
                if(input.name=='Chill'){
                    playlist_select.push('Chill')
                }
            }
        }else{
            playlist_select=playlist_select.filter(item => item !==input.name)
        }
        var taille_playlist=playlist.length
        playlist=[]
        for (let i=0;i<playlist_select.length;i++){
            if (playlist_select[i]=='Arcane'){
                playlist.push("./musique/arcane/Arcane (League of Legends) - I Can't Hear It Now - Solo Piano [+ Sheet Music] [8YFFXHfKP1o].mp3",
                    "./musique/arcane/Stromae, Pomme - Ma Meilleure Ennemie (from Arcane Season 2) - Piano Cover ⧸ Version [0Z7jXlBV_nU].mp3",
                    "./musique/arcane/OST Arcane (League of Legends) - Isha's Song by Eason Chan (Piano Cover ⧸ Version) [Us1IwcpRE1Y].mp3",
                    "./musique/arcane/ARCANE： What Could Have Been ｜ EPIC FEMALE COVER (feat. Aloma Steele) [Vva-uRgATZ0].mp3"
                )
            }
            if(playlist_select[i]=='Snk'){
                playlist.push("./musique/snk/attack on titan lofi ~ akuma no ko (aot season 4 part 2 ending) [IOZd-HarjZw].mp3",
                    "./musique/snk/Attack On Titan OST - Call of Silence (Ymir's Theme) [buZcLljh9eI].mp3",
                    "./musique/snk/red swan - attack on titan opening ｜ but it's lofi hip hop [AU-JN4bWI44].mp3",
                    "./musique/snk/進撃pf-medley20130629巨人 [IPWiiR5MVv4].mp3"
                )
            }
            if(playlist_select[i]=='Chill'){
                playlist.push("./musique/chill/C418  - Sweden - Minecraft Volume Alpha [aBkTkxKDduc].mp3",
                    "./musique/chill/Dinner In Paris [cfCKtt7OwdI].mp3",
                    "./musique/chill/Lofitopía - Day Dream [Ft2wWaP8avI].mp3",
                    "./musique/chill/purpose_not_found.mp3 [sinlicB1WyU].mp3"
                )
            }
        }

        localStorage.setItem('playlist_select', JSON.stringify(playlist_select));
        playlist=shuffle(playlist)
        if (taille_playlist>playlist.length && audioPlayer.paused){
            currentTrackIndex=currentTrackIndex
            playMusic()
            setTimeout(() => {
            }, 500);
            pauseMusic()
        }else if (taille_playlist>playlist.length){
            currentTrackIndex=currentTrackIndex
            playMusic()
        }
        
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


var extrait=document.getElementById('extrait')


var savedBackground = localStorage.getItem('backgroundImage');
window.onload = function() {
    var savedBackground = localStorage.getItem('backgroundImage');
    var extraitSaved=localStorage.getItem('extraitImage')
    if (savedBackground) {
        document.body.style.backgroundImage = savedBackground;
    }
    if(extraitSaved){
        extrait.src=extraitSaved

    }
    colori()
};
const fond_select=document.getElementById('fond-select')
let image=null
let ext=null
fond_select.addEventListener('change',(event)=>{
    if(event.target.value=='Train in tokyo'){
        image='url(./images/fond1.gif)'
        ext='../images/fond1.gif'
    }else if(event.target.value=='Cyberpunk'){
        image='url(./images/cyberpunk.gif)'
        ext='./images/cyberpunk.gif'
    }else if(event.target.value=="Train with nature"){
        image='url(./images/natureWithTrain.gif)'
        ext='../images/natureWithTrain.gif'
    }else if(event.target.value=='Chateau ambulant'){
        image='url(./images/chateauAmbulant.gif)'
        ext='../images/chateauAmbulant.gif'
    }else if(event.target.value=='Mont fuji'){
        image='url(./images/Fuji.gif)'
        ext='../images/Fuji.gif'
    }else if(event.target.value=='Star Wars'){
        image='url(./images/starWars.gif)'
        ext='../images/starWars.gif'
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
    document.body.style.backgroundImage =image
    extrait.src=ext
    localStorage.setItem('backgroundImage', image);
    localStorage.setItem('extraitImage', ext);
    savedBackground=image
    colori()

})

function colori(){
    if (savedBackground=='url(./images/cyberpunk.gif)'||savedBackground=='url(./images/natureWithTrain.gif)'||savedBackground=='url(./images/chateauAmbulant.gif)'
        ||savedBackground=='url(./images/Fuji.gif)'||savedBackground=='url(./images/cofeeShop.gif)'
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
timerPomodoro.value=(Number(localStorage.getItem('timerPomodoro'))+1)/60 || [];
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
timerShort.value=(Number(localStorage.getItem('timerShort'))+1)/60 || [];
timerShort.addEventListener('change',(event)=>{
    distanceShort=(timerShort.value*60)-1
    minutes = Math.floor((distance+1) /60);
    seconds = Math.floor((distance+1)-minutes*60);
    localStorage.setItem('timerShort', distance);
    if (chronos=='chrono5'){
        actChrono()
    }

})

var timerLong=document.getElementById("numberInputLong")
timerLong.value=(Number(localStorage.getItem('timerLong'))+1)/60|| [];
timerLong.addEventListener('change',(event)=>{
    distanceLong=(timerLong.value*60)-1
    minutes = Math.floor((distance+1) /60);
    seconds = Math.floor((distance+1)-minutes*60);
    localStorage.setItem('timerLong', distance);
    if (chronos=='chrono10'){
        actChrono()
    }

})

