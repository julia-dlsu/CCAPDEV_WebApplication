$(document).ready(function() {
    // to delete a favorited item
    $('#favorites-container').on('click', '.remove', function () {
        // get the card to delete
        var toDelete = this.parentNode.parentNode.parentNode;
        // get the name of the item to be deleted
        var name = $(this).parent().prev().children().children().html();
        
        var newDel = { name: name };
        console.log(newDel);

        // remove the transaction from the database
        $.get('/delete-favorite', newDel, function(data, status) {
            console.log("data: ", data);
            console.log("status: ", status);

            // removes the card whose button is clicked
            toDelete.remove();
        });
    });
});