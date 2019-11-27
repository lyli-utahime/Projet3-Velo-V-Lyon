class Reservation {
    constructor(id_form) {
        this.id_form = id_form;
        // 2- Le nom et prénom utilisent l’API LocalStorage
        // 3- Les informations de réservations utilisent l’API SessionStorage
        // 4- afficher le canvas (autre classe)
        // 5- compteur avant d'annuler la reservation
 
        //methodes
        this.storageSession();
        this.counterValidation();
    }

    storageSession() {
        sessionStorage.setItem("firstname", id_lastname);
        sessionStorage.setItem("lastname", id_lastname);
    };

    counterValidation() {
    // methode pour le compteur
    window.setTimeout("alert(votre reservation est  annulée !);",5000); // 5 secondes pour le test modifier en milliseconde 2000000 pour 20 minutes
    // compte à rebours qui s'annule dans 20 minutes ou à la fermeture de la page vu qu'il n'y a aucun paramètre
    };

}

// Creation du formulaire
       // let form_reservation = document.querySelector("#form_book");
       // let form = document.createElement('#form_book');
        //form_reservation.appendChild(#form_book);

       // Traitement du formulaire
        //this.id_form.addEventListener("submit", function(e){// L'argument « e » va récupérer une référence vers l'objet « Event » 
        //    bouton_book.style.display = "block";
        //    form_book.style.display = "none";
      // });