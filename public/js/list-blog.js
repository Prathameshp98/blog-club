
const show_more = document.getElementById('show_more')
const parent = document.getElementById('parent')
const like = document.querySelectorAll('.like')

like.forEach(element => {
    element.addEventListener("click", function(event){

        const targetId = event.target.id;
        const targetElement = document.getElementById(targetId)
        console.log(targetId)
    
        if(targetElement.getAttribute("src") === "/images/red_heart.webp"){
            targetElement.setAttribute("src","/images/heart.webp")
        } else {
            targetElement.setAttribute("src","/images/red_heart.webp")
        }
        
    });
})

