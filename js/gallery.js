const track = document.querySelector('.carousel_track'); // ritorna il primo Element all'interno del documento che corrisponde al selettore specificato o al gruppo di selettori
const slides = Array.from(track.children);//crea array per salvare ogni slide
const nextButton = document.querySelector('.carousel_button-right');
const prevButton = document.querySelector('.carousel_button-left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);//.children Restituisce una collezione di figli

const slideWidth = slides[0].getBoundingClientRect().width;//This method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.

//console.log(slideWidth);

//metti le slide una vicino all'altra
/*slides[0].style.left = slideWidth * 0 + 'px';
slides[1].style.left = slideWidth * 1 + 'px';//slides[1].style.left = '100px';
slides[2].style.left = slideWidth * 2 + 'px';*/

//per mettere la slide l'una alla sinistra dell'altra nel carousel
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';//.left returns the left position of a element
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => { //tra le parentesi gli argomenti
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide'); //si usa classlist non si usa il punto
    targetSlide.classList.add('current-slide');
}

//per annerire/selezionare il punto relativo alla slide
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide'); 
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {//Arrow function
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if(targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else{
        nextButton.classList.remove('is-hidden');
        prevButton.classList.remove('is-hidden');
    }
}

//quando clicco destra, spostati alla slide destra
nextButton.addEventListener('click', e => {//quando clicco nextButton
    //siamo alla slide
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;//nextElementSibling returns the element immediately following the specified element, in the same tree level.
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    nextIndex = slides.findIndex(slide => slide === nextSlide);//method returns the index of the first element in an array that pass a test 

    //aggiorniamo slide, puntino in cui siamo e se mostrare le frecce
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);//per aggiornare i punti selezionati quando si usano le frecce
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

//quando clicco sinistra, spostati alla slide sinistra
prevButton.addEventListener('click', e => {//quando clicco prevButton
    //siamo alla slide
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);//per aggiornare i punti selezionati quando si usano le frecce
    hideShowArrows(slides, prevButton, nextButton, prevIndex);

});

//quando clicco i pallini, muoviti alla slide relativa
dotsNav.addEventListener('click', e => {
    //su quale puntino è stato cliccato
    const targetDot = e.target.closest('button');

    if(!targetDot) return;
    
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex];//Si posiziona alla slide all'indice targetIndex 
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
});
