async function ConnectUser(mail,mdp) {
  const token = localStorage.getItem("access_token");
  const response =  await fetch('https://pomodoro-api.up.railway.app/connect/', {
      method: 'POST',
      headers: { 
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json' },
      body: JSON.stringify({mail:mail,mdp:mdp})
  });
  
  const data= await response.json();
  if (data){
    localStorage.setItem("access_token", data.access_token);
    setCookie("refresh-token", data.refresh_token);
    window.location.href = "../index.html";

  }else{
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    alert("La connection n'as pas réussi veuiller réessayer");
  }
}


let loginFormCompte = document.getElementById("my-form-compte")

loginFormCompte.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  ConnectUser(email.value,password.value)

});

document.getElementById("my-form__button").addEventListener('keydown',(event)=>{
  if (event.key === 'Enter') {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    ConnectUser(email.value,password.value)
}
})


function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}




