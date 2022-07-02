$(document).ready(async function () {

    const container = $('#inventory-container')
    $('#add-item-form').submit(async function (e) {
        e.preventDefault()
        const files = $('#image').prop('files')[0]
        const formData = new FormData()

        formData.append('name', $("#name").val())
        formData.append('description', $("#description").val())
        formData.append('category', $("#category").val())
        formData.append('qty', $("#qty").val())
        formData.append('img', files)
        
        const response = await fetch("/inventory/add-item", {
            method: 'POST',
            body: formData
        })
        container.append(await response.text())
        $("#name").val("");
        $("#description").val("");
        $("#category").val("");
        $("#qty").val("");
        $("#image").val("");
        $('#add-item-modal').modal('hide');
    })

    $('#update-item-form').submit(async function(e){
        e.preventDefault()
        const files = $('#image').prop('files')[0]
        const formData = new FormData()

        formData.append('name', $("#name").val())
        formData.append('description', $("#description").val())
        formData.append('category', $("#category").val())
        formData.append('qty', $("#qty").val())
        formData.append('img', files)
        
        const response = await fetch("/inventory/update", {
            method: 'POST',
            body: formData
        })

        $("#description").val("");
        $("#category").val("");
        $("#qty").val("");
        $("#image").val("");
        $('#myModal').modal('hide');
        location.href = "/inventory";
    })

    $('#inventory-container').on('click', '.remove', function () {
        // get the card to delete
        var toDelete = this.parentNode.parentNode.parentNode.parentNode;
        // get the name of the item to be deleted
        var name = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        
        var newDel = { name: name };
        console.log(newDel);
        console.log(toDelete)

        // remove the transaction from the database
        $.get('/inventory/delete', newDel, function(data, status) {
            console.log("status: ", status);

            // removes the card whose button is clicked
            toDelete.remove();
        });
    })

    $('#inventory-container').on('click', '.favorite', function () {
        
        const refno = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        $.get('/inventory/add-favorite', {refno}, async function (result) {
            if(result)
                console.log('favorites function has been executed.');
        })
    })

    $('#inventory-container').on('click', '.shopping-list', function () {
        const refno = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        $.get('/inventory/add-shopping-list', {refno}, async function (result) {
            if(result)
                console.log('Shopping list function has been executed.');
        })
    })
    
})