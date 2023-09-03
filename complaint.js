const usersRef = database.ref('users');
const involved_driver = document.getElementById("involved_driver");
const other_drivers = document.getElementById("other_drivers");

usersRef.once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach((key) => {
        const full_name = data[key].full_name;
        console.log('User Age:', full_name);
        option = document.createElement("option");
        option1 = document.createElement("option");
        option.value= full_name;
        option.text= full_name;
        option1.value= full_name;
        option1.text= full_name;
        involved_driver.add(option);
        other_drivers.add(option1);
      });
    }
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });