# Monera
## Vem com a gente nessa jornada para descomplicar sua vida financeira! 

### Desenvolvedores:
* Jorlan Miranda
* Urquiza Nóbrega

#### Aqui você poderá:

* Gerenciar seu orçamento financeiro
* Gerenciar seus investimentos
* Criar suas metas e te mostraremos como alcançá-las
* Acompanhar seus gastos em tempo real
* Fazer pagamentos e transferências entre as contas cadastradas

#### Vem fazer parte do melhor aplicativo Open Banking! Vem monerar nos gastos! Vem conquistar seu equilíbrio financeiro! :)

<style>
* {box-sizing: border-box}
body {font-family: Verdana, sans-serif; margin:0}
.mySlides {display: none}
img {
  vertical-align: middle;
  height: 25%;
  }

/* Slideshow container */
.slideshow-container {
  max-width: 350px;
  position: relative;
  margin: auto;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: yellow;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev, .next,.text {font-size: 11px}
}
</style>

<body>

<div class="slideshow-container">

<div class="mySlides fade">
  <img src="https://user-images.githubusercontent.com/25303261/79082509-e0013600-7cfc-11ea-98b8-3eb81e643590.png" style="width:100%">
</div>

<div class="mySlides fade">
  <img src="https://user-images.githubusercontent.com/25303261/79082534-20f94a80-7cfd-11ea-85ec-9ebf7b9ee5a6.png" style="width:100%">
</div>

<div class="mySlides fade">
  <img src="https://user-images.githubusercontent.com/25303261/79082535-22c30e00-7cfd-11ea-8126-83d063f84084.png" style="width:100%">
</div>

<div class="mySlides fade">
  <img src="https://user-images.githubusercontent.com/25303261/79082537-23f43b00-7cfd-11ea-8308-8ee19ad63c30.png" style="width:100%">
</div>

<div class="mySlides fade">
  <img src="https://user-images.githubusercontent.com/25303261/79082538-248cd180-7cfd-11ea-837a-e06091d4b326.png" style="width:100%">
</div>

<div class="mySlides fade">
  <img src="https://user-images.githubusercontent.com/25303261/79082539-25256800-7cfd-11ea-82b4-6101edd08e4d.png" style="width:100%">
</div>

<div class="mySlides fade">
  <img src="https://user-images.githubusercontent.com/25303261/79082540-26569500-7cfd-11ea-9a43-6c277d35ba9c.png" style="width:100%">
</div>


  <!-- Next and previous buttons -->
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
  
</div>

<br>

<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span> 
  <span class="dot" onclick="currentSlide(4)"></span> 
  <span class="dot" onclick="currentSlide(5)"></span> 
  <span class="dot" onclick="currentSlide(6)"></span> 
  <span class="dot" onclick="currentSlide(7)"></span> 
</div>

<script>
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
</script>
