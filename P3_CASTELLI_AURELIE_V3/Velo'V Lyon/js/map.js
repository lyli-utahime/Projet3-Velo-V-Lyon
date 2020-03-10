// creation de la class Map
class Map {
    constructor(id_map) {
        this.api_url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=501bfe4002748d3852b0e51542e543301697a623';
        this.map = L.map(id_map)
        this.lat = 45.760276;
        this.lng = 4.8335709;
        this.zoom = 13;

        //methodes
        this.initialize();
        this.addStations();
    }

	// méthode pour initialiser la carte
    initialize() {
        this.centerView(); //gps et centre

        document.getElementById('map-reset').addEventListener('click', () => {
        this.centerView();
        });

        let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // sources
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20,
        });

        this.map.addLayer(osmLayer);
    }

    //méthode pour centrer la carte
    centerView() {
        this.map.setView([this.lat, this.lng], this.zoom);
    }

	//methode pour socker les informations de chaque station et afficher une pop-up au click avec le nom et le numéro de la station
    addStations() {
        $.getJSON(this.api_url, (data) => {
            $.each(data, (i) => {
                let station = data[i];
				// on stocke dans station toutes les infos et fonction d'appel au click
                L.marker([station.position.lat, station.position.lng], {"station": station})
                .on('click', this.infoStation)
                .addTo(this.map)
                .bindPopup(station.name);
            });
        });
    }

	infoStation(event) {
        // Récupération de la station concerné
        let stationData = event.target.options.station;

        // Affichage du rendu
        document.getElementById("station-info").style.display = "block";// Apparition du bloc contenant les infos de la station sélectionnée
        document.getElementById("station-name").innerText = stationData.name;
        document.getElementById("station-adresse").innerText = stationData.address;
        document.getElementById("station-bike_stands").innerText = stationData.bike_stands;
        document.getElementById("station-available_bikes").innerText = stationData.available_bikes;
        if (stationData.available_bikes >= 1) {
            document.getElementById("reservation").style.visibility = "visible";
            document.getElementById("signature").style.visibility = "visible";
        } else {
            document.getElementById("reservation").style.visibility = "hidden";
            document.getElementById("signature").style.visibility = "hidden";
        }

        // copie des informations de la station dans le formulaire de réservation
        const bookForm = document.getElementById('reservation');
        bookForm.stationNumber.value = stationData.number;
        bookForm.stationName.value = stationData.name;
    }
}
