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