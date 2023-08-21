var lang1 = "";
var lang2 = "";
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    // User is signed in.
    // Get the current user's UID
    const user_uid = user.uid;
    // Create a reference to the "users" node in the database
    const usersRef = database.ref("users");
    const userQuery = usersRef.orderByChild("uid").equalTo(user_uid);
    userQuery.once("value", snapshot => {
        snapshot.forEach(userSnapshot => {
            const user = userSnapshot.val();
            lang1 = dict[user.language_heard];
            lang2 = dict[user.language_write];
        });
    });

} else {
    // No user is signed in.
    //alert("user not logged in1 ")
    window.location.href = "index.html"
}
});

function speak() {
    var text = document.getElementById('text-input').value;
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ lang2 + "&tl=" + lang1 + "&dt=t&q=" + encodeURI(text);
    //console.log(url);
    $.getJSON(url, function(data) {
        translatedText = (data[0][0][0]);
        // Create a new SpeechSynthesisUtterance instance
        var utterance = new SpeechSynthesisUtterance(translatedText);
    
        // Optionally, set the speech language (default is based on user's browser settings)
        utterance.lang = lang1;
    
        // Speak the text
        speechSynthesis.speak(utterance);
        setTimeout(()=>{document.getElementById('text-input').value="";}, 5000)

      });
  }