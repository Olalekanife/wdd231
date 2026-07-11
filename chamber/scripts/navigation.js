const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");

    const expanded = menuButton.classList.contains("open");

    menuButton.setAttribute("aria-expanded", expanded);

});