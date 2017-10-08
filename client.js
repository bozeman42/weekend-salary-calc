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
// for (var iterator = 0; iterator < 100; iterator++){
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
  console.log(annualSalary);
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
    console.log((firstName !== '') && (lastName !== '') && (idNumber !== NaN) && (jobTitle !== '') && (annualSalary !== NaN));
    var employee = new Employee(firstName, lastName, idNumber, jobTitle, annualSalary);
    employees.push(employee);
    console.log(employee);
    console.log(employees);
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
  for(var i = 0; i < employees.length; i += 1) {
    $table.append(tableRow(employees[i],i));
  }
}

function tableRow(employee,index){
  var rowString = '<tr>';
  rowString += '<td>' + employee.firstName + ' ' + employee.lastName + '</td>';
  rowString += '<td>' + employee.idNumber + '</td>';
  rowString += '<td>' + employee.jobTitle + '</td>';
  rowString += '<td class="salaryField">$' + employee.annualSalary + '</td>';
  rowString += '<td><button class="deleteButton">Delete</button></td>';
  rowString += '</tr>';
  $row = $(rowString);
  $.data($row,'index',index);
  return $row;
}

function clearInput(){
  $('#inputSection input').val('');
}

function deleteRow(){
  var $row = $(this).parent().parent();
  var index = $.data($row,index);
  employees.splice(index,1);
  displayEmployees();
  updateMonthlyExpenses();
}