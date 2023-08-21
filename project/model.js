// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

const microphone_button = document.querySelector('#microphone_button');
const text_area = document.querySelector('#text_area');
const symbol = document.querySelector('#symbol');

const symbols_to_fas_of_home = ["fa-baby", "", "fa-clock", "fa-door-open", "fa-fire", "fa-wine-glass", "fa-cloud-rain", "fa-bed", "fa-snowplow", "fa-hard-drive"];
const symbols_home_animation = ["fa-bounce", "", "fa-shake", "fa-bounce", "fa-beat", "fa-shake", "", "", "fa-fade", "fa-spin-reverse"];

const symbols_to_fas_of_outdoor = ["", "fa-car", "fa-bell", "fa-cow", "fa-dog", "fa-gun", "fa-helicopter", "fa-water", "fa-volume-off", "fa-train"];
const symbols_outdoor_animation = ["", "fa-beat-fade", "fa-shake", "fa-beat", "fa-beat", "fa-fade", "fa-flip", "fa-beat", "fa-flip", "fa-beat-fade"];

const symbols_to_fas_of_work = ["", "fa-hands-clapping", "fa-mask-face", "fa-shoe-prints", "fa-keyboard", "fa-face-grin-squint-tears", "fa-glass-water-droplet", "fa-toilet-paper", "fa-cloud-meatball"];
const symbols_work_animation = ["", "fa-fade", "", "fa-beat", "fa-spin", "fa-fade", "fa-fade", "fa-spin", "fa-fade", "fa-beat-fade"];

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var lang1 = "";
var lang2 = "";
var realSize = "";
var realFont = "";
var realMode = "";
var realColor = "";
var realLocation = "";
var realDisplay = "";
var recognition_on = true;

// the link to your model provided by Teachable Machine export panel
const URL_HOME = "https://teachablemachine.withgoogle.com/models/eNZBwWr8h/";

// the link to your model provided by Teachable Machine export panel
const URL_OUTDOOR = "https://teachablemachine.withgoogle.com/models/bhRiCyLnC/";

// the link to your model provided by Teachable Machine export panel
const URL_WORK = "https://teachablemachine.withgoogle.com/models/JEB8Xy64R/";

async function createModel(URL) {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}

async function init() {
    const recognizer_home = await createModel(URL_HOME);
    const classLabels_home = recognizer_home.wordLabels(); // get class labels

    const recognizer_outdoor = await createModel(URL_OUTDOOR);
    const classLabels_outdoor = recognizer_outdoor.wordLabels(); // get class labels

    const recognizer_work = await createModel(URL_WORK);
    const classLabels_work = recognizer_work.wordLabels(); // get class labels

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer_home.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        if(realMode == "home")
        {
            // render the probability scores per class
            for (let i = 0; i < classLabels_home.length; i++) {
                if(scores[i].toFixed(2) > 0.97)
                {
                    if(classLabels_home[i] != "Background Noise")
                    {
                        document.getElementById("symbol").innerHTML = "  " + classLabels_home[i];
                    }
                    symbol.classList = "";
                    symbol.classList.add("fa");
                    if(symbols_to_fas_of_home[i] != "")
                    {
                        symbol.classList.add(symbols_to_fas_of_home[i]);
                    }
                    if(symbols_home_animation[i] != "")
                    {
                        symbol.classList.add(symbols_home_animation[i]);
                    }
                    setTimeout(cleanSymbol, 5000);
                }
            }
        }
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.9,
        invokeCallbackOnNoiseAndUnknown: false,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });

    //listen() takes two arguments:
    //1. A callback function that is invoked anytime a word is recognized.
    //2. A configuration object with adjustable fields
    recognizer_outdoor.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        if(realMode == "outdoor")
        {
            // render the probability scores per class
            for (let i = 0; i < classLabels_outdoor.length; i++) {
                if(scores[i].toFixed(2) > 0.97)
                {
                    //(classLabels_outdoor[i])
                    if(classLabels_outdoor[i] != "Background Noise")
                    {
                        document.getElementById("symbol").innerHTML = "  " + classLabels_outdoor[i];
                    }
                    symbol.classList = "";
                    symbol.classList.add("fa");
                    if(symbols_to_fas_of_outdoor[i] != "")
                    {
                        symbol.classList.add(symbols_to_fas_of_outdoor[i]);
                    }
                    if(symbols_outdoor_animation[i] != "")
                    {
                        symbol.classList.add(symbols_outdoor_animation[i]);
                    }
                    setTimeout(cleanSymbol, 5000);
                }
            }
        }
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.9,
        invokeCallbackOnNoiseAndUnknown: false,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });

    //listen() takes two arguments:
    //1. A callback function that is invoked anytime a word is recognized.
    //2. A configuration object with adjustable fields
    recognizer_work.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        if(realMode == "work")
        {
            // render the probability scores per class
            for (let i = 0; i < classLabels_work.length; i++) {
                if(scores[i].toFixed(2) > 0.97)
                {
                    if(classLabels_work[i] != "Background Noise")
                    {
                        document.getElementById("symbol").innerHTML = "  " + classLabels_work[i];
                    }
                    symbol.classList = "";
                    symbol.classList.add("fa");
                    if(symbols_to_fas_of_work[i] != "")
                    {
                        symbol.classList.add(symbols_to_fas_of_work[i]);
                    }
                    if(symbols_work_animation[i] != "")
                    {
                        symbol.classList.add(symbols_work_animation[i]);
                    }
                    setTimeout(cleanSymbol, 5000);
                }
            }
        }
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.9,
        invokeCallbackOnNoiseAndUnknown: false,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });

    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
}

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
                const lng_heard = user.language_heard;
                const lng_write = user.language_write;
                const size = user.text_size;
                const font = user.text_font;
                const mode = user.mode;
                const color = user.text_color;
                const location = user.text_location;
                const display = user.text_display;
                lang1 = lng_heard;
                lang2 = lng_write;
                realSize = size;
                realFont = font;
                realMode = mode;
                recognition.lang = lng_heard;
                realColor = color;
                realLocation = location;
                realDisplay = display;
                definProperties();
                translate("Please make sure that you have accepted the microphone permission", "en", dict[lang2])
                tap();
            });
        });

    } else {
        // No user is signed in.
        //alert("user not logged in1 ")
        window.location.href = "index.html"
    }
});

