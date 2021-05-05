var imgValue = 1;
showSlides(imgValue);

function plusSlides(n) {
    showSlides(imgValue += n);
}

function showSlides(n) {
    var nodeSliders = document.getElementsByClassName("mySlides");
    if (n > nodeSliders.length) {
        imgValue = 1;
    }
    if (n < 1) {
        imgValue = nodeSliders.length;
    }
    for (i = 0; i < nodeSliders.length; i++) {
        nodeSliders[i].style.display = "none";
    }
    nodeSliders[imgValue - 1].style.display = "block";
}

