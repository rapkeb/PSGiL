// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9qhyII7_bfDx-rXUqYlrvTCLlG7Mc6mM",
    authDomain: "project-ete-fbaa9.firebaseapp.com",
    databaseURL: "https://project-ete-fbaa9-default-rtdb.firebaseio.com",
    projectId: "project-ete-fbaa9",
    storageBucket: "project-ete-fbaa9.appspot.com",
    messagingSenderId: "633078867047",
    appId: "1:633078867047:web:0ab6e03fce2012708ea0c2",
    measurementId: "G-S6SQHRFS7K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
    // Get all our input fields
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let full_name = document.getElementById('full_name').value
    if (validate_field(full_name) === false) {
            alert('please enter your full name!!')
            return}
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser
            var user_data = {
                email : email,
                full_name : full_name,
                uid : user.uid,
                language_heard: 'en-AU,Australia',
                language_write : 'en-AU,Australia',
                mode: "home",
                text_size : 12,
                text_font : "Ariel",
                text_color : "White",
                text_location : "top",
                text_display : "flashes",
            }
            database.ref('users').push(user_data)
                .then(function() {
                    //alert('User created and data added to the database!');
                    window.location.href = "home.html";
                })
                .catch(function(error) {
                    alert(error.message);
                });
        })
        .catch(function(error) {
            alert(error.message)
        })
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

function validate_field(field) {
    if (field == null) {
        return false
    }

    return field.length > 0;
}

function saveLangSettings () {

}

// function saveLangSettings(message){
//     let lng_write = document.getElementById('lng-write').value
//     let lng_hear = document.getElementById('lng-hear').value
//     auth.onAuthStateChanged((user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/firebase.User
//             const usersRef = database.ref('users');
//             usersRef.orderByChild('uid').equalTo(user.uid).once('value')
//                 .then((snapshot) => {
//                     // Loop through the snapshot of matching users
//                     snapshot.forEach((userSnapshot) => {
//                         // Get a reference to the current user's data
//                         const userRef = userSnapshot.ref;
//
//                         // Update the user's name
//                         userRef.update({ language_heard: lng_hear,
//                                          language_write: lng_write })
//                             .then(() => {
//                                 alert('User information updated successfully');
//                             })
//                             .catch((error) => {
//                                 alert('Error updating user information: '+ error.message);
//                             });
//                     });
//                 })
//                 .catch((error) => {
//                     alert('Error updating user information: '+ error.message);
//                 });
//
//             // ...
//         } else {
//             // User is signed out
//             // ...
//             alert("user is logged out")
//         }
//     });
// }
//
// function getLanguageSettings(userId) {
//     alert('hi')
//     auth.onAuthStateChanged((user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             var languageRef = database.ref('users').orderByChild('uid').equalTo(user.uid).limitToLast(1);
//             languageRef.on('value', function(snapshot) {
//                 var languageData = snapshot.val();
//                 if (languageData) {
//                     // Populate language selection fields with saved values
//                     document.getElementById('lng-hear').value = languageData.language_heard;
//                     document.getElementById('lng-write').value = languageData.language_write;
//                 }
//             });
//
//             // ...
//         } else {
//             // User is signed out
//             // ...
//             alert("user is logged out")
//         }
//     });
// }
