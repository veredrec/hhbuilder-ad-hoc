var submit = document.getElementsByTagName('button')[1];
var messageAge = document.createTextNode('h2');
var messageRel = document.createTextNode('h2');

function createMessageAge(message) {
  messageAge.textContent = message;
  document.body.appendChild(messageAge);
}
function createMessageRel(message) {
  messageRel.textContent = message;
  document.body.appendChild(messageRel);
}

function verifyAge(age) {
  if (age === '') {
    createMessageAge(
      'The filed "Age" is required. Please provide a valid age. '
    );
  } else if (age <= 0) {
    createMessageAge('Age cannot be lower than 0... ');
  }
}

function verifyRel(rel) {
  if (rel === '') {
    createMessageRel(
      'The field "Relationship" is required. Please choose one of the options provided.'
    );
  }
}

submit.addEventListener('click', function(event) {
  messageAge.textContent = '';
  messageRel.textContent = '';
  console.log('submit');
  event.preventDefault();
  var age = document.getElementsByTagName('input')[0].value;
  var rel = document.getElementsByTagName('select')[0].value;
  verifyAge(age);
  verifyRel(rel);
});
