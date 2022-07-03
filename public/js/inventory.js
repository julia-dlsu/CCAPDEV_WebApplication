
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

    $('#update-item-form').submit(async function(e){

        e.preventDefault()
        const files = $('#image').prop('files')[0]
        const formData = new FormData()

        formData.append('name', $("#name").val())
        formData.append('description', $("#description").val())
        formData.append('category', $("#category").val())
        formData.append('qty', $("#qty").val())
        formData.append('img', files)
        
        const response = await fetch("/update", {
            method: 'POST',
            body: formData
        })

        $("#description").val("");
        $("#category").val("");
        $("#qty").val("");
        $("#image").val("");
        $('#myModal').modal('hide');
        location.href = "/";
    })

    $('#inventory-container').on('click', '.remove', function () {
        var name = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        var topParent = this.parentElement.parentElement.parentElement.parentElement;

        console.log(name+' '+topParent.classList);
        $.get('/inventory/delete', { name }, function (result) {
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
        alert('Item has been added to shopping list!');
        const refno = this.parentElement.parentElement.previousElementSibling.children[2].children[0].innerHTML;
        $.get('/add-shopping-list', {refno}, async function (result) {
            if(result)
                console.log('Shopping list function has been executed.');
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