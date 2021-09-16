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
let backgroundColor = "rgb(76, 132, 236)";
let topButton = document.getElementById("topButton");
let navigationBar = document.getElementsByClassName("page__header")[0];
let mainHero = document.getElementsByClassName("main__hero")[0];


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

function scrollToTop(){
    document.documentElement.scrollTop = 0;
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
                        ul[index].style.background = backgroundColor;
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
        e.target.style.background = backgroundColor;
        sectionsList[ul.indexOf(e.target)].scrollIntoView();
    }
    
});

//Changing the visibility of the scroll to top button
document.addEventListener("scroll", function(){
    const rect = mainHero.getBoundingClientRect();
    if(rect.top <= -413){
        topButton.style.visibility = "visible";
    }else{
        topButton.style.visibility = "hidden";
    }
});

//Scrolling to the top
topButton.addEventListener('click', scrollToTop); 


//Hide navigation bar
hidingNavigationBar = setTimeout(function(){
    navigationBar.style.visibility = "hidden";
}, 3000);

document.addEventListener("scroll", function(){
    navigationBar.style.visibility = "visible";
    clearTimeout(hidingNavigationBar);
    hidingNavigationBar = setTimeout(function(){
        navigationBar.style.visibility = "hidden";
    }, 3000);
});


document.addEventListener("mousemove", function(e){
    if(e.clientX <= 755 && e.clientX >=0 && e.clientY >=0 && e.clientY <= 22){
        navigationBar.style.visibility = "visible";
        clearTimeout(hidingNavigationBar);
        hidingNavigationBar = setTimeout(function(){
        navigationBar.style.visibility = "hidden";
    }, 3000);
    }
})

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


