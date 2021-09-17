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

//This function takes a section as parameter and creates a list item that corresponds to this section
//by setting it's content to the section's name, it then adds this list item to both an array that contains all the list items,
//and to the unordered list in the header.
function populateNavigationBar(section){
    const listItem = document.createElement('li');
	listItem.textContent = section.getAttribute("data-nav");
    ul.push(listItem);
	navigationList.appendChild(listItem);
}


//This function iterates through all the list items in the unordered list of the navigation bar and sets its background to transparent.
//The use of this function is to remove the highlighting of sections that are no longer in viewport.
function resetUl(){
    ul.forEach(function(element){
        element.style.background = "transparent";
        
    });
}

//This function takes a section as a parameter and returns true if the section is in viewport, false otherwise.
function sectionInViewport(section) {
    const boundries = section.getBoundingClientRect();
    return (
        boundries.top <= (window.innerHeight || document.documentElement.clientHeight)/4 &&
        boundries.bottom >= (window.innerHeight || document.documentElement.clientHeight)/4
    );
}

//This function returns the view back to the top of the page.
function scrollToTop(){
    document.documentElement.scrollTop = 0;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
//For each section in the sections list adds that section to the navigation bar.
sectionsList.forEach(populateNavigationBar);

// Add class 'active' to section when near top of viewport
//On scrolling this block of code checks for every section in the sections list if it exists within the viewport.
//It then adds or remove the class "your-active-class" to this section.
//After that it matches the section that's within the viewport with its corresponding navigation list item to highlight said item,
//or to remove the highlight from items that correspond to sections that are no longer in viewport.
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
//On click event on the navigation bar, this block of code scrolls the view to the target section, removes previous highlighting
//of navigation list, and highlights the new list item.
navigationList.addEventListener('click', function(e){
    if(e.target != navigationList){
        resetUl();
        e.target.style.background = backgroundColor;
        e.preventDefault();
        sectionsList[ul.indexOf(e.target)].scrollIntoView();
    }
    
});

//Changing the visibility of the scroll to top button based on whether the user scrolled down past the page's fold or not.
document.addEventListener("scroll", function(e){
    e.preventDefault();
    const rect = mainHero.getBoundingClientRect();
    if(rect.top <= -413){
        topButton.style.visibility = "visible";
    }else{
        topButton.style.visibility = "hidden";
    }
});

//Scrolling to the top
topButton.addEventListener('click', scrollToTop); 


//Hide navigation bar if the user didn't scroll for 3 seconds.
hidingNavigationBar = setTimeout(function(e){
    e.preventDefault();
    navigationBar.style.visibility = "hidden";
}, 3000);

//If the user scrolls, the navigation bar is set to visible again and the timer resets.
document.addEventListener("scroll", function(e){
    e.preventDefault();
    navigationBar.style.visibility = "visible";
    clearTimeout(hidingNavigationBar);
    hidingNavigationBar = setTimeout(function(){
        navigationBar.style.visibility = "hidden";
    }, 3000);
});

//If the user hovers over the navigation bar, it resets the timer for hiding the navigation bar and sets it to visible.
document.addEventListener("mousemove", function(e){
    e.preventDefault();
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
*/



