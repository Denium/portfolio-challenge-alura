const form = document.getElementById('myForm');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const submitButton = document.getElementById('submitButton');

form.addEventListener('submit', (event) =>{
  event.preventDefault();
  nameValidate();
  emailValidate();
  assuntoValidate();
  location.reload();
});

function setError(index){
  campos[index].style.border = '2px solid #e63636';
  spans[index].style.display = 'block';
}

function removeError(index){
  campos[index].style.border = '';
  spans[index].style.display = 'none';
}

function nameValidate(){
  if(campos[0].value.length < 3){
    setError(0);
  }else{
    removeError(0);
  }
}

function emailValidate(){
  if(!emailRegex.test(campos[1].value)){
    setError(1);
  }else{
    removeError(1);
  }
}

function assuntoValidate(){
  if(campos[2].value.length < 5){
    setError(2);
  }else{
    removeError(2);
  }
}
