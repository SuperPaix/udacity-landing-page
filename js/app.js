//Code to define Global Variables

const navBarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
//Code to create document fragment
const newDocFrag = document.createDocumentFragment();

// code to create navigation from Sections

for (const section of sections) {
  // Code to create element list
  const newNavBarListItem = document.createElement("li");
  // adding link to list
  const newNavBarListItemLink = document.createElement("a");
  // new node for linked session name
  const listItemText = document.createTextNode(
    section.getAttribute("data-nav")
  );

  // Adding classes and attributes to the link <a>
  newNavBarListItemLink.classList.add("menu__link");
  newNavBarListItemLink.setAttribute(
    "data-scrollTo",
    "#" + section.getAttribute("id")
  );
  // Adding the text node inside the link <a>
  newNavBarListItemLink.appendChild(listItemText);

  // Adding the link inside <li>
  newNavBarListItem.appendChild(newNavBarListItemLink);

  //adding the list item <li> inside the new fragment
  newDocFrag.appendChild(newNavBarListItem);
}

// Adding the fragment to the nav bar list <ul>
navBarList.appendChild(newDocFrag);

// Getting all the created list items Links <a>
const newNavBarListItemLinks = document.querySelectorAll(".menu__link");

// Adding 'active-section' class to section when near top of viewport
// And adding 'menu__activeLink' class to the corresponding link
let observer = new IntersectionObserver(callback, {
  rootMargin: "-150px 0px -400px 0px",
});
for (const section of sections) {
  observer.observe(section);
}

function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      removeAllActiveLinks(); // Remove all 'menu__activeLink' classes from menu links
      removeAllActiveSections(); // Remove all 'active-section' classes from sections
      for (const link of newNavBarListItemLinks) {
        if (
          link.getAttribute("data-scrollto") ==
          "#" + entry.target.getAttribute("id")
        ) {
          link.classList.add("menu__activeLink");
        }
      }
      entry.target.classList.add("active-section");
    }
  });
}

// Scrolling to section on menu item click
for (const link of newNavBarListItemLinks) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const section = document.querySelector(link.getAttribute("data-scrollTo"));
    section.scrollIntoView({ behavior: "smooth" });
    removeAllActiveLinks();
    link.classList.add("menu__activeLink");
  });
}

// Remove all 'menu__activeLink' classes from menu links
function removeAllActiveLinks() {
  navBarListItemLinks = navBarList.querySelectorAll("a");
  console.log(navBarListItemLinks);
  for (const link of newNavBarListItemLinks) {
    link.classList.remove("menu__activeLink");
  }
}

// Remove all 'active-section' classes from sections
function removeAllActiveSections() {
  for (const section of sections) {
    section.classList.remove("active-section");
  }
}