function runSpeechRecognition() {
    // new speech recognition object
    // var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    // var recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    // The language by which words are recognized
    //recognition.lang = lang;

    recognition.addEventListener("end", () => {
        recognition.start();
    });

//    let timer;
    // This runs when the speech recognition service returns result
    recognition.onresult = function (event) {
        let result = '';
//        clearTimeout(timer); // Clear the previous timer
        for (let i = event.resultIndex; i < event.results.length; i++) {
            result += event.results[i][0].transcript;
        }
        if(recognition_on == true)
        {
            if(lang1 == lang2)
            {
                text_area.innerHTML = result;
            }
            else
            {
                translate(result, dict[lang1], dict[lang2]);
            }
        }
        check_for_stop_or_start(result, dict[lang1], "iw");
        // Start the timer to clear text_area.innerHTML after 1 second
//        if(isiPhone()) {
//            if(realDisplay == 'flashes'){
//                timer = setTimeout(function() {
//                    text_area.innerHTML = '';
//                    result = '';
//                    recognition.stop();
//                }, 4000);
//            }
//        }
      };

    // start recognition
    recognition.start();
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

// Check if the device is an iPhone
function isiPhone() {
  return /iPhone/i.test(navigator.userAgent);
}

function tap()
{
    runSpeechRecognition();
    if(isAndroid()){
        setTimeout(() => {
        init();
        }, 30000);
    }
    else {
        init();
    }
}

function translate(text, sourceLang, targetLang){

    var sourceText = text;
//    var sourceLang = dict[lang1];
//    var targetLang = dict[lang2];

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    //console.log(url);

    $.getJSON(url, function(data) {
        translatedText = (data[0][0][0]);
        text_area.innerHTML = translatedText;
      });

}

function check_for_stop_or_start(text, sourceLang, targetLang){
    var sourceText = text;
//    var sourceLang = dict[lang1];
//    var targetLang = dict[lang2];

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    //console.log(url);

    $.getJSON(url, function(data) {
        result = (data[0][0][0]);
        if (result.toLowerCase().endsWith('בבקשה תתחיל')) {
            result = "";
            text_area.innerHTML = "";
            recognition.stop();
            recognition_on = true;
        }
        if (result.toLowerCase().endsWith('בבקשה תפסיק')) {
            recognition_on = false;
            text_area.innerHTML = '';
        }
      });
  
}

function definProperties(){
    var text = document.getElementById('text_area');
    if(realSize <= 10)
        text.style.fontSize = '200%';
    else if(realSize <= 16)
        text.style.fontSize = '250%';
    else if(realSize <= 22)
        text.style.fontSize = '300%';
    else if(realSize <= 28)
        text.style.fontSize = '350%';
    else if(realSize <= 32)
        text.style.fontSize = '400%';
    text.style.fontFamily = realFont;
    text.style.color = realColor;
    if(realLocation == "top")
        text.style.marginTop = "0%";
    else if(realLocation == "center")
        text.style.marginTop = "15%";
    else if(realLocation == "down")
        text.style.marginTop = "30%";
}

function cleanSymbol(){
    symbol.classList = "";
    symbol.innerHTML = "";
}

//microphone_button.addEventListener('click', tap());
//tap();