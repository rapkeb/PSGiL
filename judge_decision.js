function find_incident()
{
    const incidentsRef = database.ref('incidents');
    const incidents = document.getElementById("incidents");
    const id = '-' + document.getElementById("find_incident").value;
    incidentsRef.child(id).once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
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
            var cell10 = row.insertCell(9);
            cell10.innerHTML = data.evidence2;
            var cell12 = row.insertCell(10);
            cell12.innerHTML = data.involved_driver_react;
            var cell8 = row.insertCell(11);
            cell8.innerHTML = data.involved_driver_evidence;
            var cell9 = row.insertCell(12);
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

  // Options for penalty classification dropdown
const penaltyClassificationOptions = ['N/A', 'Minor', 'Moderate', 'Major', 'Severe', 'Unfair Game Penalty'];
// Create input elements for penalty classification
const penlaty_classificationInputDiv = createDropdown('Penalty Classification', 'penlaty_classification', penaltyClassificationOptions);

// Create input elements for offense
const offenseInputDiv = createInput('Offense', 'offense', 'Enter offense');

// Create input elements for details
const detailsInputDiv = createInput('Details', 'details', 'Enter details');

// Create input elements for penalty time
const penlaty_timeInputDiv = createInputTime('Penalty Time', 'penlaty_time', 'Enter penalty time in seconds');

// Use the function to create input elements for penalty positions
const penaltyPositionsInputDiv = createInput('Penalty Positions', 'penlaty_positions', 'Enter penalty positions');

// Use the function to create input elements for penalty points
const penaltyPointsInputDiv = createInput('Penalty Points', 'penlaty_points', 'Enter penalty points');

// Options for warning dropdown
const warningOptions = ['N/A', 'Yes'];
// Use the function to create input elements for warning
const warningInputDiv = createDropdown('Warning', 'warning', warningOptions);

const penalties = [
  'Time penalty (Seconds)',
  'Time penalty for next driver\'s race (Seconds)',
  'Position drop',
  'Grid position drop for the next driver\'s race',
  'Position drop for the next driver\'s race',
  'Qualification Ban',
  'Race Ban',
  'Event Ban',
  'Driver\'s championship points drop',
  'Team championship points drop',
  'Transfer to reserves',
  'Carryover penalty points to the next season',
  'Season ban',
  'League ban',
  'DSQ for the current/last session',
  'DSQ for the current/last event',
];
// Use the function to create input elements for penalty action
const penaltyActionInputDiv = createDropdown('Penalty Action', 'penlaty_action', penalties);

// Use the function to create input elements for penalty action value
const penaltyActionValueInputDiv = createInput('Penalty Action Value', 'penlaty_action_value', 'Enter penalty action value');

// Create a <div> element for the button container
const buttonContainerDiv = document.createElement('div');
buttonContainerDiv.className = 'text-center mt-4 pt-2';
buttonContainerDiv.id = 'button_container';

// Create a <button> element for the "Make a Decision" button
const reactIncidentButton = document.createElement('button');
reactIncidentButton.id = 'react_incident_button';
reactIncidentButton.type = 'button';
reactIncidentButton.className = 'btn btn-primary';
reactIncidentButton.textContent = 'Make a Decision';
reactIncidentButton.addEventListener('click', function() {
    // Define the behavior when the button is clicked
    decision_for_incident(id);
});

// Append the "Make a Decision" button to the button container <div>
buttonContainerDiv.appendChild(reactIncidentButton);
// Get the parent element where you want to append these elements
const parentElement = document.getElementById('decision'); // Replace 'parent_container' with the actual container ID or selector

// Append all input elements and button container to the parent element
parentElement.appendChild(penlaty_classificationInputDiv);
parentElement.appendChild(offenseInputDiv);
parentElement.appendChild(detailsInputDiv);
parentElement.appendChild(penlaty_timeInputDiv);

// Append the new input elements to the parent element
parentElement.appendChild(penaltyPositionsInputDiv);
parentElement.appendChild(penaltyPointsInputDiv);
parentElement.appendChild(warningInputDiv);
parentElement.appendChild(penaltyActionInputDiv);
parentElement.appendChild(penaltyActionValueInputDiv);
parentElement.appendChild(buttonContainerDiv);

const elementToRemove = document.getElementById('search_input'); // Replace 'elementId' with the actual ID of the element to remove
elementToRemove.remove();
}

