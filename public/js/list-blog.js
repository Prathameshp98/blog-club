
const show_more = document.getElementById('show_more')
const parent = document.getElementById('parent')
const like = document.querySelectorAll('.like')
const remove = document.querySelectorAll('.remove')

like.forEach(element => {
    element.addEventListener("click", function(event){

        const targetId = event.target.id;
        const targetElement = document.getElementById(targetId)
    
        if(targetElement.getAttribute("src") === "/images/red_heart.webp"){
            targetElement.setAttribute("src","/images/heart.webp")
        } else {
            targetElement.setAttribute("src","/images/red_heart.webp")
        }
        
    });
})

remove.forEach(element => {
    element.addEventListener("click", function(event){

        let targetId = event.target.id;
        targetId = targetId.replace("_remove","") + "_blog"
        const targetElement = document.getElementById(targetId);

        targetElement.innerHTML = "<p class='blog-removal'>You won't see this blog again</p>"


        const hideElement = () => {
            targetElement.style.display = 'none';
        };

        setTimeout(hideElement, 2000)
        
    });
})

