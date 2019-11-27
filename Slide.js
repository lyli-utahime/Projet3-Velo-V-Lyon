class Slide{
     constructor(id_slider, imgs){
        this.id_slider = id_slider;
        this.imgs = imgs;

        this.playPause();
        this.startSlideshow();
        this.start();
        this.nextSlide();
        this.next();
        this.previous();

     }
     
    playPause() {
        let slideIndex = 0;
        let paused = true;
        document.getElementById("playPause").innerHTML =
        "<a onclick='start()'><i class='material-icons'>play_arrow</i></a>";
    }

    startSlideshow() {
        let slideIndex = 0;
        let slides;
        let i;
        let paused = false;
        document.getElementById("playPause").innerHTML =
          "<a onclick='pause()'><i class='material-icons'>pause</i></a>";
        paused = false;
        /* l'index du slider */
        document.getElementById("index").innerHTML =
          slideIndex + 1 + "/" + slides.length;
        /* nextslide() pour slider auto */
        setInterval(function() {
          /* si pause activé */
          if (paused == true) {
            return;
          }
        nextSlide();
        }, 4000); /* intervalle 4 sec */
      }

    /* relancer le slider en appuyant sur pause */
    start() {
        paused = false;
        document.getElementById("playPause").innerHTML =
        "<a onclick='pause()'><i class='material-icons'>pause</i></a>";
    }

    /* defilement image suivante */
    nextSlide() {
        let slideIndex = 0;
        let paused = false;
        let i;
        /* cacher les autres images */
        for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        }
        slideIndex++;
        /* Repartir à zéro en boucle quand le défilement est fini*/
        if (slideIndex > slides.length) {
        slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        document.getElementById("index").innerHTML = slideIndex + "/" + slides.length;
    }

    next() {
        let slideIndex = 0;
        let paused = false;
        let i;
        pause();
        nextSlide();
    }

    previous() {
        let slideIndex = 0;
        let paused = false;
        let i;
        pause();
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slideIndex--;
        if (slideIndex <= 0) {
          slideIndex = slides.length;
        }
        slides[slideIndex - 1].style.display = "block";
        document.getElementById("index").innerHTML = slideIndex + "/" + slides.length;
    }
}



