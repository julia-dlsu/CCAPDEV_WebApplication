$(document).ready(function() {
    // checks if all fields are filled up
    $('#submit').click(function() {
        // get data from form
        var cp = $('#curpass').val();
        var np = $('#newpass').val();
        var rp = $('#repass').val();

        console.log("curpass ", cp);

        if (cp == "" || np == "" || rp == ""){
            // error message
            $('#error').text("Fill up all fields.");
        }
        else if (np != rp){
            $('#newpass').css("background-color", "red");
            $('#repass').css("background-color", "red");
            $('#error').text("Entered passwords do not match.");
        }
        // TODO: check if password matches user in DB
        else {
            // TODO: password update in DB

            // reset form field values
            $('#curpass').val('');
            $('#newpass').val('');
            $('#repass').val('');

            // reset form field colors
            $('#newpass').css("background-color", "white");
            $('#repass').css("background-color", "white");

            $('#error').text('');
        }
    });
});