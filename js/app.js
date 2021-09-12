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

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
sectionsList.forEach(populateNavigationBar);

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
navigationList.addEventListener('click', function(e){
    if(e.target != navigationList){
        resetUl();
        e.target.style.background = "rgba(136,203,171,0.5)";
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

