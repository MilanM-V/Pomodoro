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



const token = localStorage.getItem("access_token");

if (token && isTokenExpired(token)) {
    refreshAccessToken();
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
    let message_compte = document.getElementById("messageCompte");
    if (message_compte) {
        message_compte.remove();
    }
}

    