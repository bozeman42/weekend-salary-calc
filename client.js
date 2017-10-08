console.log('js sourced')
$(main);

var employees = [];

function main(){
  addClickHandlers();
  displayEmployees();
  updateMonthlyExpenses();
}

function addClickHandlers(){
  $('#submit').on('click',submitForm);
  $('#employeeTableBody').on('click','.deleteButton',deleteRow);
}


// var eddie = new Employee('Eddie','Bobberton',51,'Friend to All',45000);
// var robert = new Employee('Robert','Edwardson',52,'Fist Bumper',85000);
// var craig = new Employee('Craig','Masterson',14,"Hearthstoner",160000)
// for (var iterator = 0; iterator < 1; iterator++){
//   employees.push(eddie,robert,craig);
// }

function submitForm(){
  console.log('form submit clicked');
  $('input').removeAttr('style');
  var firstName = $('#firstName').val().trim();
  var lastName = $('#lastName').val().trim(); 
  var idNumber = parseInt($('#idNumber').val());
  var jobTitle = $('#jobTitle').val().trim();
  var annualSalary = parseInt($('#salary').val());
  var formComplete = true;
  if (firstName === '') {
    formComplete = false;
    $('#firstName').css('border-color','red');
  }
  if (lastName === '') {
    formComplete = false;
    $('#lastName').css('border-color','red');
  }
  if (isNaN(idNumber)) {
    formComplete = false;
    $('#idNumber').css('border-color','red');
  }
  if (jobTitle === '') {
    formComplete = false;
    $('#jobTitle').css('border-color','red');
  }
  if (isNaN(annualSalary)) {
    formComplete = false;
    $('#salary').css('border-color','red');
  }
  if (formComplete) {
    var employee = new Employee(firstName, lastName, idNumber, jobTitle, annualSalary);
    employees.push(employee);
    displayEmployees();
    updateMonthlyExpenses();
    clearInput();
    }
}

function Employee(firstNameIn,lastNameIn,idNumberIn,jobTitleIn,annualSalaryIn) {
  this.firstName = firstNameIn;
  this.lastName = lastNameIn;
  this.idNumber = idNumberIn;
  this.jobTitle = jobTitleIn;
  this.annualSalary = annualSalaryIn;
}

function updateMonthlyExpenses() {
  var annualExpenses = 0;
  var monthlyExpenses = 0;
  for(var i = 0; i < employees.length; i += 1){
    annualExpenses += employees[i].annualSalary;
  }
  monthlyExpenses = annualExpenses / 12;
  $('#monthlyExpenses').text(monthlyExpenses.toFixed());
}

function displayEmployees(){
  var $table=$('#employeeTableBody')
  $table.children().remove();
  var $row;
  for(var i = 0; i < employees.length; i += 1) {
    $row = tableRow(employees[i],i)
    $table.append($row);
  }
}

function tableRow(employee,index){
  var rowString = '<tr>';
  rowString += '<td>' + employee.firstName + ' ' + employee.lastName + '</td>';
  rowString += '<td>' + employee.idNumber + '</td>';
  rowString += '<td>' + employee.jobTitle + '</td>';
  rowString += '<td class="salaryField">$' + employee.annualSalary + '</td>';
  rowString += '</tr>';
  var $delButton = $('<button class="deleteButton">Delete</button>');
  var $cell = $('<td></td>');
  $cell.append($delButton);
  $delButton.data('pos',index)
  console.log('cell',$cell);
  $row = $(rowString);
  $row.append($cell);
  console.log('row:',$row);
  return $row;
}

function clearInput(){
  $('#inputSection input').val('');
}

function deleteRow(){
  console.log(this);
  var $delButton = this;
  console.log("row selected for deletion",$delButton);
  console.log("Data on the delete button:",$.data($delButton,'index'));
  var index = $.data($delButton,'pos');
  employees.splice(index,1);
  displayEmployees();
  updateMonthlyExpenses();
}