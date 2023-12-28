const incidentsRef = database.ref('incidents');
const incidents = document.getElementById("incidents");

incidentsRef.once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach((key) => {
        var row = incidents.insertRow();
        var cell13 = row.insertCell(0);
        cell13.innerHTML = key.substring(1);;
        var cell14 = row.insertCell(1);
        cell14.innerHTML = data[key].category;
        var cell1 = row.insertCell(2);
        cell1.innerHTML = data[key].league_race;
        var cell11 = row.insertCell(3);
        cell11.innerHTML = data[key].created_driver;
        var cell2 = row.insertCell(4);
        cell2.innerHTML = data[key].involved_driver;
        var cell3 = row.insertCell(5);
        cell3.innerHTML = data[key].other_drivers;
        var cell4 = row.insertCell(6);
        cell4.innerHTML = data[key].session_type;
        var cell5 = row.insertCell(7);
        cell5.innerHTML = data[key].lap;
        var cell6 = row.insertCell(8);
        cell6.innerHTML = data[key].description;
        var cell7 = row.insertCell(9);
        cell7.innerHTML = '<a href="' + data[key].evidence + '" target="_blank">evidence</a>';
        var cell8 = row.insertCell(10);
        cell8.innerHTML = '<a href="' + data[key].evidence2 + '" target="_blank">evidence2</a>';  
      });
    }
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });