import runSlide from './slider';

//Calculator
const costRange = document.getElementById('costRange');
const costInput = document.getElementById('cost');

costInput.value = costRange.value;

const inputChangeCost = () => {
    costInput.value = costRange.value
    inputChangeDeposit();
    inputChangeMonth();
    sumPay.textContent = monthRange.value * parseInt(monthPay.textContent) + +costInput.value + ' ₽';
}
const inputChangeCostRange = () => {
    if (costInput.value < +costRange.min) {
        costInput.value = +costRange.min;
        costRange.value = costInput.value;
    } else if (costInput.value > +costRange.max) {
        costInput.value = +costRange.max;
        costRange.value = costInput.value;
    }
    inputChangeDeposit();
    inputChangeMonth();
    sumPay.textContent = monthRange.value * parseInt(monthPay.textContent) + +costInput.value + ' ₽';
}
costInput.onkeydown = function(e) {
    return !(/^[А-Яа-яA-Za-z ]$/.test(e.key))
}

costRange.oninput = inputChangeCost;
costInput.oninput = () => { costRange.value = +costInput.value;}
costInput.onblur = inputChangeCostRange;

const depositInput = document.getElementById('deposit');
const depositRange = document.getElementById('depositRange');
const depositLabel = depositInput.nextElementSibling;

depositInput.onkeydown = function(e) {
    return !(/^[А-Яа-яA-Za-z ]$/.test(e.key))
}

depositLabel.textContent = depositRange.value + '%';
depositInput.value = costInput.value * depositRange.value / 100;

const inputChangeDeposit = () => {
    depositLabel.textContent = depositRange.value + '%';
    depositInput.value = costInput.value * depositRange.value / 100;
    inputChangeMonth();
}

const inputChangeDepositRange = () => {
    if (depositInput.value < costRange.value * depositRange.value / 100) {
        depositInput.value = costRange.value * depositRange.value / 100;
    } else if (depositInput.value > costRange.value * depositRange.max / 100) {
        depositInput.value = costRange.value * depositRange.max / 100;
    }
    inputChangeMonth();
}

depositRange.oninput = inputChangeDeposit;
depositInput.oninput = () => { 
    depositRange.value = depositInput.value * 100 / costInput.value;
    depositLabel.textContent = depositRange.value + '%';
}
depositInput.onblur = inputChangeDepositRange;

const monthInput = document.getElementById('month');
const monthRange = document.getElementById('monthRange');
const sumPay = document.getElementById('sumPay');
const monthPay = document.getElementById('monthPay');

monthRange.value = monthInput.value;

monthInput.onkeydown = function(e) {
    return !(/^[А-Яа-яA-Za-z ]$/.test(e.key))
}

monthPay.textContent = Math.round((costInput.value - depositInput.value) / monthRange.value) + ' ₽';
sumPay.textContent = monthRange.value * parseInt(monthPay.textContent) + +costInput.value + ' ₽';

const inputChangeMonth = () => {
    monthInput.value = monthRange.value;
    monthPay.textContent = Math.round((costInput.value - depositInput.value) / monthRange.value) + ' ₽';
}

monthRange.oninput = inputChangeMonth;
monthInput.oninput = () => {
    monthRange.value = +monthInput.value;
    monthPay.textContent = Math.round((costInput.value - depositInput.value) / monthRange.value) + ' ₽';
}
monthInput.onblur = () => {
    if (monthInput.value.length == 0) {
        monthInput.value = 1;
    } else if (monthInput.value > monthRange.max) {
        monthInput.value = monthRange.max;
    }
}

//Form popup
const popup = document.getElementById('popup');
const formBtn = document.querySelectorAll('.form-btn');
const closeIcon = document.getElementById('close-icon');
const navbar = document.querySelector('.navbar');

let newDiv = document.createElement('div');

const openForm = (e) => {
    e.preventDefault();
    document.body.style.overflow = 'hidden';
    newDiv.setAttribute('id', 'layout');
    navbar.appendChild(newDiv);
    const layout = document.getElementById('layout');
    popup.style.bottom = 0 + 'vh';
    menuIcon.checked = false;
    layout.style.opacity = 0.5;
    layout.style.zIndex = 99;
}
closeIcon.onclick = () => {
    popup.style.bottom = -100 + 'vh';
    layout.style.opacity = 0;
    layout.style.zIndex = -999;
    layout.remove();
    document.body.style.overflow = 'unset';
}
formBtn.forEach((element) => {
    element.addEventListener('click', openForm)
});

//Submit
const inputForm = document.querySelectorAll('.popup__input');
const submitBtn = document.querySelectorAll('.popup-form__btn')[0];

const enableBtn = () => {
    if (inputForm[0].value.length > 0 && inputForm[1].value.length > 0) {
        submitBtn.disabled = false
    } else {
        submitBtn.disabled = true
    }
}

submitBtn.onclick = () => {
    submitBtn.querySelector('.btn__txt').style.display = 'none';
    submitBtn.querySelector('.btn__circle').style.display = 'block';
}

inputForm.forEach((el) => {
    el.addEventListener('keyup', enableBtn);
    el.onfocus = () => {
        el.nextElementSibling.classList.add('focused');
    }
    el.onblur = () => {
        if (el.value.length <= 0) {
            el.nextElementSibling.classList.remove('focused')
        }
    }
})

//Aside menu layout
const menuIcon = document.getElementById('menu');
menuIcon.onclick = () => {
    if (menuIcon.checked == true) {
        newDiv.setAttribute('id', 'layout');
        navbar.appendChild(newDiv);
        document.body.style.overflow = 'hidden';
        layout.style.zIndex = 2;
        layout.style.opacity = 0.5;
    }   else {
        document.body.style.overflow = 'unset';
        layout.style.zIndex = -999;
        layout.style.opacity = 0;
        layout.remove();
    }
}