function decision_for_incident(id)
{
    const penlaty_classification = document.getElementById('penlaty_classification').value;
    const offense = document.getElementById('offense').value;
    const details = document.getElementById('details').value;
    const penlaty_time = document.getElementById('penlaty_time').value;
    const penlaty_positions = document.getElementById('penlaty_positions').value;
    const penlaty_points = document.getElementById('penlaty_points').value;
    const warning = document.getElementById('warning').value;
    const penlaty_action = document.getElementById('penlaty_action').value;
    const penlaty_action_value = document.getElementById('penlaty_action_value').value;
    if(checkFields())
    {
      const incidentsRef = database.ref('incidents');
    incidentsRef.child(id).once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    if (data) {    
            // Define the fields and values you want to update
            const updates = {
                penlaty_classification : penlaty_classification,
                offense : offense,
                details : details,
                penlaty_time : penlaty_time,
                penlaty_positions : penlaty_positions,
                penlaty_points : penlaty_points,
                warning : warning,
                penlaty_action : penlaty_action,
                penlaty_action_value : penlaty_action_value,
                status : "closed",
            };
              // Update the specified fields within the data at the location
              incidentsRef.child(id).update(updates)
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
    else
    {
      alert("check all fields are complete");
    }
}

// Create a function to generate label and input elements
function createInput(labelText, inputId, inputPlaceholder) {
  const inputDiv = document.createElement('div');
  inputDiv.className = 'form-outline mb-3';

  const inputLabel = document.createElement('label');
  inputLabel.className = 'form-label';
  inputLabel.setAttribute('for', inputId);
  inputLabel.style.float = 'left';
  inputLabel.textContent = labelText;

  const input = document.createElement('input');
  input.type = 'text';
  input.id = inputId;
  input.className = 'form-control';
  input.placeholder = inputPlaceholder;
  input.setAttribute('aria-label', '');

  inputDiv.appendChild(inputLabel);
  inputDiv.appendChild(input);

  return inputDiv;
}

function createInputTime(labelText, inputId, inputPlaceholder) {
  const inputDiv = document.createElement('div');
  inputDiv.className = 'form-outline mb-3';

  const inputLabel = document.createElement('label');
  inputLabel.className = 'form-label';
  inputLabel.setAttribute('for', inputId);
  inputLabel.style.float = 'left';
  inputLabel.textContent = labelText;

  const input = document.createElement('input');
  input.type = 'number';
  input.id = inputId;
  input.className = 'form-control';
  input.placeholder = inputPlaceholder;
  input.setAttribute('aria-label', '');
  input.setAttribute('min', '1'); 

  inputDiv.appendChild(inputLabel);
  inputDiv.appendChild(input);

  return inputDiv;
}

function createDropdown(labelText, selectId, options) {
  const dropdownDiv = document.createElement('div');
  dropdownDiv.className = 'form-outline mb-3';

  const dropdownLabel = document.createElement('label');
  dropdownLabel.className = 'form-label';
  dropdownLabel.setAttribute('for', selectId);
  dropdownLabel.style.float = 'left';
  dropdownLabel.textContent = labelText;

  const dropdown = document.createElement('select');
  dropdown.id = selectId;
  dropdown.className = 'form-select';
  dropdown.setAttribute('aria-label', '');

  // Add options to the dropdown
  options.forEach((optionText) => {
    const option = document.createElement('option');
    option.value = optionText;
    option.text = optionText;
    dropdown.appendChild(option);
  });

  dropdownDiv.appendChild(dropdownLabel);
  dropdownDiv.appendChild(dropdown);

  return dropdownDiv;
}

function checkFields()
{
  const penlaty_classification = document.getElementById('penlaty_classification').value;
    const offense = document.getElementById('offense').value;
    const details = document.getElementById('details').value;
    const warning = document.getElementById('warning').value;
    const penlaty_action = document.getElementById('penlaty_action').value;
    const penlaty_action_value = document.getElementById('penlaty_action_value').value;
    if(penlaty_classification == "" || offense == "" || details == "" || warning == "" || penlaty_action == "" || penlaty_action_value == "")
      return false;
    return true;
}