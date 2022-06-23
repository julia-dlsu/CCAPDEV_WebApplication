// checks if 2 pass
function checkPasswords() {
    var valid = false;

    var pass1 = document.forms["changePassword"]["newpass"].value;
    var pass2 = document.forms["changePassword"]["repass"].value;
    var pass3 = document.forms["changePassword"]["curpass"].value;

    if (pass1 != pass2 || pass1 == "" || pass2 == ""){
        document.forms["changePassword"]["newpass"].style.backgroundColor = "red";
        document.forms["changePassword"]["repass"].style.backgroundColor = "red";
    }
    if (pass3 == "" || pass3 != "Ccapdev") {
        document.forms["changePassword"]["curpass"].style.backgroundColor = "red";
    }

    if (pass1 == pass2 && pass3 != "" && pass3 == "Ccapdev") {
        valid = true;
    }

    return valid;
}