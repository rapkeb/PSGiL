function find_incident()
{
    const incidentsRef = database.ref('incidents');
    const incidents = document.getElementById("incidents");
    const id = document.getElementById("find_incident").value;
    alert(id);
    incidentsRef.child(id).once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            alert("ff")
            var row = incidents.insertRow();
            var cell13 = row.insertCell(0);
            cell13.innerHTML = id;
            var cell1 = row.insertCell(1);
            cell1.innerHTML = data.league_race;
            var cell11 = row.insertCell(2);
            cell11.innerHTML = data.created_driver;
            var cell2 = row.insertCell(3);
            cell2.innerHTML = data.involved_driver;
            var cell3 = row.insertCell(4);
            cell3.innerHTML = data.other_drivers;
            var cell4 = row.insertCell(5);
            cell4.innerHTML = data.session_type;
            var cell5 = row.insertCell(6);
            cell5.innerHTML = data.lap;
            var cell6 = row.insertCell(7);
            cell6.innerHTML = data.description;
            var cell7 = row.insertCell(8);
            cell7.innerHTML = data.evidence;
            var cell12 = row.insertCell(9);
            cell12.innerHTML = data.involved_driver_react;
            var cell8 = row.insertCell(10);
            cell8.innerHTML = data.judge_decision;
            var cell9 = row.insertCell(11);
            cell9.innerHTML = data.status;
            add_react(id);
        }
      })
      .catch((error) => {
        console.error('Error reading data:', error);
      });
}

function add_react(id)
{
    // Create a <div> element for the password input
const reactionInputDiv = document.createElement('div');
reactionInputDiv.className = 'form-outline mb-3';

// Create a <label> element for the password input
const passwordInputLabel = document.createElement('label');
passwordInputLabel.className = 'form-label';
passwordInputLabel.setAttribute('for', 'form3Example4');
passwordInputLabel.style.float = 'left';
passwordInputLabel.textContent = 'Incident decision';

// Create an <input> element for the password input
const reactionInput = document.createElement('input');
reactionInput.type = 'text';
reactionInput.id = 'decision_incident';
reactionInput.className = 'form-control';
reactionInput.placeholder = 'Enter incident decision';
reactionInput.setAttribute('aria-label', '');

// Append the label and input to the password input <div>
reactionInputDiv.appendChild(passwordInputLabel);
reactionInputDiv.appendChild(reactionInput);

// Create a <div> element for the button container
const buttonContainerDiv = document.createElement('div');
buttonContainerDiv.className = 'text-center mt-4 pt-2';
buttonContainerDiv.id = 'button_container';

// Create a <button> element for the "Find" button
const reactIncidentButton = document.createElement('button');
reactIncidentButton.id = 'react_incident_button';
reactIncidentButton.type = 'button';
reactIncidentButton.className = 'btn btn-primary';
reactIncidentButton.textContent = 'make a decision';
reactIncidentButton.addEventListener('click', function() {
    // Define the behavior when the button is clicked
    decision_for_incident(id);
});

// Append the "Find" button to the button container <div>
buttonContainerDiv.appendChild(reactIncidentButton);

// Get the parent element where you want to append these elements
const parentElement = document.getElementById('decision'); // Replace 'parent_container' with the actual container ID or selector

// Append the password input <div> and button container <div> to the parent element
parentElement.appendChild(reactionInputDiv);
parentElement.appendChild(buttonContainerDiv);

const elementToRemove = document.getElementById('search_input'); // Replace 'elementId' with the actual ID of the element to remove
elementToRemove.remove();
}

function decision_for_incident(id)
{
    const decision = document.getElementById('decision_incident').value;
    if(reaction.length < 1)
    {
      alert("decision should not be empty");
    }
    else
    {
    const usersRef = database.ref('incidents');
    usersRef.child(id).once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    if (data) {    
            // Define the fields and values you want to update
            const updates = {
                judge_decision : decision,
                status : "closed",
            };
              // Update the specified fields within the data at the location
              usersRef.child(id).update(updates)
                .then(() => {
                  alert('Data successfully updated!');
                })
                .catch((error) => {
                  alert('Error updating data:', error);
                });
    }
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });
}
}