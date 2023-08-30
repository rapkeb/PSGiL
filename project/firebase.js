
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJSeaAUPgqnulJ7tyFkcqq1pPXkvtIzJA",
  authDomain: "psgil-18ea2.firebaseapp.com",
  databaseURL: "https://psgil-18ea2-default-rtdb.firebaseio.com",
  projectId: "psgil-18ea2",
  storageBucket: "psgil-18ea2.appspot.com",
  messagingSenderId: "519001893675",
  appId: "1:519001893675:web:65fe96dd41febcb16fb36e",
  measurementId: "G-DDD86L6JWN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

function register()
{
     // Get all our input fields
     let email = document.getElementById('email').value
     let password = document.getElementById('password').value
     let full_name = document.getElementById('full_name').value

     auth.createUserWithEmailAndPassword(email, password).then(() => {
    // User account created successfully
    const user = auth.currentUser;
    console.log('User created:', user);
    var user_data = {
        email : email,
        full_name : full_name,
        uid : user.uid,
        approved : false,
        admin : false,
        }
        database.ref('users').push(user_data)
            .then(function() {
                //alert('User created and data added to the database!');
                window.location.href = "index.html";
            })
            .catch(function(error) {
                alert(error.message);
            });
  })
  .catch((error) => {
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error creating user:', errorMessage);
  });
}

// Set up our login function
function login () {
    // Get all our input fields
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser

            //alert('User Logged In!!')
            window.location.href = "home.html"

        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            // var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })

}

function logOut(){
    auth.signOut().then(function() {
        // Sign-out successful.
        //alert("the user is signed out")
        window.location.href = "index.html"
    }).catch(function(error) {
        // An error happened.
        alert(error.message)
    });

}

function add_incident()
{
    // Get all our input fields
    let league_race = document.getElementById('league_race').value
    let involved_driver = document.getElementById('involved_driver').value
    let other_drivers = document.getElementById('other_drivers').value
    let session_type = document.getElementById('session_type').value
    let lap = document.getElementById('lap').value
    let evidence = document.getElementById('evidence').value
    let description = document.getElementById('text-input').value
    let fullName = ""

    const usersRef = database.ref('users');

if (auth.currentUser) {
  usersRef.child(auth.currentUser.uid).once('value')
    .then((snapshot) => {
      const userData = snapshot.val();
    //   fullName = userData.full_name;
      console.log('User Full Name:', userData);
    })
    .catch((error) => {
      console.error('Error getting user data:', error);
    });
}
    var incident_data = {
        league_race : league_race,
        created_driver : full_name,
        involved_driver : involved_driver,
        other_drivers : other_drivers,
        session_type : session_type,
        lap : lap,
        evidence : evidence,
        description : description,
        judge_decision : "",
        status : "in progress",
        }
        database.ref('incidents').push(incident_data)
            .then(function() {
                //alert('User created and data added to the database!');
                window.location.href = "home.html";
            })
            .catch(function(error) {
                alert(error.message);
            });
}