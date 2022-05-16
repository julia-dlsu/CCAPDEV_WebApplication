//separated this into another file since we might use this outside of Registration
function validPicture(){

		var picInput = (document.Register.pic);
		//var picInput= $("#pic")
		var pic = picInput.value;
		var validType =  /(\.jpg|\.jpeg|\.png)$/i;
		
		if(!validType.exec(pic)){
			alert("Wrong file type. Please input a jpeg, jpg, or png file");
			picInput.value = '';
			return false;
		}
		else {
			return true;
		}
		
}