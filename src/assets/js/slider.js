const slides = document.querySelectorAll('.slide__box');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const dots = document.querySelectorAll('.dot');
const progressBar = document.getElementById('progress-bar');

let index = 0;

const activeSlide = (n) => {
	for (slide of slides) {
		slide.classList.remove('active');
	}
	slides[n].classList.add('active');
	clearInterval(runSlider);
	progressBar.classList.remove('progress-bar');
	setTimeout(resetAnimation, 1)
	runSlider = setInterval(nextSLide, 10000);
}

const activeDot = (n) => {
	for (dot of dots) {
		dot.classList.remove('active');
	}
	dots[n].classList.add('active');
	clearInterval(runSlider);
	progressBar.classList.remove('progress-bar');
	setTimeout(resetAnimation, 1)
	runSlider = setInterval(nextSLide, 10000);
}

const active = (i) => {
	activeSlide(i);
	activeDot(i);
}

const nextSLide = () => {
	if (index == slides.length - 1) {
		index = 0;
		active(index);
	} else {
		index++;
		active(index);
	}
}

const prevSlide = () => {
	if (index == 0) {
		index = slides.length - 1;
		active(index);
	} else {
		index--;
		active(index);
	}
}

dots.forEach((dot, ind) => {
	dot.addEventListener('click', () => {
		index = ind;
		active(index);
	});
})


btnNext.addEventListener('click', nextSLide);
btnPrev.addEventListener('click', prevSlide);

let runSlider = setInterval(nextSLide, 10000);
const resetAnimation = () => {
	progressBar.classList.add('progress-bar');
}