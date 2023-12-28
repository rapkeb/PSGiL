const racesRef = database.ref('races');
const races = document.getElementById("races");
racesRef.once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach((key) => {
        const raceName = data[key].raceName;
        tr = document.createElement("tr");
        const cell1 = document.createElement('td');
        cell1.textContent = raceName; // Set content for the first cell
        tr.appendChild(cell1); // Append the first cell to the row
        const cell3 = document.createElement('td');
        // Create a button element
        const button = document.createElement('button');
        button.textContent = 'delete'; // Set the button text
        // Add a click event listener to the button
        button.addEventListener('click', function() {
            // Define the behavior when the button is clicked
            deleteRace(raceName);
        });
        cell3.appendChild(button); // Set content for the second cell
        tr.appendChild(cell3); // Append the second cell to the row
        races.appendChild(tr); // Append the new row to the table
      });
    }
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });

  function deleteRace(raceName) {
    racesRef.once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((key) => {
            if (data[key].raceName === raceName) {
              // Remove the race entry at the specified key
              racesRef.child(key).remove()
                .then(() => {
                  alert(raceName + ' successfully deleted!');
                  window.location.href = "races.html";
                })
                .catch((error) => {
                  console.error('Error deleting data:', error);
                });
            }
          });
        }
      })
      .catch((error) => {
        console.error('Error reading data:', error);
      });
  }

  function check_raceName()
{
    var raceName = document.getElementById("race_name").value;
    if(raceName.length < 2)
    {
        alert("race name is too short")
        return false;
    }
    return true;
}

function add_race1()
{
    let raceName = document.getElementById("race_name").value;
    const racesRef = database.ref('races');
    var race_data = {
      raceName : raceName,
      }
      racesRef.push(race_data)
          .then(function() {
              window.location.href = "races.html";
              alert("race was added successfully");
          })
          .catch(function(error) {
              alert(error.message);
          });
}