
const close = document.getElementById('close')
const open = document.getElementById('open')
const profile = document.getElementById('profile')

close.addEventListener("click", function(){
    profile.classList.add('hide')
});

open.addEventListener("click", function(){
    profile.classList.remove('hide')
});