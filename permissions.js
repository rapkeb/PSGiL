// Set up an observer for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      console.log('User is logged in:', user);
      const usersRef = database.ref('users');

        usersRef.once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            let found = false;
            let admin = false;
            if (data) {
            Object.keys(data).forEach((key) => {
                const email = data[key].email;
                const approved = data[key].approved;
                if(email == user.email && approved == true)
                {
                    found = true;
                    admin = data[key].admin;
                }
            });
            if(found == false)
            {
                // user not approved
                window.location.href = "index.html";
                alert('user not approved yet.');
            }
            else
            {
                make_menu(admin);
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

  function make_menu(admin)
  {
                // Create the <img> element
        const logoImage = document.createElement('img');
        logoImage.id = 'logo';
        logoImage.src = 'images/Logo.jpeg';
        let links = '';

        // Create an array of links and their attributes
        const links1 = [
        { text: 'Home', href: 'home.html' },
        { text: 'Make an incident', href: 'complaint.html' },
        { text: 'All incidents', href: 'all_incidents.html' },
        { text: 'React on incident', href: 'react.html' },
        { text: 'Sign out', href: '#', onclick: 'logOut()' }
        ];

        const links2 = [
            { text: 'Home', href: 'home.html' },
            { text: 'Make an incident', href: 'complaint.html' },
            { text: 'All incidents', href: 'all_incidents.html' },
            { text: 'React on incident', href: 'react.html' },
            { text: 'Judge an incident', href: 'judge_decision.html' },
            { text: 'Races', href: 'races.html' },
            { text: 'Approve registration', href: 'approve_registration.html' },
            { text: 'Sign out', href: '#', onclick: 'logOut()' }
            ];

        if(admin == true)
        {
            links = links2;
        }
        else
        {
            links = links1;
        }

                // Create and append the <a> elements with the 'active' handling
        const linkContainer = document.getElementById('navbar'); // Replace 'yourLinkContainer' with the ID of the container where you want to append the links
        const currentLocation = window.location.href; // Get the current page's path
        links.forEach((linkInfo) => {
        const linkElement = document.createElement('a');
        linkElement.textContent = linkInfo.text;
        linkElement.href = linkInfo.href;
        if (linkInfo.className) {
            linkElement.className = linkInfo.className;
        }
        if (linkInfo.onclick) {
            linkElement.setAttribute('onclick', linkInfo.onclick);
        }

        // Check if the link's href matches the current page's path
        if (linkElement.href === currentLocation) {
            linkElement.classList.add('active');
        }

        linkContainer.appendChild(linkElement);
        });

        // Append the <img> element
        const logoContainer = document.getElementById('navbar'); // Replace 'yourLogoContainer' with the ID of the container where you want to append the logo
        logoContainer.appendChild(logoImage);
  }