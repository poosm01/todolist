const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
let todolist = {};    //Empty Object - Global Scope

function addTodo() {
  const form = document.querySelector('#myForm');
  if (form.checkValidity()) {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const target = document.getElementById("target").value;
/*
    const targetInput = document.querySelector('#target'); // select the target input field
    const targetDate = new Date(targetInput.value); // convert the input value to a Date object
    const formattedTargetDate = targetDate.toISOString().split('T')[0]; // format the date to yyyy-mm-dd
    targetInput.value = formattedTargetDate; // set the input value to the formatted date
*/
const targetDate = new Date(document.querySelector("#target").value); // Convert the input date string to a Date object
const formattedTargetDate = targetDate.toLocaleDateString('en-GB'); // Format the date to dd/mm/yyyy
document.querySelector("#target").value = formattedTargetDate; // Set the input value to the formatted date

/*console.log(formattedTargetDate);
const parts = formattedTargetDate.split('/');
const formattedTargetDate = parts[0] + '-' + parts[1] + '-' + parts[2];
console.log(formattedTargetDate);*/

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('target', target);

    fetch("http://localhost:8080/api/save", {
      method: 'POST',
      body: formData
    })
      .then(function(response) {
        console.log(response.status);
        if (response.ok) {
          location.reload();
          alert("Successfully Added Todo!");
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error adding Todo.");
      });
  } else {
    alert("Please fill out all required fields.");
  }
}
