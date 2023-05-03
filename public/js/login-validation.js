
const email = document.getElementById('email')
const password = document.getElementById('password')

const email_valid = document.getElementById('email-valid')
const password_valid = document.getElementById('password-valid')

let is_email_valid = false
let is_password_valid = false


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

    if(password.value === ""){
        password_valid.innerHTML = 'This field cannot be empty'; is_password_valid = false;
    } else {
        password_valid.innerHTML = ''; is_password_valid = true;
    }
    
    formValidation()
});




const formValidation = () => {
    if(is_email_valid && is_password_valid){
        document.getElementById('arrow-img').setAttribute('src', '/images/right-arrow.webp')
        document.getElementById('submit-button').disabled = false
        document.getElementById('submit-button').style.cursor = 'pointer'
    } else {
        document.getElementById('arrow-img').setAttribute('src', '/images/close.webp')
        document.getElementById('submit-button').disabled = true
        document.getElementById('submit-button').style.cursor = 'not-allowed'
    }
}