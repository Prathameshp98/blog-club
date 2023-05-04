
const title = document.getElementById('title')
const content = document.getElementById('content')
const imageurl = document.getElementById('imageurl')

const title_valid = document.getElementById('title-valid')
const content_valid = document.getElementById('content-valid')
const imageurl_valid = document.getElementById('imageurl-valid')

let is_title_valid = false
let is_content_valid = false
let is_imageurl_valid = true

title.addEventListener("keyup", (event) => {
    if(title.value === ""){
        title_valid.innerHTML = 'This field cannot be empty'; is_title_valid = false;
    } else {
        title_valid.innerHTML = ''; is_title_valid = true;
    }
    formValidation()
});

content.addEventListener("keyup", (event) => {
    if(content.value === ""){
        content_valid.innerHTML = 'This field cannot be empty'; is_content_valid = false;
    } else {
        content_valid.innerHTML = ''; is_content_valid = true;
    }
    formValidation()
});

imageurl.addEventListener("keyup", (event) => {

    const regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)

    if(!(imageurl.value.match(regex))){
        if(imageurl.value !== ""){
            imageurl_valid.innerHTML = 'Enter a valid url'; is_imageurl_valid = false;
        } else {
            imageurl_valid.innerHTML = ''; is_imageurl_valid = true;
        }
    } else {
        imageurl_valid.innerHTML = ''; is_imageurl_valid = true;
    }
    formValidation()
});



const formValidation = () => {
    if(is_title_valid && is_content_valid && is_imageurl_valid){
        document.getElementById('submit-button').disabled = false
        document.getElementById('submit-button').style.cursor = 'pointer'
    } else {
        document.getElementById('submit-button').disabled = true
        document.getElementById('submit-button').style.cursor = 'not-allowed'
    }
}