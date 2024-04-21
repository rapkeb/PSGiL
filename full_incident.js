// Assuming the URL is something like: http://example.com/page?param1=value1&param2=value2
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'param1' parameter
const incidentId = urlParams.get('key');
document.getElementById("title").innerHTML = incidentId.substring(1);

const incidentsRef = database.ref('incidents');
const incidents = document.getElementById("incidents");
const reaction = document.getElementById("reaction");
const decision = document.getElementById("decision");

incidentsRef.child(incidentId).once('value')
.then((snapshot) => {
  const data = snapshot.val();
  if (data) {
    var row = incidents.insertRow();
    var cell14 = row.insertCell(0);
    cell14.innerHTML = data.category;
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
    cell7.innerHTML = '<a href="' + data.evidence + '" target="_blank">evidence</a>';
    var cell8 = row.insertCell(9);
    cell8.innerHTML = '<a href="' + data.evidence2 + '" target="_blank">evidence2</a>';
   
    var row1 = reaction.insertRow();
    var cell20 = row1.insertCell(0);
    cell20.innerHTML = data.involved_driver_react;
    var cell21 = row1.insertCell(1); 
    cell21.innerHTML = '<a href="' + data.involved_driver_evidence + '" target="_blank">involved_driver_evidence</a>';

    var row2 = decision.insertRow();
    var cell30 = row2.insertCell(0);
    cell30.innerHTML = data.penlaty_classification;
    var cell31 = row2.insertCell(1);
    cell31.innerHTML = data.offense;  
    var cell32 = row2.insertCell(2);
    cell32.innerHTML = data.details;
    var cell33 = row2.insertCell(3);
    cell33.innerHTML = data.penlaty_time;  
    var cell34 = row2.insertCell(4);
    cell34.innerHTML = data.penlaty_positions;
    var cell35 = row2.insertCell(5);
    cell35.innerHTML = data.penlaty_points;  
    var cell36 = row2.insertCell(6);
    cell36.innerHTML = data.warning;
    var cell37 = row2.insertCell(7);
    cell37.innerHTML = data.penlaty_action; 
    var cell38 = row2.insertCell(8);
    cell38.innerHTML = data.penlaty_action_value; 
    var cell39 = row2.insertCell(9);
    cell39.innerHTML = data.status; 
  }
})
.catch((error) => {
  console.error('Error reading data:', error);
});
 