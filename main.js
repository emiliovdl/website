const timeEfficiency = 0.58;
const binEfficiency = 0.61;
const hourlyWage = 35;
const costPlastic = 0.3; 
const weeks = 52;

const MESSAGE_REQUIRED= "Verplicht invullen.";
const NUMBER_INVALID = "Getal moet groter zijn dan nul."


function costSavings (binsWeekly, hoursWeekly) {
  return (binsWeekly * binEfficiency * costPlastic * weeks ) + (hoursWeekly * timeEfficiency * hourlyWage * weeks); 
}

function timeSavings (hoursWeekly) {
  return (hoursWeekly * timeEfficiency * weeks);
}

function plasticSavings (binsWeekly) {
  return (binsWeekly * binEfficiency * weeks);
}


function showMessage (input, message, type) {
  if(type == false) {
    const msg = input.parentNode.querySelector("p"); // this gets the error message
    msg.style.display = "block"; // makes the error message visible
    msg.innerText = message; // set the error message
  }
  return type;
}

function showSucces (input){
  return showMessage(input,"", true);
}

function showError (input, message) {
  return showMessage(input, message, false);
}


function hasValue(input, message) {
  if(input.value.trim() === "" || input.value === null) {
    return showError(input, message);
  }
  return showSucces(input);
}

function validateNumber (input, message1, message2) {

  if(!hasValue(input, message1)) {
    return false;
  }

  if(input.value < 0){
    return showError(input, message2);
  }
    
  return showSucces(input);
}

function clearForm (input) {
  input.parentNode.querySelector("p").innerText = "";
}

function calculateSavings (binsWeekly,hoursWeekly) {
  document.getElementById("costSavings").textContent =`${Math.ceil(costSavings(binsWeekly, hoursWeekly)).toLocaleString()} euro`;
  document.getElementById("timeSavings").textContent = `${Math.ceil(timeSavings(hoursWeekly)).toLocaleString()} uren`;
  document.getElementById("plasticSavings").textContent = `${Math.ceil(plasticSavings(binsWeekly)).toLocaleString()} zakken`;
  
}

function sendMail(organization, bins, binsWeekly, hoursWeekly) {
  const serviceID = 'service_gx6m6mz';
  const templateID = 'template_bywh74c';
  var templateParams = {
    from_name: organization.value ,
    message: ` \n Total Bins: ${bins.value} \n Weekly collected bins: ${binsWeekly.value} \n Weekly collected hours: ${hoursWeekly.value}`
  };
  emailjs.send(serviceID, templateID, templateParams).then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
 }, function(error) {
    console.log('FAILED...', error);
 });

}

const btn = document.getElementById("submitButton");
btn.onclick = function () {
  
  let organization = document.getElementById("name");
  let bins = document.getElementById("bins");
  let binsWeekly = document.getElementById("binsWeekly");
  let hoursWeekly = document.getElementById("hoursWeekly");

  // clear form warnings
  clearForm(organization);
  clearForm(bins);
  clearForm(binsWeekly);
  clearForm(hoursWeekly);

  // validate the form
  let validOrganization = hasValue(organization, MESSAGE_REQUIRED);
  let validBins = validateNumber(bins, MESSAGE_REQUIRED, NUMBER_INVALID);
  let validBinsWeekly = validateNumber(binsWeekly, MESSAGE_REQUIRED, NUMBER_INVALID) ;
  let validHoursWeekly = validateNumber(hoursWeekly, MESSAGE_REQUIRED, NUMBER_INVALID);
  if(validOrganization && validBins && validBinsWeekly && validHoursWeekly) {
    calculateSavings(binsWeekly.value, hoursWeekly.value);
    sendMail(organization, bins, binsWeekly, hoursWeekly);
  }
}




