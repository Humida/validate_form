// get tag span use parent tag input
let getMessage = function(tagInput, nameMess) {
    return tagInput.parentElement.querySelector(nameMess);
}

let test = function(value) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
}
let validator = function(idForm) {
    this.nameForm = idForm;
    this.check = [
        isRequired(idForm, 'fullname'),
        isEmail(idForm, 'email'),
        isMinPassword(idForm, 'password'),
        isRetypePassword(idForm, 'retypePassword')
    ]
}

function isEmail(idForm, email) {
    let formX = document.getElementById(idForm);
    let inputEmail = formX.querySelector('#email');
    let message = getMessage(inputEmail, '.form-message');
    test(inputEmail.value);
    inputEmail.onblur = function() {
        let check = test(inputEmail.value);
        if (check === false) {
            message.style.opacity = 1;
        } else {
            return true;
        }
        inputEmail.oninput = function() {
            message.style.opacity = 0;
        }
    }
}

function isRequired(idForm, fullname) {
    let formX = document.getElementById(idForm);
    let inputFullname = formX.querySelector('#fullname');
    let message = getMessage(inputFullname, '.form-message');
    inputFullname.onblur = function() {
        if (inputFullname.value.trim() === '') {
            message.style.opacity = 1;
        }
        inputFullname.oninput = function() {
            message.style.opacity = 0;
        }
    }
}

function isMinPassword(idForm, password) {
    let formX = document.getElementById(idForm);
    let inputPassword = formX.querySelector('#password');
    let message = getMessage(inputPassword, '.form-message');
    message.addEventListener('input', function() {
        message.style.opacity = 0;
    })
    inputPassword.onblur = function() {
        if (inputPassword.value.trim() === '') {
            message.style.opacity = 1;
        } else if (inputPassword.value.length < 6) {
            message.innerHTML = 'Please input password than 6 char';
            message.style.opacity = 1;
        } else {
            message.style.opacity = 0;
        }

    }
}

function isRetypePassword(idForm, retypePassword) {
    let formX = document.getElementById(idForm);
    let inputRetype = formX.querySelector('#retypePassword');
    let inputPassword = formX.querySelector('#password');
    let message = getMessage(inputRetype, '.form-message');

    inputRetype.onblur = function() {
        message.oninput = function() {
            message.style.opacity = 0;
            console.log("minh danh");
        }
        if (inputPassword.value === '' || inputRetype === '') {
            message.innerHTML = "Please enter password! Retype again!"
            message.style.opacity = 1;
        } else if (inputPassword.value != inputRetype.value) {
            message.innerHTML = "Wrong! Please enter again";
            message.style.opacity = 1;
        } else {
            message.style.opacity = 0;
        }
        message.oninput = function() {
            message.style.opacity = 0;
            console.log("minh danh");
        }
    }
}

export default validator;