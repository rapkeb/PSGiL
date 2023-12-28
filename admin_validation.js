// Set up an observer for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const usersRef = database.ref('users');
        usersRef.once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            let admin = false;
            if (data) {
            Object.keys(data).forEach((key) => {
                const email = data[key].email;
                if(email == user.email)
                {
                    admin = data[key].admin;
                }
            });
            if(admin == false)
            {
                // user not approved
                window.location.href = "home.html";
                alert('user is not an admin.');
            }
            }
        })
        .catch((error) => {
            console.error('Error reading data:', error);
        });
    } else {
      // No user is logged in
        window.location.href = "index.html";
    }
  });