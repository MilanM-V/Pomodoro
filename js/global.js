window.refreshAccessToken= async function() {
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch("https://pomodoro-api.up.railway.app/refresh_token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",},
                body: JSON.stringify({refresh_token:getCookie('refresh-token')})
        });

        if (!response.ok) {
            window.location.href = "./html/compte.html";
            const errorData = await response.json();
            throw new Error(errorData.detail || "Unable to refresh token");
            
        }

        const data = await response.json();

        // Stocker les nouveaux tokens
        localStorage.setItem("access_token", data.access_token);
        setCookie("refresh-token", data.refresh_token);

        user_id();
        return data.access_token;
    } catch (error) {
    }
}


window.isTokenExpired=function(token) {
    const base64Url = token.split('.')[1]; // La 2ème partie du token est le payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = JSON.parse(atob(base64));
    
    const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    return jsonPayload.exp < currentTime; // Vérifie si le token est expiré
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, val] = cookie.split("=");
        if (key === name) return val;
    }
    return null;
}

window.user_id=function(){
    const token=localStorage.getItem("access_token")
    fetch("https://pomodoro-api.up.railway.app/get_user_id/", {
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

function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
  }
  