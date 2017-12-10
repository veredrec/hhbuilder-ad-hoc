// when submit form
// checks age + message
// checks rel + message
// checks smoker
// if everything is good - store in object
// pushed to array
// remove previous displayed items
// displayes all items
// add will start process over
// remove will delete specific item from array

var form = document.getElementsByTagName('form')[0];
var submit = document.getElementsByTagName('button')[1];
var add = document.getElementsByTagName('button')[0];
var messageSection = document.createElement('div');
document.getElementsByTagName('body')[0].appendChild(messageSection);
var messageAge = document.createTextNode('h3');
var messageRel = document.createTextNode('h3');


// VERIFY INPUT
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

var applicants = [];

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

// SUBMIT EVENT
form.addEventListener('submit', function(event) {
  event.preventDefault();
  add.disabled = true;

  var formValues = event.target.elements;
  var age = formValues.age.value;
  var rel = formValues.rel.value;
  var smoke = formValues.smoker.checked;

  var applicantInput = {
  };

  messageAge.textContent = '';
  messageRel.textContent = '';

  submitForm(applicantInput, age, rel, smoke);
});

function submitForm(applicantCurrentInput, age, rel, smoke) {
    var ageSubmit = verifyAge(age);
    var relSubmit = verifyRel(rel);
    var smokerSubmit = isSmoker(smoke);
    submit.disabled = true;
    add.disabled = false;

    var applicantSubmit = {
      age: ageSubmit,
      rel: relSubmit,
      smoke: smokerSubmit
    }

    applicants.push(applicantSubmit);
    displayInput(applicants);
}

// DISPLAY USER INPUT
var userSection = document.createElement('ul');
function displayInput(applicants) {
  while (userSection.hasChildNodes()) {
    userSection.removeChild(userSection.lastChild);
  }
  applicants.forEach(function(applicant) {
    var userTitle = document.createTextNode('li');
    var userAge = document.createElement('li');
    var userRel = document.createElement('li');
    var userSmoke = document.createElement('li');
    console.log(applicant);
    userTitle.textContent = 'Applicant Details: ';
    userSection.appendChild(userTitle);
    userAge.textContent = 'Age: ' + applicant.age;
    userSection.appendChild(userAge);
    userRel.textContent = 'Relationship: ' + applicant.rel;
    userSection.appendChild(userRel);
    userSmoke.textContent = 'Smoker: ' + applicant.smoke;
    userSection.appendChild(userSmoke);
    var button = document.createElement('button');
    button.setAttribute('id', 'remove');
    button.setAttribute('onclick', 'removeApplicant()');
    userSection.appendChild(button);
    button.textContent = 'Remove Applicant';
  });
  document.getElementsByTagName('body')[0].appendChild(userSection);
}

  // REMOVE APPLICANT

  function removeApplicant() {
    this.parentNode.removeChild(this); // not the right way to remove
  };

// ADD APPLICANT
add.addEventListener('click', function() {
  event.preventDefault();
  submit.disabled = false;
  add.disabled = true;
});


// PROBLEMS:
// even when can't submit form, displays the previous object again
// remove applicant doesn't work

// TODO send JSON at the end as fake trip to server
