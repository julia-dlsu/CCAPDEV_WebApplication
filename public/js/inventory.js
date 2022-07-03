$(document).ready(async function () {

    var quan = $(".quantity");
	var plus = $(".plus");
	var minus = $(".minus");
	for (var i = 0; i < quan.length; i++) {
        renderItemQuan(quan[i]);
		plus[i].addEventListener('click', function(i) {
           
			quan[i].value = Number(quan[i].value)+ 1;
            update(quan[i]);
			i.preventDefault();

		}.bind(null, i));
        
	    minus[i].addEventListener('click', function(i) {
			if (quan[i].value>1){
				quan[i].value = Number(quan[i].value)- 1;
                update(quan[i]);

				i.preventDefault();

			}
		}.bind(null, i));

    }

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
        var toDelete = this.parentNode.parentNode.parentNode.parentNode;
        var name = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        
        var newDel = { name: name };
        console.log(newDel);
        console.log(toDelete)

        $.get('/inventory/delete', newDel, function(data, status) {
            console.log("status: ", status);

            // removes the card whose button is clicked
            toDelete.remove();
        });
    })

    $('#inventory-container').on('click', '.favorite', function () {
        const refno = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        const favorite = $(this).children();

        $.get('/inventory/add-favorite', {refno}, async function (result) {
            if (result == "red"){ // change heart to red
                favorite.addClass("favorited");
            }
            else { // change heart to black
                favorite.removeClass("favorited");
            }
        })
    })

    $('#inventory-container').on('click', '.shopping-list', function () {
        const refno = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        const shopping = $(this).children();

        $.get('/inventory/add-shopping-list', {refno}, async function (result) {
            if (result == "green"){ // change heart to green
                shopping.addClass("shopped");
            }
            else { // change heart to black
                shopping.removeClass("shopped");
            }
        })
    })
    
})

function renderItemQuan(obj){
    
    var name = $(obj).parent().prev().prev().prev().html();

   $.get('/renderItemQuans',{name:name},function(data,status){
       obj.value = (data);
    })
}

function update(obj){
	var name = $(obj).parent().prev().prev().prev().html();
    var queries = {name:name,quantity:(Number(obj.value))};

    $.get('/updateQty',queries,function(data,status){
    })


}