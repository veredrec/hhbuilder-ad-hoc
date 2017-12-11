var form = document.getElementsByTagName('form')[0];
var submit = document.getElementsByTagName('button')[1];
var add = document.getElementsByTagName('button')[0];
var messageSection = document.createElement('div');
var messageAge = document.createTextNode('h3');
var messageRel = document.createTextNode('h3');
document.getElementsByTagName('body')[0].appendChild(messageSection);

var applicants = []; // array to hold applicants details

// --- ADD APPLICANT ---

// generate id for each applicant input, to remove specific applicant
var idCounter = 0;
function generateId() {
  return idCounter++;
}

add.addEventListener('click', function(e) {
  e.preventDefault();
  var age = document.getElementsByTagName('input')[0].value;
  var rel = document.getElementsByTagName('select')[0].value;
  var smoke = document.getElementsByTagName('input')[1].checked;

  messageAge.textContent = '';
  messageRel.textContent = '';

  var applicantInput = {}; // object to hold applicant's details

  addForm(applicantInput, age, rel, smoke); // send input to verify and store

  document.getElementsByTagName('input')[0].value = ''; // empty form
  document.getElementsByTagName('select')[0].value = '';
  document.getElementsByTagName('input')[1].checked = false;
});

// --- VERIFY INPUT ---
function createMessageAge(message) {
  messageAge.textContent = message;
  messageSection.appendChild(messageAge);
}

function createMessageRel(message) {
  messageRel.textContent = message;
  messageSection.appendChild(messageRel);
}

var messages = {
  lowAge: ' - Age cannot be lower than 0... ',
  reqAge: ' - Age field is required.',
  reqRel: ' - Relationship field is required.'
};

function verifyAge(age) {
  if (age.trim() === '') {
    createMessageAge(messages.reqAge);
  } else if (age <= 0) {
    createMessageAge(messages.lowAge);
  } else {
    return age;
  }
}

function verifyRel(rel) {
  if (rel.trim() === '') {
    createMessageRel(messages.reqRel);
  } else {
    return rel;
  }
}

function isSmoker(smoke) {
  if (smoke === true) {
    return 'smoker';
  } else {
    return 'non-smoker';
  }
}

// --- ADD INPUT ---
function addForm(applicantInput, age, rel, smoke) {
  var ageSubmit = verifyAge(age);
  var relSubmit = verifyRel(rel);
  var smokerSubmit = isSmoker(smoke);
  submit.disabled = false;
  add.disabled = false;

  applicantInput.id = generateId();
  applicantInput.age = ageSubmit;
  applicantInput.rel = relSubmit;
  applicantInput.smoke = smokerSubmit;

  if (applicantInput.age !== undefined && applicantInput.rel !== undefined) {
    applicants.push(applicantInput);
    displayInput(applicants); // display applicants on the page
  }
}

// --- DISPLAY USER INPUT ---
var userSection = document.createElement('div');
function displayInput(applicants) {
  while (userSection.hasChildNodes()) {
    userSection.removeChild(userSection.lastChild);
  }
  applicants.forEach(function(applicant) {
    // create elements to display applicant's data
    var userTitle = document.createTextNode('h2');
    var userAge = document.createElement('p');
    var userRel = document.createElement('p');
    var userSmoke = document.createElement('p');
    userTitle.textContent = 'Applicant Details: ';
    userSection.appendChild(userTitle);
    userAge.textContent = 'Age: ' + applicant.age;
    userSection.appendChild(userAge);
    userRel.textContent = 'Relationship: ' + applicant.rel;
    userSection.appendChild(userRel);
    userSmoke.textContent = 'Smoker: ' + applicant.smoke;
    userSection.appendChild(userSmoke);
    // remove button with event function for removing specific applicant
    var removeButton = document.createElement('button');
    userSection.appendChild(removeButton);
    removeButton.textContent = 'Remove Applicant';
    removeButton.addEventListener('click', function() {
      var newApplicants = removeApplicant(applicants, applicant.id);
      update(newApplicants);
    });
    var newLine = document.createElement('br');
    userSection.appendChild(newLine);
  });
  document.getElementsByTagName('body')[0].appendChild(userSection);
}

function update(newApplicants) {
  applicants = newApplicants;
  displayInput(applicants);
}

// --- REMOVE APPLICANT ---
function removeApplicant(applicants, idToRemove) {
  var filteredApplicants = applicants.filter(function(applicantInput) {
    return applicantInput.id !== idToRemove;
  });
  return filteredApplicants;
}

// --- POPULATE PRE ELEMENT ---
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var pre = document.getElementsByTagName('pre')[0];
  pre.setAttribute('display', 'block');
  var userData = JSON.stringify(applicants);
  pre.innerText = userData;
  sendData(userData);
});

// --- SEND DATA AS A FAKE TRIP TO SERVER ---
function sendData(data) {
  form.setAttribute('method', 'post');
  form.setAttribute('action', '/addData');
  var xhr = new XMLHttpRequest();
  var url = '/addData';
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
    }
  };
  xhr.open('POST', url, true);
  xhr.send(userData);
}
