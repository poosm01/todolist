
let todolist = {};    //Empty Object - Global Scope
let selectIndex = ""
fetch("http://localhost:8080/api/all")
        .then(response => response.json())
        .then(info => {
            todolist = info;
            displayDatabase(todolist);
        });

function selectTodo() {
    const index = prompt("Enter the Task No from the list that you want to select:");
    selectIndex = index;

    if (index === null || index === "") {
        return;
    }
    document.querySelector("#index").innerHTML = `<p><b>Index: </b>${index}</p>`;
    id = todolist[index].id;
    document.querySelector("#title").value = todolist[index].title;
    document.querySelector("#description").value = todolist[index].description;

    const targetDate = new Date(todolist[index].target); // Convert the target string to a Date object
    const localOffset = targetDate.getTimezoneOffset() * 60 * 1000; // Get the local time zone offset in milliseconds
    const targetLocalTime = targetDate.getTime() - localOffset; // Convert the target date to local time
    const formattedTargetDate = new Date(targetLocalTime).toISOString().split('T')[0]; // Format the local date to yyyy-mm-dd
    document.querySelector("#target").value = formattedTargetDate; // Set the input value to the formatted date
}
function addTodo() {
  const form = document.querySelector('#myForm');
  if (form.checkValidity()) {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const target = document.getElementById("target").value;

const targetDate = new Date(document.querySelector("#target").value); // Convert the input date string to a Date object
const formattedTargetDate = targetDate.toLocaleDateString('en-GB'); // Format the date to dd/mm/yyyy
document.querySelector("#target").value = formattedTargetDate; // Set the input value to the formatted date

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

function appendTodo(title, description, target)
{
// FormData is an object provided by the browser API for us to send the data over to the backend
   const formData = new FormData();
   formData.append('title', title);
   formData.append('description', description);
   formData.append('target', target);

  fetch("http://localhost:8080/api/save", {
        method: 'POST',
        body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status
            if (response.ok) {
                location.reload();  // reload the page
                alert("Successfully Added Product!")
            }
            else {
               alert("Something went wrong. Please try again")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error adding item to Product")
        });
} // End of function appendTodo
function updateTodo() {
    const form = document.querySelector('#myForm'); // select the form element
    if (form.checkValidity()) {
        //const id = id;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const target = document.getElementById("target").value;

const targetDate = new Date(document.querySelector("#target").value); // Convert the input date string to a Date object
const formattedTargetDate = targetDate.toLocaleDateString('en-GB'); // Format the date to dd/mm/yyyy
document.querySelector("#target").value = formattedTargetDate; // Set the input value to the formatted date

        const newTodo = {
          //  id: todolist.length.toString(),
            id: id,
            title: title,
            description: description,
            target: target,
        };

// FormData is an object provided by the browser API for us to send the data over to the backend
   const formData = new FormData();
   formData.append('id', id);
   formData.append('title', title);
   formData.append('description', description);
   formData.append('target', target);

  fetch("http://localhost:8080/api/save", {
        method: 'POST',
        body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status
            if (response.ok) {
                location.reload();  // reload the page
                alert("Successfully updated To Do task!")
            }
            else {
               alert("Something went wrong. Please try again")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error adding item to List")
        });
        clearForm();
    } else {
        alert("Please fill out all required fields.");
    }
} // End of function updateTodo
function deleteTodo() {
    if (selectIndex == null || selectIndex == "") {
    alert("Please select Task No to delete. Please try again")
    //    return;
    }
  fetch("http://localhost:8080/api/"+id, {
        method: 'DELETE',
     //   body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status
            if (response.ok) {
                location.reload();  // reload the page
                alert("Successfully deleted Product!")
            }
            else {
               alert("Something went wrong. Please try again")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error deleting item to Product")
        });
    clearForm();
}
function clearForm() {
    displayDatabase(todolist);
    document.querySelector("#index").innerHTML = `<p><b> Index: </b></p>`;
    selectIndex = "";
    document.querySelector("#myForm").reset();
}
function displayDatabase(todolist) {
    let display = `
    <h1>TODO List</h1>
            <table class="table table-striped mb-5" style="border:1px solid #000">  
                <tr>
                    <th>Task No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Target Date</th>
                </tr>
           `;
    for (let i = 0; i < todolist.length; i++) {
       const d = new Date(todolist[i].target);
       const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = d.toLocaleDateString('en-GB', options);
        display += `
                <tr>
                 <td>${i}</td>
                 <td>${todolist[i].title} </td>
                 <td>${todolist[i].description} </td>
                 <td>${formattedDate}</td>
                </tr>
                `;
    } //End of For Loop
    display += `</table>`;
    document.querySelector("#database").innerHTML = display;
};