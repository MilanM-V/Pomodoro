
const token = localStorage.getItem("access_token");
if (token && isTokenExpired(token)) {
    refreshAccessToken();
    user_id();

}else if(token && !isTokenExpired(token)){
    user_id();
    

}else if(!token){
    let message_no_compte = document.createElement('span');
    message_no_compte.id = "message_no_compte"
    let collect = document.getElementById("tab5")
    collect.append(message_no_compte);
    message_no_compte.innerHTML = "Vous devez-vous connecter pour pouvoir utiliser cette fonctionnalité <br><br><br>- Ajouter vos propre musique depuis youtube et creer vos playlist"
    let btnCompte=document.createElement('button');
    btnCompte.innerText='Se connecter';
    btnCompte.className='Back';
    btnCompte.onclick = function() {
        window.location.href = './compte.html';
    };
    collect.append(btnCompte)
    let message_compte = document.getElementById("connect");
    if (message_compte) {
        message_compte.remove();
    }
}


// Obtenir les éléments
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal_content=document.getElementById('modal-content');

function start () {
    modal.style.display = "block"; 
    modal_content.style.display="block"
    setTimeout(function() {
        if (window.matchMedia("(max-width: 600px)").matches){
            modal_content.style.top = '2%';
        }else{
            modal_content.style.top = '-20%';
        }
        
        modal.style.opacity = 1;
    }, 0);

}

start()

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






const API_KEY = 'AIzaSyCFrfNK2zvw0YFTyioiGELElw8gwI4OIFc';
const searchInput = document.getElementById('youtubeSearch');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const preview = document.getElementById('preview');
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

let id=0
let videoId=""
let userId=""



function user_id(){
    fetch("http://127.0.0.1:8000/get_user_id/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.user_id) {
                userId=data.user_id
                userId=String(userId)
                Mymusique();
            }
        })
}



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

const loadingSpinner = document.getElementById("loader");
const btnDl=document.getElementById('downloadButton')

async function downloadVideo() {
    let videoId5=videoId
    let userId5=userId
    loadingSpinner.style.display = "block";
    btnDl.style.left="-6vw";
    if (videoId5!=="" && userId5!==""){
        const response = await fetch('http://127.0.0.1:8000/download_youtube_video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({url:`https://www.youtube.com/watch?v=${videoId5}`,user_id:userId5})
        });
        loadingSpinner.style.display = "none";
        btnDl.style.left="-2vw";
        if (response.ok) {
            alert('Téléchargement réussi');
        }else if(response.status==410){
            alert("Erreur la vidéo que vous essayer de télécharger n'est pas une musique");
        }else {
        alert('Erreur lors du téléchargement.');
        }
        
        
    }
}

const tabsMusique = document.querySelectorAll('.tabMusique');
const tabMusique_content = document.querySelectorAll('.tab-content-Musique');
tabsMusique.forEach(tabMusique => {
    tabMusique.addEventListener('click', () => {
        
        tabsMusique.forEach(t => t.classList.remove('active'));
        tabMusique_content.forEach(content => content.classList.remove('active'));

        tabMusique.classList.add('active');
        document.getElementById(tabMusique.dataset.tab).classList.add('active');
    });
});


async function Mymusique(){
    let userId10=String(userId)
    console.log(userId10)
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


            for(let i=0;i<list_music.length;i++){
                
                const resultMusic = document.createElement('div');
                resultMusic.className = 'result-music';

                const text = document.createElement('label');
                text.textContent = list_music[i];

                const input=document.createElement("input");
                input.type="checkbox";
                input.id=list_music[i];
                input.className="inputMusicPerso"

                resultMusic.appendChild(input)
                resultMusic.appendChild(text)
                tabMusique1.appendChild(resultMusic);  
                
            }
            addMusicPerso()
        })
}

function addMusicPerso(){
    const inputMusicPerso=document.querySelectorAll('.inputMusicPerso')
    inputMusicPerso.forEach(music=>{
        music.addEventListener('change',async ()=>{
            if(music.checked){
                console.log(music.id)
                  const response=await fetch("http://127.0.0.1:8000/get_play_music/", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name_music:music.id}),
                }).then(response => response.json())
                    .then(data => {
                        console.log(data)
                            
                        })
                console.log(response)
            }
            
              
        })
    })
}


    