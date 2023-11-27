function find_incident()
{
    const incidentsRef = database.ref('incidents');
    const incidents = document.getElementById("incidents");
    const id = '-' + document.getElementById("find_incident").value;
    alert(id);
    incidentsRef.child(id).once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            var row = incidents.insertRow();
            var cell13 = row.insertCell(0);
            cell13.innerHTML = id.substring(1);
            var cell14 = row.insertCell(1);
            cell14.innerHTML = data.category;
            var cell1 = row.insertCell(2);
            cell1.innerHTML = data.league_race;
            var cell11 = row.insertCell(3);
            cell11.innerHTML = data.created_driver;
            var cell2 = row.insertCell(4);
            cell2.innerHTML = data.involved_driver;
            var cell3 = row.insertCell(5);
            cell3.innerHTML = data.other_drivers;
            var cell4 = row.insertCell(6);
            cell4.innerHTML = data.session_type;
            var cell5 = row.insertCell(7);
            cell5.innerHTML = data.lap;
            var cell6 = row.insertCell(8);
            cell6.innerHTML = data.description;
            var cell7 = row.insertCell(9);
            cell7.innerHTML = data.evidence;
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
passwordInputLabel.textContent = 'Incident reaction';

// Create an <input> element for the password input
const reactionInput = document.createElement('input');
reactionInput.type = 'text';
reactionInput.id = 'react_incident';
reactionInput.className = 'form-control';
reactionInput.placeholder = 'Enter incident reaction';
reactionInput.setAttribute('aria-label', '');

const br = document.createElement('br');

// Create a <label> element for the password input
const passwordInputLabel1 = document.createElement('label');
passwordInputLabel1.className = 'form-label';
passwordInputLabel1.setAttribute('for', 'form3Example4');
passwordInputLabel1.style.float = 'left';
passwordInputLabel1.textContent = 'Reaction evidence';

// Create an <input> element for the password input
const reactionInput1 = document.createElement('input');
reactionInput1.type = 'url';
reactionInput1.id = 'react_incident_evidence';
reactionInput1.className = 'form-control';
reactionInput1.placeholder = 'Enter reaction evidence';
reactionInput1.setAttribute('aria-label', '');

// Append the label and input to the password input <div>
reactionInputDiv.appendChild(passwordInputLabel);
reactionInputDiv.appendChild(reactionInput);
reactionInputDiv.appendChild(br);
reactionInputDiv.appendChild(passwordInputLabel1);
reactionInputDiv.appendChild(reactionInput1);

// Create a <div> element for the button container
const buttonContainerDiv = document.createElement('div');
buttonContainerDiv.className = 'text-center mt-4 pt-2';
buttonContainerDiv.id = 'button_container';

// Create a <button> element for the "Find" button
const reactIncidentButton = document.createElement('button');
reactIncidentButton.id = 'react_incident_button';
reactIncidentButton.type = 'button';
reactIncidentButton.className = 'btn btn-primary';
reactIncidentButton.textContent = 'react';
reactIncidentButton.addEventListener('click', function() {
    // Define the behavior when the button is clicked
    react_for_incident(id);
});

// Append the "Find" button to the button container <div>
buttonContainerDiv.appendChild(reactIncidentButton);

// Get the parent element where you want to append these elements
const parentElement = document.getElementById('react'); // Replace 'parent_container' with the actual container ID or selector

// Append the password input <div> and button container <div> to the parent element
parentElement.appendChild(reactionInputDiv);
parentElement.appendChild(buttonContainerDiv);

const elementToRemove = document.getElementById('search_input'); // Replace 'elementId' with the actual ID of the element to remove
elementToRemove.remove();
}

function react_for_incident(id)
{
    const reaction = document.getElementById('react_incident').value;
    const evidence = document.getElementById('react_incident_evidence').value;
    check_evidence1();
    if(reaction.length < 1)
    {
      alert("reaction should not be empty");
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
                involved_driver_react : reaction,
                involved_driver_evidence : evidence,
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

function check_evidence1() {
  var evidence = document.getElementById("react_incident_evidence").value;
  // Prepend "http://" if the URL doesn't include a protocol
  if (!evidence.includes('://')) {
      evidence = 'http://' + evidence;
  }
  try {
    new URL(evidence);
    document.getElementById("react_incident_evidence").value = evidence;
    return true;
  } catch (err) {
      alert("url is invalid")
    return false;
  }
}