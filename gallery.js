const track = document.getElementById("image-track");
track.dataset.prevPercentage = 0;
track.dataset.mouseDownAt = '0';
track.dataset.percentage = 0;

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

let backToHomeButton = document.getElementById("backToHomeButton");
let body = document.getElementById("body");
backToHomeButton.onclick = onBackClicked;
let imageListContainer = document.getElementById('image-track');
let images = [
    "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", 
    "https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80",
    "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80",
    "https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
];
let currentImageIndex = 0;
let mikroKurzusDiv = document.getElementById('mikrokurzus');
let csihaDiv = document.getElementById('csiha');
let sstvDiv = document.getElementById('sstv');
let meteorDiv = document.getElementById('meteor');

function renderImages() {
  currentImageIndex = 0;
  images.forEach((imageElement) => {
    var imageDiv = document.createElement('div');
    var image = document.createElement('img');
    var detailsLink = document.createElement('button');
    imageDiv.id = ++currentImageIndex;
    detailsLink.classList.add('detailsButton');
    image.dataset.index = currentImageIndex;
  
    detailsLink.addEventListener('click', () => {
      openImageSlideShow(image);
    });
  
    image.classList.add('image');
    image.setAttribute('draggable', 'false');
    image.src = imageElement;
    imageDiv.appendChild(image);
    imageDiv.appendChild(detailsLink);
    imageListContainer.appendChild(imageDiv);
  });
}


let currentDelay = 0;
let animationLength = "16s";
let prevIndex = images.length - 1;
let popUpOpened = false;
let slideShowSection = document.getElementsByClassName('slideshow')[0];
let currentProgressDiv = document.getElementsByClassName('progress')[0];
let rightArrow = document.getElementsByClassName('arrow-next')[0];
let leftArrow = document.getElementsByClassName('arrow-prev')[0];
let selectedImage = document.getElementById('selectedImage');
currentImageIndex = 0;

body.addEventListener('click', (event) => {
  checkIfSlideShowNeededToClose(event);
});

currentImageIndex = 0;
rightArrow.onclick = switchToNextPicture;
leftArrow.onclick = switchToPrevPicture;

function checkIfSlideShowNeededToClose(event) {
  if (clickedOutsideOfSlideshow(event)) {
    popUpOpened = false;
    closeSlideShow();
  }
}

function clickedOutsideOfSlideshow(event) {
  return popUpOpened &&
    event.target.id !== 'slide' &&
    (
        event.target.classList[0] == 'image' ||
        event.target.classList.length == 0
    );
}

function closeSlideShow() {
  slideShowSection.style.transition = "1s linear";
  slideShowSection.style.opacity = '0';
  slideShowSection.style.transform = "scale(0)";
  setTimeout(() => {
    slideShowSection.style = "display: none";
  }, 2000);
}

function openImageSlideShow(image) {
  popUpOpened = true;
  slideShowSection.style = "display: block";
  selectedImage.src = image.src;
  currentImageIndex = image.dataset.index - 1;
  currentProgressDiv.textContent = (image.dataset.index) + " of " + images.length;
}

function switchToNextPicture() {
  if (currentImageIndex == images.length - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }
  selectedImage.src = images[currentImageIndex];
  currentProgressDiv.textContent = (currentImageIndex + 1) + " of " + images.length;
}

function switchToPrevPicture() {
  if (currentImageIndex == 0) {
    currentImageIndex = images.length - 1;
  } else {
    currentImageIndex--;
  }
  selectedImage.src = images[currentImageIndex];
  currentProgressDiv.textContent = (currentImageIndex + 1) + " of " + images.length;
}

function onBackClicked() {
  body.style.transform = "scale(10)";
  setTimeout(() => {
      window.location = "./index.html";
  }, 1000);
}

function deletePrevPictures() {
  currentImageIndex = 1;
  images.forEach(() => {
    if (document.getElementById(currentImageIndex)) {
      document.getElementById(currentImageIndex++).remove();
    }
  });
}

function switchAlbum(album) {
  switch(album) {
    case "mikrokurzus":
      deletePrevPictures();
      images = [
        "https://gallery.mora.u-szeged.hu/watermark/jpeg/2022/0419bevezetesamikrovezerlokvilagabatavasz/kurzus_2022_04_12_19_00_42_0008_2.jpg",
        "https://gallery.mora.u-szeged.hu/watermark/jpeg/2022/0419bevezetesamikrovezerlokvilagabatavasz/kurzus_2022_04_12_19_00_42_0008_2.jpg"
      ];
      renderImages();
      break;
    case 'csiha':
      deletePrevPictures();
      images = [
        "https://gallery.mora.u-szeged.hu/watermark/jpeg/2022/0520_csiha/csiha_2022_05_20_08_51_51_0001_2.jpg",
        "https://gallery.mora.u-szeged.hu/watermark/jpeg/2022/0520_csiha/csiha_2022_05_20_09_40_05_0002_2.jpg"
      ];
      renderImages();
      break;
    case 'sstv':
      deletePrevPictures();
      images = [
        "https://gallery.mora.u-szeged.hu/watermark/jpeg/2022/0800iss/IMG_0090.jpeg",
        "https://gallery.mora.u-szeged.hu/watermark/jpeg/2022/0800iss/19700101_191333_638507111.png"
      ];
      renderImages();
      break;
  }
}