function ajaxGet(url, callback) {
    let requeste = new XMLHttpRequest();
    requeste.open("GET", url);
    requeste.addEventListener("load", function () {
        if (requeste.status >= 200 && requeste.status < 400) {// Le serveur a réussi à traiter la requête
            // Appelle la fonction callback en lui passant la réponse de la requête
callback(requeste.responseText);
        } //else {
            // Affichage des informations sur l'échec du traitement de la requête
           // console.error(requeste.status + " " + requeste.statusText + " " + url);
        //}
    });
    requeste.addEventListener("error", function () {
        // La requête n'a pas réussi à atteindre le serveur
console.error("Erreur réseau avec l'URL " + url);
    });
    requeste.send(null);
}