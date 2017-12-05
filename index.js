var submit = document.getElementsByTagName('button')[1];

// var userInput = {};

submit.addEventListener('click', function(event) {
  console.log('submit');
  event.preventDefault();
  var age = document.getElementsByTagName('input')[0].value;
  createMessage(age);
});

function createMessage(age) {
  var div = document.createElement('div');
  document.body.appendChild(div);
  var message = document.createTextNode('h1');
  message.innerText = 'age';
  div.appendChild(message);
}

// function verifyAge(age) {
//   if (age === '') {
//     createMessage('required field');
//   } else if (age <= 0) {
//     createMessage('age lower than 0');
//   }
// }
