console.log('js sourced')
$(main);

function main(){
  addClickHandlers();
}

function addClickHandlers(){
  $('#submit').on('click',submitForm);
}

