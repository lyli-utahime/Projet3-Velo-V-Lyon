class Slideshow {
    constructor(){
      this.idSlider = document.getElementById('slider');
      this.idSlides = document.getElementsByClassName('slides');
      this.idPlayPause = document.getElementById('playPause');
      this.idPrevious = document.getElementById('previous');
      this.idNext = document.getElementById('next');

      // Initialisation des evenements
      this.idPlayPause.onclick = this.togglePlayPause.bind(this);
      this.idPrevious.onclick = this.previous.bind(this);
      this.idNext.onclick = this.next.bind(this);

      this.slideIndex = 1;
      this.paused = false;

      this.start();
    }

    // Bouton Play/Pause
    togglePlayPause() {
      if (this.paused) {
        this.paused = false;
        this.idPlayPause.firstChild.innerHTML = 'pause';
      } else {
        this.paused = true;
        this.idPlayPause.firstChild.innerHTML = 'play_arrow';
      }
    }

    // Automatisation du diaporama
    start() {
      setInterval(() => {  //  si pause activé
        if (this.paused) {
          return;
        }

        this.nextSlide();
      }, 5000); // intervalle 5 sec
    }

    // defilement des images
    nextSlide() {
      // cacher les autres images
      Object.values(this.idSlides).forEach(slide => {
        slide.style.display = 'none';
      });

      this.slideIndex++;

      // Repartir à zéro en boucle quand le défilement est fini
      if (this.slideIndex > this.idSlides.length) {
        this.slideIndex = 1;
      }

      this.idSlides[this.slideIndex - 1].style.display = 'block';
    }

    // Montrer l'image suivante
    next() {
      // force pause
      if (!this.paused) this.togglePlayPause();

      this.nextSlide();
    }

    // Montrer l'image précédente
    previous() {
      // force pause
      if (!this.paused) this.togglePlayPause();

      // Cacher les autres images
      Object.values(this.idSlides).forEach(slide => {
        slide.style.display = 'none';
      });

      this.slideIndex--;
      if (this.slideIndex <= 0) {
        this.slideIndex = this.idSlides.length;
      }

      this.idSlides[this.slideIndex - 1].style.display = 'block';
      this.refreshIndex();
    }
}
