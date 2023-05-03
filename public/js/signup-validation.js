
const fullName = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirm_password = document.getElementById('confirm_password')

const name_valid = document.getElementById('name-valid')
const email_valid = document.getElementById('email-valid')
const password_valid = document.getElementById('password-valid')
const confirm_password_valid = document.getElementById('confirm-password-valid')

let is_name_valid = false
let is_email_valid = false
let is_password_valid = false
let is_confrom_password_valid = false

fullName.addEventListener("keyup", (event) => {
    if(fullName.value === ""){
        name_valid.innerHTML = 'This field cannot be empty'; is_name_valid = false;
    } else {
        name_valid.innerHTML = ''; is_name_valid = true;
    }
    formValidation()
});

email.addEventListener("keyup", (event) => {
    if(email.value === ""){
        email_valid.innerHTML = 'This field cannot be empty'; is_email_valid = false;
    } else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
        email_valid.innerHTML = 'Enter a Valid email'; is_email_valid = false;
    } else {
        email_valid.innerHTML = ''; is_email_valid = true;
    }
    formValidation()
});

password.addEventListener("keyup", (event) => {

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

    if(!confirm_password.value.length){
        if(password.value === ""){
            password_valid.innerHTML = 'This field cannot be empty'; is_password_valid = false;
        } else if(!(strongRegex.test(password.value))) {
            password_valid.innerHTML = 'Password is not Strong enough'; is_password_valid = false;
        } else {
            password_valid.innerHTML = ''; is_password_valid = true;
        }
    } else {
        if(password.value !== confirm_password.value){
            password_valid.innerHTML = 'Passwords do not match'; is_password_valid = false;
        } else {
            password_valid.innerHTML = ''; is_password_valid = true;
        }
    }
    formValidation()
});

confirm_password.addEventListener("keyup", (event) => {

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

    if(!password.value.length){
        if(confirm_password.value === ""){
            confirm_password_valid.innerHTML = 'This field cannot be empty'; is_confrom_password_valid = false;
        } else if(!(strongRegex.test(confirm_password.value))) {
            confirm_password_valid.innerHTML = 'Password is not Strong enough'; is_confrom_password_valid = false;
        } else {
            confirm_password_valid.innerHTML = ''; is_confrom_password_valid = true;
        }
    } else {
        if(password.value !== confirm_password.value){
            confirm_password_valid.innerHTML = 'Passwords do not match'; is_confrom_password_valid = false;
        } else {
            confirm_password_valid.innerHTML = ''; is_confrom_password_valid = true;
        }
    }
    formValidation()
});


const formValidation = () => {
    if(is_name_valid && is_email_valid && is_password_valid && is_confrom_password_valid){
        document.getElementById('arrow-img').setAttribute('src', '/images/right-arrow.webp')
        document.getElementById('submit-button').disabled = false
        document.getElementById('submit-button').style.cursor = 'pointer'
    } else {
        document.getElementById('arrow-img').setAttribute('src', '/images/close.webp')
        document.getElementById('submit-button').disabled = true
        document.getElementById('submit-button').style.cursor = 'not-allowed'
    }
}