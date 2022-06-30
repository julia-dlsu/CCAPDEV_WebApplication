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
        
        const response = await fetch("/add-item", {
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

    $('#inventory-container').on('click', '.remove', function () {
        const refno = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        const topParent = this.parentElement.parentElement.parentElement.parentElement;
        $.get('/delete', { refno }, function (result) {
            if (result) {
                topParent.remove();
            }
        })
    })

    $('#inventory-container').on('click', '.favorite', function () {
        alert('Item has been added to favorites!')
        const refno = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        $.get('/add-favorite', {refno}, async function (result) {
            if(result)
                console.log('favorites function has been executed.');
        })
    })
    $('#inventory-container').on('click', '.shopping-list', function () {
        alert('Item has been added to shopping list!')
        const refno = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        $.get('/add-shopping-list', {refno}, async function (result) {
            if(result)
                console.log('Shopping list function has been executed.');
        })
    })
/*
    $('#searchbutton').click(async function (e) {
        e.preventDefault();
        //Retrieve text from searchbar.
        const searchString = $('#searchbar').val();

        console.log(searchString);
        //Perform search method.
        $.get('/search', { searchString }, function (result) {
            if (Result) {
                //generate new page.
            }
        })
    })

*/
})