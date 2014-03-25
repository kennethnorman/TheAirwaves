// theairwaves-index.js

var nojsvideo1 = document.getElementById("nojsvideo1");
nojsvideo1.parentNode.removeChild(nojsvideo1);

document.getElementById("video1").innerHTML = "Vida La Vida, by Coldplay, recorded live at the Swiss Cottage.";
$('#video1').click(function () {
    window.open("http://www.youtube.com/watch?v=54wezNzaH_k", "The Airwaves - Vida La Vida", 'width=600,height=450');
});

