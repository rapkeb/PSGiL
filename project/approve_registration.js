const usersRef = database.ref('users');
const customers = document.getElementById("customers");
usersRef.once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach((key) => {
        if(data[key].approved == false)
        {
            alert("yes")
            const email = data[key].email;
            const full_name = data[key].full_name;
            tr = document.createElement("tr");
            const cell1 = document.createElement('td');
            cell1.textContent = email; // Set content for the first cell
            tr.appendChild(cell1); // Append the first cell to the row
            const cell2 = document.createElement('td');
            cell2.textContent = full_name; // Set content for the second cell
            tr.appendChild(cell2); // Append the second cell to the row
            const cell3 = document.createElement('td');
            // Create a button element
            const button = document.createElement('button');
            button.textContent = 'approve'; // Set the button text
            // Add a click event listener to the button
            button.addEventListener('click', function() {
                // Define the behavior when the button is clicked
                approve_user(email);
            });
            cell3.appendChild(button); // Set content for the second cell
            tr.appendChild(cell3); // Append the second cell to the row
            customers.appendChild(tr); // Append the new row to the table
        }
      });
    }
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });

  function approve_user(email)
  {
    usersRef.once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach((key) => {
        if(data[key].email == email && data[key].approved == false)
        {     
            // Define the fields and values you want to update
            const updates = {
                approved : true,
            };
              // Update the specified fields within the data at the location
              usersRef.child(key).update(updates)
                .then(() => {
                  console.log('Data successfully updated!');
                })
                .catch((error) => {
                  console.error('Error updating data:', error);
                });
        }
      });
    }
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });
  }