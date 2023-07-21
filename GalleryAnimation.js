let toGalleryButton = document.getElementById("galleryButton");
let gallerySection = document.getElementById("gallerySection");

toGalleryButton.onclick = onButtonClick;

function onButtonClick() {
    gallerySection.style.transform = "scale(10)";
    setTimeout(() => {
        window.location = "./gallery.html";
    }, 1000)
}