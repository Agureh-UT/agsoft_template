// const dropdown_btns = document.querySelectorAll(".dropdown-btn");
const burger = document.querySelector(".burger");
const topnavbar_links = document.querySelectorAll(".topnav-link");
const dropdown_lists = document.querySelectorAll(".dropdown-btn ~ .dropdown-list");




burger.addEventListener("click", () => {
  const navbar_content = document.querySelector(".topnav-list");
  burger.classList.toggle("fa-times");
  navbar_content.classList.toggle("show");
});

topnavbar_links.forEach((topnavbar_link) => {
  topnavbar_link.addEventListener("click", (e) => {
    console.log("TargetnextElementSibling", e.target.nextElementSibling);
    console.log("currentTarget_nextElementSibling", e.currentTarget.nextElementSibling);
    dropdown_lists.forEach((dropdown_list) => {
      // console.log("TargetnextElementSibling",e.target.nextElementSibling);
      // console.log("currentTarget_nextElementSibling",e.currentTarget.nextElementSibling);
      // console.log("dropdown_list", dropdown_list);
      if (e.currentTarget.nextElementSibling !== dropdown_list && dropdown_list.classList.contains("show")) {
        dropdown_list.classList.remove("show");
      }
      topnavbar_links.forEach((topnavbar_link) => topnavbar_link.classList.remove("activelinkclass"));
    });
    topnavbar_link.classList.toggle("activelinkclass");
    const panel = topnavbar_link.nextElementSibling;
    if (panel) {
      panel.classList.toggle("show");
    }
  });
});

// window.onclick = (e) => {
//   console.log("Target", e.target);
//   console.log("e.target.parentElement", e.target.parentElement);
//   console.log("currentTarget", e.currentTarget);
//   // if (!e.target.parentElement.matches(".topnav-link")) {
//   // if (!e.target.matches(".topnav-link")) {
//   if (!e.target.matches(".topnav-link") && !e.target.parentElement.matches(".topnav-link")) {
//     //  if (!parent.matches(".topnav-link")) {
//     // if (!element.parentElement.matches(".topnav-link") && !element.matches(".topnav-link")) {
//     topnavbar_links.forEach((topnavbar_link) => topnavbar_link.classList.remove("activelinkclass"));
//     dropdown_lists.forEach((dropdown_list) => dropdown_list.classList.remove("show"));
//   }
// };

const sidenav__link = document.querySelectorAll(".sidenav-link");
const sub_links = document.querySelectorAll(".sub_link");


function collapse_sidenav(topnav, toggler, side_nav, mainSection) {
  const topnavbar2 = document.getElementById(topnav);
  const nav_togglers2 = document.querySelectorAll(toggler);
  const sidenav2 = document.getElementById(side_nav);
  const main = document.getElementById(mainSection);

  nav_togglers2.forEach((nav_toggler2) => {
    nav_toggler2.addEventListener("click", function () {
      iconToToggle = this.querySelector("i");
      iconToToggle.classList.toggle("fa-times");
      sidenav2.classList.toggle("collapse");
      main.classList.toggle("collapse-main");
    });
  });


}

collapse_sidenav("topnav", ".sidenav-toggler", "sidenav", "main");

sidenav__link.forEach((link) => {
  link.addEventListener("click", function () {
    sidenav__link.forEach((l) => {
      if (l.classList.contains("activelinkclass")) {
        l.classList.remove("activelinkclass");
      }
    });

    this.classList.toggle("activelinkclass");
    const sub_menu = this.nextElementSibling;
    if (sub_menu) {
      sub_menu.classList.toggle("d-none");
    }
  });
});

sub_links.forEach((link) => {
  link.addEventListener("click", () => {
    sub_links.forEach((l) => l.classList.remove("activelinkclass"));
    link.classList.toggle("activelinkclass");
  });
});