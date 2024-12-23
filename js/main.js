
var x=null;
var chronos='chrono25'
var distance = 1499;
var run=false

function chrono25(){

chronos='chrono25'

//update chrono
if (x!==null){
    clearInterval(x)
}
x = setInterval(function() {


  //calcule du temps
  let minutes = Math.floor(distance /60);
  let seconds = Math.floor(distance-minutes*60);
    
  //modidier le text
  if(minutes<10 && seconds>9){
    document.getElementById("chrono").innerHTML ='0'+minutes + ":" + seconds;
  }else if(minutes<10 && seconds<10){
    document.getElementById("chrono").innerHTML ='0'+minutes + ":" + "0"+seconds;
  }else if(minutes>9 && seconds<10){
    document.getElementById("chrono").innerHTML =minutes + ":" + "0"+seconds;
  }else{
    document.getElementById("chrono").innerHTML =minutes + ":" + seconds;
  }
  
  distance-=1;
  //stop repetiton
  if (distance == 0) {
    distance=299
    clearInterval(x);
    document.getElementById("chrono").innerHTML =25 + ":" + '00';
    chrono5()
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
  let minutes = Math.floor(distance /60);
  let seconds = Math.floor(distance-minutes*60);
    
  //modidier le text
  if(minutes<10 && seconds>9){
    document.getElementById("chrono").innerHTML ='0'+minutes + ":" + seconds;
  }else if(minutes<10 && seconds<10){
    document.getElementById("chrono").innerHTML ='0'+minutes + ":" + "0"+seconds;
  }else if(minutes>9 && seconds<10){
    document.getElementById("chrono").innerHTML =minutes + ":" + "0"+seconds;
  }else{
    document.getElementById("chrono").innerHTML =minutes + ":" + seconds;
  }
  distance-=1;
  //stop repetiton
  if (minutes ==0) {
    clearInterval(x);
    distance=1499
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
        }else{
            chrono5()
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
            distance=1499
            document.getElementById('chrono').innerHTML ='25' + ":" + '00';
            chrono25()
        }else{
            distance=299
            document.getElementById('chrono').innerHTML ='05' + ":" + '00';
            chrono5()
        }
        run=false

    }else{
        clearInterval(x)
        if(chronos=='chrono25'){
            distance=1499
            document.getElementById('chrono').innerHTML ='25' + ":" + '00';
        }else{
            distance=299
            document.getElementById('chrono').innerHTML ='05' + ":" + '00';
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

const playlist = [
    "./musique/arcane/Arcane (League of Legends) - I Can't Hear It Now - Solo Piano [+ Sheet Music] [8YFFXHfKP1o].mp3",
    "./musique/arcane/Stromae, Pomme - Ma Meilleure Ennemie (from Arcane Season 2) - Piano Cover ⧸ Version [0Z7jXlBV_nU].mp3"
    
];
let currentTrackIndex = 0;

const audioPlayer = document.getElementById('music-player');

// Lecture de la musique
function playMusic() {
    audioPlayer.play();    
        
}

// Mettre en pause la musique
function pauseMusic() {
    audioPlayer.pause();
}

// Passer à la musique suivante
function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    const audioSource = document.getElementById('audio-source');
    audioSource.src = playlist[currentTrackIndex];
    audioPlayer.load();
    audioPlayer.play();
    cover()
    title()
}

function playPrevious(){
    if (currentTrackIndex==0){
        currentTrackIndex=playlist.length-1
    }else{
        currentTrackIndex=currentTrackIndex-1
    }
    const audioSource = document.getElementById('audio-source');
    audioSource.src = playlist[currentTrackIndex];
    audioPlayer.load();
    audioPlayer.play();
    cover()
    title()
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

var fond_div=document.getElementById('fond-parametre')
var musique_div=document.getElementById('musique-parametre')

function show_music(){
    musique_div.style.opacity=1
    fond_div.style.opacity=0
}

function show_fond(){
    
    fond_div.style.opacity=1
    musique_div.style.opacity=0
}

var In=true

// Récupérer les données de localStorage au chargement
var playlist_select = JSON.parse(localStorage.getItem('playlist_select')) || [];

// Appliquer l'état initial des cases à cocher
document.querySelectorAll('#playlist input').forEach(input => {
    if (playlist_select.includes(input.name)) {
        input.checked = true;
    }
});

document.querySelectorAll('#playlist input').forEach(input =>{
    input.addEventListener('change',()=>{
        In=true
        for (let i=0;i<playlist_select.length;i++){
            console.log(playlist_select[i]+":"+input.name)
            if (playlist_select[i]==input.name)
                In=false
        }
        if (input.checked){
            if (In==true){
                playlist_select.push(input.name)
            }
        }else{
            playlist_select=playlist_select.filter(item => item !==input.name)
        }
        localStorage.setItem('playlist_select', JSON.stringify(playlist_select));
        console.log(playlist_select)
    })
})
