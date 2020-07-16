window.addEventListener('load', start);

var sliderred = document.querySelector('#sliderRed');
var slidergreen = document.querySelector('#sliderGreen');
var sliderblue = document.querySelector('#sliderBlue');
var boxrgb = document.querySelector('.box-rgb');
var inputred = document.querySelector('#input-red');
var inputgreen = document.querySelector('#input-green');
var inputblue = document.querySelector('#input-blue');

function start() {
  sliderred.addEventListener('input', changeInputRed);
  slidergreen.addEventListener('input', changeInputGreen);
  sliderblue.addEventListener('input', changeInputBlue);
  changeColorBox();
}

function changeInputRed(event) {
  var currentRangeRed = event.target.value;
  inputred.value = currentRangeRed;
  changeColorBox();
}

function changeInputGreen(event) {
  var currentRangeGreen = event.target.value;
  inputgreen.value = currentRangeGreen;
  changeColorBox();
}

function changeInputBlue(event) {
  var currentRangeBlue = event.target.value;
  inputblue.value = currentRangeBlue;
  changeColorBox();
}

function changeColorBox() {
  boxrgb.style.backgroundColor = `rgb(${sliderred.value},${slidergreen.value},
    ${sliderblue.value})`;
}
