export const runSlide = () => {
    
const slides = document.querySelectorAll('.slide');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const dots = document.querySelectorAll('.dot');

let index = 0;



const activeSlide = (n) => {
	for (slide of slides) {
		slide.classList.remove('active');
	}
	slides[n].classList.add('active');
}

const activeDot = (n) => {
	for (dot of dots) {
		dot.classList.remove('active');
	}
	dots[n].classList.add('active');
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

}