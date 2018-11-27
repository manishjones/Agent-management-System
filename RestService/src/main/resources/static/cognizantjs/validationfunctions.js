flag=true;
function validatePassword(){
    var str = $("#password").val();
    if(str==''){
        $("#password").attr("data-toggle", "tooltip"); 
        $("#password").attr("title", "Mandatory");
       flag=false;
    }
    else{
        var b1=new RegExp("\d").test(str);
        var b2=new RegExp("[A-Z]").test(str);
        var b3=new RegExp("[a-z]").test(str);
        var b4=str.length>=8;
        if(!(b1&&b2&&b3&b4)){
            $("#password").attr("data-toggle", "tooltip"); 
            $("#password").attr("title", "Password should have at least 8 characters, 1 digit, 1 uppercase and 1 lowercase");
            flag=false;
        }
    }
}