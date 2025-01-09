async function ConnectUser(mail,mdp) {
  const response = await fetch('http://127.0.0.1:8000/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({mail:mail,mdp:mdp})
  });
  
  const data=await response.json();
  if (data){
    localStorage.setItem("access_token", data.access_token);
    document.cookie = `refresh_token=${data.refresh_token}; Secure; HttpOnly; SameSite=Strict`;
    window.location.href = "./music.html";
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





