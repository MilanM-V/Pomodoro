async function SaveUser(mail,mdp) {
    const response = await fetch('http://127.0.0.1:8000/SaveUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({mail:mail,mdp:mdp})
    });
    
    
    const data=await response.json();
    localStorage.setItem("access_token", data.access_token);
    document.cookie = `refresh_token=${data.refresh_token}; Secure; HttpOnly; SameSite=Strict`;
    window.location.href = "./music.html";

}

const token = localStorage.getItem("access_token");

if (token && isTokenExpired(token)) {
    refreshAccessToken();
}

let loginFormCreate = document.getElementById("my-form-create")


loginFormCreate.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let password_comfirmation = document.getElementById("password_comfirmation");
    let email_autorisée = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    let password_autoriséee = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&_#])[A-Za-z\\d@$!%*?&_#/+-]{6,}$")
    var label = document.querySelector('.formulaire');

    // Supprimer le message d'erreur s'il existe déjà
    let existingErrors = document.querySelectorAll('#message_erreur');
    existingErrors.forEach(error => error.remove());

    // Supprimer le message d'erreur mdp s'il existe déjà
    let existingErrors_mdp = document.querySelectorAll('#message_erreur_mdp');
    existingErrors_mdp.forEach(error => error.remove());

    // Vérifier les conditions avant de soumettre le formulaire
    if (password_autoriséee.test(password.value) && password.value === password_comfirmation.value && email_autorisée.test(email.value)) {
        SaveUser(email.value,password.value)
        
    }else {
        // Vérifier si le mdp correspond aux conditions
        if (!password_autoriséee.test(password.value)) {
            message_error_mdp = document.createElement('span');
            message_error_mdp.id = "message_erreur"
            var mdp = document.querySelector(".mdp")
            mdp.append(message_error_mdp);
            message_error_mdp.innerText = "Le mot de passe doit comporter un minimum de 6 caracteres et doit contenir au moins 1 caractere special et 1 chiffre."
        }
        // Vérifier si l'email correspond aux conditions
        if (!email_autorisée.test(email.value)) {
            message_error = document.createElement('span');
            message_error.id = "message_erreur";
            label.append(message_error);
            message_error.innerText = "l'email n'est pas valide";
        }
        // Vérifier si le mdp et la confirmation du mdp sont identiques
        if (password.value !== password_comfirmation.value) {
            message_error = document.createElement('span');
            message_error.id = "message_erreur";
            label.append(message_error);
            message_error.innerText = "le mots de passe ne correspond pas au precedent";
        }
    }
});