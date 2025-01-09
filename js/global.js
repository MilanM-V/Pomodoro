window.refreshAccessToken= async function() {
    try {
        const response = await fetch("http://localhost:8000/refresh_token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            window.location.href = "./compte.html";
            const errorData = await response.json();
            throw new Error(errorData.detail || "Unable to refresh token");
            
        }

        const data = await response.json();

        // Stocker les nouveaux tokens
        localStorage.setItem("access_token", data.access_token);

        console.log("Tokens mis à jour avec succès !");
        return data.access_token;
    } catch (error) {
        console.error("Erreur lors de l'actualisation du token :", error.message);
    }
}


window.isTokenExpired=function(token) {
    const base64Url = token.split('.')[1]; // La 2ème partie du token est le payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = JSON.parse(atob(base64));
    
    const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    return jsonPayload.exp < currentTime; // Vérifie si le token est expiré
}

