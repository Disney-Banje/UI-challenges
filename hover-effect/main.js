const container = document.querySelector("main");

// Playing around with the mouse event 
container.addEventListener("mouseover", () => {
    document.body.style.backgroundColor = "#212529";
    container.classList.add("dark_mode");
})

container.addEventListener("mouseout", () => {
    document.body.style.backgroundColor = "#f8f9fa";
    container.classList.remove("dark_mode");
})