$(document).ready(function() {

	var quan = $(".quantity");
	var plus = $(".plus");
	var minus = $(".minus");
    
	for (var i = 0; i < quan.length; i++) {
       get(quan[i]);
        
		plus[i].addEventListener('click', function(i) {
			quan[i].value = Number(quan[i].value)+ 1;
            update(quan[i]);

			i.preventDefault();
            update(quan[i]);

		}.bind(null, i));
        
	    minus[i].addEventListener('click', function(i) {
			if (quan[i].value>1){
				quan[i].value = Number(quan[i].value)- 1;
                update(quan[i]);

				i.preventDefault();

			}
		}.bind(null, i));

	}
   
   
    $('#shopList').on('click', '.remove', function () {
        // get the card to delete
        var toDelete = this.parentNode.parentNode;
        // get the name of the item to be deleted
        var name = $(this).parent().prev().children().html();
        
        var newDel = { name: name };
       // console.log(newDel);

        // remove the transaction from the database
        $.get('/delete-ShopItem', newDel, function(data, status) {
            console.log("data: ", data);
            console.log("status: ", status);

            // removes the card whose button is clicked
            toDelete.remove();
        });
    });
   
});

//reflect on mongoDB the changes in .quan
function update(obj){
	var name = $(obj).parent().prev().children().html();
    var queries = {name:name,neededQty:(Number(obj.value))};
    $.get('/updateNeedQuan',queries,function(data,status){
    })


}
//reflect waht is in mongoDB unto the input field .quantity
function get(obj){
   
    var name = $(obj).parent().prev().children().html();
    $.get('/renderQuans',{name:name},function(data,status){
       obj.value = (data);
    })
}

        
    
        //alert(1);
    
   
   // return name;
