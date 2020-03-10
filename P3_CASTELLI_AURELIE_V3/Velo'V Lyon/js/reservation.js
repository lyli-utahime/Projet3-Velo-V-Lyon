class Reservation {
    constructor(refresh = false) { // Si la page n'est pas rafraichie
        if (!refresh) { //Si la page est raffraichie pour ne pas perdre la reservation en cours
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const stationName = document.getElementById('reservation').stationName.value;
            const stationNumber = document.getElementById('reservation').stationNumber.value;

            // La date en numerique
            const currentDate = Date.now(); // date mesurée en millisecondes depuis minuit le 01 janvier 1970 (date initale des os). 1 journée = 86 400 000 millisecondes
            const duration = 1201000; //  20 minutes en millisecondes environ 1200000 mais ce n'est pas précis il manque 2 secondes que je rajoute au 4e chiffre en partir de droite
            const dateEnd = currentDate + duration;

            // Methodes
            this.sessionRecord({
                firstname,
                lastname,
                stationName,
                stationNumber,
                dateEnd
            });
            this.stop();
        }

        // Start interval
        const interval = setInterval(this.countdown, 1000);
        sessionStorage.setItem('interval', interval);
    }

    // Ecrasement des informations et du compteur  pour effectuer une nouvelle reservation
    sessionRecord(session) {
        localStorage.setItem('firstname', session.firstname);
        localStorage.setItem('lastname', session.lastname);
        sessionStorage.setItem('stationName', session.stationName);
        sessionStorage.setItem('stationNumber', session.stationNumber);
        sessionStorage.setItem('dateEnd', session.dateEnd);
    };

    // Compteur
    countdown() {
        const dateEnd = sessionStorage.getItem('dateEnd');
        const firstname = localStorage.getItem('firstname');
        const lastname = localStorage.getItem('lastname');
        const stationName = sessionStorage.getItem('stationName');
        // Différence en millisecondes
        const currentDate = Date.now();
        const totalSeconds = (dateEnd - currentDate) / 1000;

        // Réservation terminé
        if (totalSeconds <= 0) {
            const interval = sessionStorage.getItem('interval');
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = 'Votre réservation a expiré.';
        // Réservation en cours
        } else {
        // Phrase avant le compte à rebours
            const prefix = `${firstname} ${lastname}<br>Votre vélo est reservé à la station : ${stationName}.<br><br>Si vous fermez cette page, votre réservation sera perdue.<br>Si vous rafraichissez cette page votre réservation, est toujours valide.<br><br>Votre réservation expire dans `;
        // On ne garde que la valeur absolue
            const totalSecondsAbs = Math.abs(totalSeconds);
        //math.floor pour ne donner que des entiers
            const jours = Math.floor(totalSecondsAbs / (60 * 60 * 24)); //le nombre étant en seconde, pour avoir la différence
            const heures = Math.floor((totalSecondsAbs - (jours * 60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((totalSecondsAbs - ((jours * 60 * 60 * 24 + heures * 60 * 60))) / 60);
            const secondes = Math.floor(totalSecondsAbs - ((jours * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));
            document.getElementById('countdown').innerHTML = `${prefix} ${minutes + ' minutes et' || ''} ${secondes} secondes.`;
        }
    };

    // Lors d'une nouvelle réservation et qu'il y a déjà une en cours, le bouton validé annule le compteur pour en redémarrer un nouveau
    stop() {
        const interval = sessionStorage.getItem('interval');
        if (interval) {
            // S'il y a un interval
            clearInterval(interval);
        }
    };

    validate() {
        const valueValid = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const interval = sessionStorage.getItem('interval');
        // Si les champs ne sont pas rempli ou de ofrmat incorect le formulaire n'est pas validé
        if (!valueValid.test(firstname)) {
            alert ('Veuillez entrer votre prénom!');
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = 'Veuillez vérifier les champs du forumlaire.';
            return false;
        } 
        if (!valueValid.test(lastname)){
            alert ('Veuillez entrer votre nom!');
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = 'Veuillez vérifier les champs du forumlaire.';
            return false;
        }

        //Si le canvas "signature" est le même que "signatureCheck" c'est que ce n'est pas signé ==> le formulaire n'est pas validé
        if (document.getElementById('signature').toDataURL() == document.getElementById('signatureCheck').toDataURL()) {
            alert ('Veuillez apposer votre signature!');
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = 'Veuillez vérifier les champs du forumlaire.';
            return false;
        }

    }
}
