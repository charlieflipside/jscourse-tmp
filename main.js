import './style.css';

// grab our form from index html 
const form = document.querySelector('form');

function showSpinner(){
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class = "spinner">🧠</span>';
}

function hideSpinner(){
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}

// listen for submit button 
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // don't refresh page on form submit!

  showSpinner();

  // json mapping the form 
  const data = new FormData(form);

  const response = await fetch('http://localhost:8080/dream', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', 
  },
  body: JSON.stringify({
    prompt: data.get('prompt'),
  }),
});


  if(response.ok){ 
    const {image} = await response.json();
    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width = "512" />`;
  } else { 
    const err = await response.text();
    alert(err);
    console.log(err);
  }

  hideSpinner();
})