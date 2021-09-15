/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sectionsList = document.querySelectorAll("section");
let navigationList = document.getElementById("navbar__list");
let ul = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function populateNavigationBar(section){
    const listItem = document.createElement('li');
	listItem.textContent = section.getAttribute("data-nav");
    ul.push(listItem);
	navigationList.appendChild(listItem);
}

function resetUl(){
    ul.forEach(function(element){
        element.style.background = "transparent";
    });
}


function sectionInViewport(section) {
    const boundries = section.getBoundingClientRect();
    return (
        boundries.top <= (window.innerHeight /4 || document.documentElement.clientHeight/4) &&
        boundries.bottom >= (window.innerHeight /4 || document.documentElement.clientHeight/4)
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
sectionsList.forEach(populateNavigationBar);

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', function (e) {
    sectionsList.forEach(function(section){
        if(sectionInViewport(section)){
            if(!section.classList.contains("your-active-class")){
                section.classList.remove("your-active-class");
                sectionsList.forEach(function(element, index ,array){
                    if(section === element){
                        resetUl();
                        ul[index].style.background = "rgb(136,203,171)";
                    }
                });
                section.classList.add("your-active-class");
            }
        }else{
            sectionsList.forEach(function(element, index ,array){
                if(section === element){
                    ul[index].style.background = "transparent";
                }
            });
            if(section.classList.contains("your-active-class")){
                section.classList.remove("your-active-class");

            }
        }
    });
});









// Scroll to anchor ID using scrollTO event
navigationList.addEventListener('click', function(e){
    if(e.target != navigationList){
        resetUl();
        e.target.style.background = "rgb(136,203,171)";
    }
    sectionsList[ul.indexOf(e.target)].scrollIntoView();
    
});





/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


