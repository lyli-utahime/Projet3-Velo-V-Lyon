class Canvas {
    constructor() {
        this.canvas = document.getElementById("signature");
        this.canvas2 = document.getElementById("signatureCheck");
        this.ctx = this.canvas.getContext('2d');
        this.painting = false;
        this.finger = false;
        this.canvas.width = 300;
        this.canvas.height = 200;
        this.canvas2.width = 300;
        this.canvas2.height = 200;
        this.clearButton = document.getElementById("clear");
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = '#000000';
        this.startX = 0;
        this.startY = 0;

        this.signature();
        this.clear();

        //Effacer
        this.clearButton.addEventListener("click", () => {
        this.clear()
        });
    }

    startPosition() {
        this.painting = true;
        this.draw(e);
    }

    finishedPosition() {
        this.painting = false;
        this.ctx.beginPath();
    }

    draw(e) {
        if(!this.painting) return;

        let mouseX;
        let mouseY;

        // S'il n'y a pas de doigt pour faire le dessin alors c'est la souris qui fcontionne
        if (this.finger === false) {
            mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
            mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
        } else if (e.touches.length == 1) {
            mouseX = e.touches[0].pageX - this.canvas.getBoundingClientRect().left;
            mouseY = e.touches[0].pageY - this.canvas.getBoundingClientRect().top - (e.touches[0].pageY - e.touches[0].clientY);
        }

        // Tracé d'un premier point à un second, puis du second au troisième etc... même au levé de crayon... jusqu'à que l'utilisateur arrête et valide sur le bouton "reserver"
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.stroke();
        this.ctx.closePath();

        this.startX = mouseX;
        this.startY = mouseY;
    }

    signature() {
        // Sinature sur pc
        // Souris posé sur le canvas
        this.canvas.addEventListener('mousedown', (e) => {
            this.startX = e.clientX - this.canvas.getBoundingClientRect().left; // getBoudingClientRect pour ne pas dépasser du cadre même s'il bouge
            this.startY = e.clientY - this.canvas.getBoundingClientRect().top;
            this.painting = true;
        }, false);
        // Souris levé du canvas
        this.canvas.addEventListener('mouseup', () => {
            this.ctx.closePath();
            this.painting = false;
        }, false);
        // Souris en mouvement
        this.canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            this.draw(e);
        }, false);

        // Pour le tactile (idem que pour pc)
        this.canvas.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].pageX - this.canvas.getBoundingClientRect().left;
            this.startY = e.touches[0].pageY - this.canvas.getBoundingClientRect().top - (e.touches[0].pageY - e.touches[0].clientY);
            this.painting = true;
            this.finger = true;
        }, false);
        this.canvas.addEventListener('touchend', () => {
            this.ctx.closePath();
            this.painting = false;
            this.finger = false;
        }, false);
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.finger = true;
            this.draw(e);
        }, false);

    }

    // vider le dessin du canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
