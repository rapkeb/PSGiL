function check_password()
{
    var password = document.getElementById("password").value;
    if(password.length < 6)
    {
        alert("password should be at least 6 characters")
        return false;
    }
    return true;
}

function check_full_name()
{
    var full_name = document.getElementById("full_name").value;
    if(full_name.length < 4)
    {
        alert("full name should be at least 4 characters")
        return false;
    }
    return true;
}

function check_email()
{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email = document.getElementById("email").value;
    if (email.match(validRegex)) 
    {
        return true;
    } 
    else 
    {
        alert("Invalid email address!");
        return false;
  }
}

function check_incident()
{
    return check_league_race() && check_lap() && check_evidence() && check_description();
}

function check_league_race()
{
    var lr = document.getElementById("league_race").value;
    if(lr.length < 1)
    {
        alert("league race is empty")
        return false;
    }
    return true;
}

function check_lap()
{
    var st = document.getElementById("session_type").value;
    var lap = document.getElementById("lap").value;
    if(lap < 0 || (lap == "" && st != "quali"))
    {
        alert("lap is empty or less than 0")
        return false;
    }
    return true;
}

function check_evidence() {
    var evidence = document.getElementById("evidence").value;
    try {
      new URL(evidence);
      return true;
    } catch (err) {
        alert("url is invalid")
      return false;
    }
  }

function check_description()
{
    var description = document.getElementById("text-input").value;
    if(description.length < 1)
    {
        alert("description is empty")
        return false;
    }
    return true;
}