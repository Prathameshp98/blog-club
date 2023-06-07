
const show_more = document.getElementById('show_more')
const parent = document.getElementById('parent')
const like = document.getElementById('like')


like.addEventListener("click", function(){
    if(like.getAttribute("src") === "/images/red_heart.webp"){
        like.setAttribute("src","/images/heart.webp")
    } else {
        like.setAttribute("src","/images/red_heart.webp")
    }
    
});