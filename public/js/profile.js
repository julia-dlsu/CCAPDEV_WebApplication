$(document).ready(function() {
    // for password update
    $('#submit').click(function() {
        // get data from form
        var cp = $('#curpass').val();
        var np = $('#newpass').val();
        var rp = $('#repass').val();

        if (cp == "" || np == "" || rp == ""){
            // error message
            $('#error').text("Fill up all fields.");
        }
        else if (np.length < 8 || rp.length < 8) {
            $('#newpass').css("background-color", "red");
            $('#repass').css("background-color", "red");
            $('#error').text("Password has less than 8 characters.");
        }
        else if (np != rp){
            $('#newpass').css("background-color", "red");
            $('#repass').css("background-color", "red");
            $('#error').text("Entered passwords do not match.");
        }
        else {
            // TODO: check if password matches user pass in DB
            const pass = {currpass: cp};

            $.post('/check-pass', pass, function(data) {
                if (!data) { // password is incorrect
                    $('#curpass').css("background-color", "red");
                    $('#error').text('Incorrect password');
                }
                else {
                    changePassword();
                }
            });
            
            function changePassword(){
                $.post('/change-pass', {newpass: np}, function() {
                    // reset form field values
                    $('#curpass').val('');
                    $('#newpass').val('');
                    $('#repass').val('');
    
                    // reset form field colors
                    $('#newpass').css("background-color", "white");
                    $('#repass').css("background-color", "white");
    
                    $('#error').text('Password updated!');
                });
            }
        }
    });
    
});