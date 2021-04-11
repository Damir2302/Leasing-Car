//Aside menu layout
const menuIcon = document.getElementById('menu');
menuIcon.onclick = () => {
    if (menuIcon.checked == true) {
        newDiv.setAttribute('id', 'layout');
        navbar.appendChild(newDiv);
        document.body.style.overflow = 'hidden';
        layout.style.zIndex = 2;
        layout.style.opacity = 0.5;
    } else {
        document.body.style.overflow = 'unset';
        layout.style.zIndex = -999;
        layout.style.opacity = 0;
        layout.remove();
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
    setTimeout(submitForm, 2000);
}

const submitForm = function(){
    document.getElementById("form").submit();
    
    setTimeOut(function() {
        document.getElementById("calculator").submit();
    }, 5000);
}

//Добавляем событие
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

const phoneInput = document.querySelector('.phone-input')
phoneInput.onkeydown = function(e) {
    return !(/^[А-Яа-яA-Za-z ]$/.test(e.key))
}