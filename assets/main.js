var dropArea = document.querySelector(".container");

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
})

dropArea.addEventListener("dragleave", (event) => {
    event.preventDefault();
    dropArea.classList.remove("active");
})

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
})