console.log('js sourced')
$(main);

var employees = [];

function main(){
  addClickHandlers();
}

function addClickHandlers(){
  $('#submit').on('click',submitForm);
  $('#employeeTableBody').on('click','.deleteButton',deleteRow);
}



function submitForm(){
  console.log('form submit clicked');
  var firstName = $('#firstName').val();
  var lastName = $('#lastName').val(); 
  var idNumber = parseInt($('#idNumber').val());
  var jobTitle = $('#jobTitle').val();
  var annualSalary = parseInt($('#salary').val());
  var employee = new Employee(firstName, lastName, idNumber, jobTitle, annualSalary);
  employees.push(employee);
  console.log(employee);
  console.log(employees);
  displayEmployees();
  updateMonthlyExpenses();
  clearInput();
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
    console.log("$table",$table);
    console.log('function return',tableRow(employees[i]));
    $table.append(tableRow(employees[i],i));
  }
}

function tableRow(employee,index){
  var rowString = '<tr id="'+index+'">';
  rowString += '<td>' + employee.firstName + ' ' + employee.lastName + '</td>';
  rowString += '<td>' + employee.idNumber + '</td>';
  rowString += '<td>' + employee.jobTitle + '</td>';
  rowString += '<td>' + employee.annualSalary + '</td>';
  rowString += '<td><button class="deleteButton">Delete</button></td>';
  rowString += '</tr>';
  $row = $(rowString);
  console.log($row);
  return $row;
}

function clearInput(){
  $('#inputSection input').val('');
}

function deleteRow(){
  var id = $(this).parent().parent().attr('id');
  console.log(id);
  employees.splice(id,1);
  displayEmployees();
  updateMonthlyExpenses();
}