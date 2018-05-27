'use strict';

// Код валидации формы
function validateForm(){

var form_valid = arguments[0].formValidClass;
var form_invalid  = arguments[0].formInvalidClass;
var input_error = arguments[0].inputErrorClass;

var form = document.getElementById(arguments[0].formId);
var elems = form.querySelectorAll('input');
var elemsList = Array.prototype.slice.call(elems);

form.addEventListener('submit',Handler);
form.addEventListener('focus', input_focus,true);
form.addEventListener('blur', input_blur,true);
var button = document.querySelector('button');
button.addEventListener('click',Handler);

function Handler (event){
	event.preventDefault();
	form.classList.remove(form_invalid);
    elemsList.forEach(function(elem){
		if(elem.dataset.hasOwnProperty('required')){
			if(elem.classList.contains(input_error)&&(!form.classList.contains(form_invalid))){
				if(form.classList.contains(form_valid))
				form.classList.remove(form_valid);
				form.classList.add(form_invalid);
			}
			if(elem.value == '' || elem.value == ' '){
				elem.classList.add(input_error);
				if(!form.classList.contains(form_invalid)){
					form.classList.remove(form_valid);
					form.classList.add(form_invalid);
				}
			}
		}else{
			if(elem.classList.contains(input_error)&&(!form.classList.contains(form_invalid))){
				if(form.classList.contains(form_valid))
				form.classList.remove(form_valid);
				form.classList.add(form_invalid);
			}
		}
	}); 
    if(!document.querySelector('.'+form_invalid)){
	    form.classList.add(form_valid);
    }
} 

function input_focus (event){
	if(event.target.tagName === 'INPUT'){
	event.target.classList.remove(input_error);
	event.stopPropagation();
}
}

function input_blur (event){
if(event.target.tagName === 'INPUT'){

	if(event.target.dataset.hasOwnProperty('required') && event.target.value == ''){
		event.target.classList.add(input_error);
	}
	else if(event.target.dataset.validator == 'letters'){
		var regName = new RegExp('^[а-яА-ЯёЁa-zA-Z-_\.\\s]{1,}$');
		if(!regName.test(event.target.value)){ 
			event.target.classList.add(input_error);
		}
	}else if(event.target.dataset.validator == 'number'){
		if(event.target.dataset.validatorMax){
			var Max = Number.parseInt(event.target.dataset.validatorMax);
		}

		if(event.target.dataset.validatorMin){
			var Min = Number.parseInt(event.target.dataset.validatorMin);
		}

		if(isNaN(event.target.value) || (event.target.value < Min) || (event.target.value > Max)){
			if(event.target.value)
			event.target.classList.add(input_error);
		}
	}else if(event.target.dataset.validator == 'regexp'){
		var reg = new RegExp(event.target.dataset.validatorPattern);
		if(!reg.test(event.target.value) && event.target.value){
			event.target.classList.add(input_error);
		}
	}
	event.stopPropagation();
}
}
}