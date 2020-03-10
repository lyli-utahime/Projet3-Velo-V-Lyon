// Lancement du diaporama
new Slideshow();

//Creer new map
let map = new Map('map');

// Au clic sur "reserver", lancement de la foncion reservationStart() qui appelle la classe Reservation et la méthode reservation.validate()
function reservationStart() {
    let reservation = new Reservation();
    reservation.validate(false);
}

// Si raffraichissement page et sessionstorage enregistrer donc reservation en cours, compteur affiché (si le DOM n'est pas chargé le countdown ne peut être réaffiché)
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('dateEnd')) {
        new Reservation(true);
    }

    new Canvas;
});
