var flag = true;
function validate() {
    flag = true;
    $('[data-toggle="tooltip"]').tooltip('dispose');
    $('[data-toggle="tooltip"]').removeAttr("title");
    $('[data-toggle="tooltip"]').removeAttr("data-toggle");
    validateName();
    validateComName();
    validateAddress();
    validateContact();
    validateEMail();
    validateId();
    validateDor();
    $('[data-toggle="tooltip"]').tooltip({ placement: 'right', trigger: 'manual' }).tooltip('show');
    if(flag==true){store();}
    return false;
}

function validateName() {
    var str = $("#name").val();
    if (str == '') {
        $("#name").attr("data-toggle", "tooltip");
        $("#name").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var b = new RegExp("[^A-Za-z ]").test(str);
        if (b) {
            $("#name").attr("data-toggle", "tooltip");
            $("#name").attr("title", "Name can contain only letters and spaces");
            flag = false;
        }
    }
}

function validateComName() {
    var str = $("#comname").val();
    if (str == '') {
        $("#comname").attr("data-toggle", "tooltip");
        $("#comname").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var b = new RegExp("[^A-Za-z ]").test(str);
        if (b) {
            $("#comname").attr("data-toggle", "tooltip");
            $("#comname").attr("title", "Name can contain only letters and spaces");
            flag = false;
        }
    }
}

function validateDor() {
    var str = $("#dor").val();
    if (str == '') {
        $("#dor").attr("data-toggle", "tooltip");
        $("#dor").attr("title", "Mandatory");
        flag = false;
    }
    else{
        var dor=new Date(str);
        var cd=new Date();
        if(dor>cd){
            $("#dor").attr("data-toggle", "tooltip");
            $("#dor").attr("title", "DOR cannot be greater than current date!");
            flag = false;
        }
    }
}

    function validateAddress() {
        var str = $("#address").val();
        if (str == '') {
            $("#address").attr("data-toggle", "tooltip");
            $("#address").attr("title", "Mandatory");
            flag = false;
        }
    }

    function validateContact() {
        var str = $("#contact").val();
        if (str == '') {
            $("#contact").attr("data-toggle", "tooltip");
            $("#contact").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var match = str.match("[0-9]{10}");
            if (!(match != null && str == match[0])) {
                $("#contact").attr("data-toggle", "tooltip");
                $("#contact").attr("title", "Contact No. should be of 10 digits");
                flag = false;
            }
        }
    }

    function validateEMail() {
        var str = $("#email").val();
        if (str == '') {
            $("#email").attr("data-toggle", "tooltip");
            $("#email").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var match = str.match("[a-zA-z0-9\\.\\_\\-]{2,}@[a-zA-z0-9\\.\\_\\-]{2,}\\.[a-zA-z\\.]{2,}");
            if (!(match != null && str == match[0])) {
                $("#email").attr("data-toggle", "tooltip");
                $("#email").attr("title", "Please enter a valid email address");
                flag = false;
            }
        }
    }

    function calExp(){
        var date=new Date($("#dor").val());
        var mth=parseInt($("#period").val());
        var newm=parseInt(date.getMonth()+mth);
        date.setMonth(newm);
        var strd=(date.getFullYear())+'-'+(date.getMonth()<9?('0'+(date.getMonth()+1)):(date.getMonth()+1))+'-'+(date.getDate()<10?('0'+date.getDate()):date.getDate());
        $("#doe").val(strd);
    }

    function validateId(){
        var str = $("#cid").val();
        if (str == '') {
            $("#id").attr("data-toggle", "tooltip");
            $("#id").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var match = str.match("CO[0-9]{4}");
            if (!(match != null && str == match[0])) {
                $("#cid").attr("data-toggle", "tooltip");
                $("#cid").attr("title", "Company ID should start with CO digits and be followed by 4 digits");
                flag = false;
            }
        }
    }

    function getJson(){
        var $items = $('#name,#comname,#cid,#address,#conname,#contact,#email,#dor,#doe');
        var obj = {};
        $items.each(function() {
                obj[this.id] = $(this).val();
    });
    var json= JSON.stringify( obj);
    return json;
    }
    
    function store(){
        var json=getJson();
        $.ajax({
          type: "POST",
          url: "http://10.230.179.19:6844/admin/licence/add",
          async: false,
          data: json,
          contentType: "application/json",
          dataType: "text",
        success: function (data){
            $("#alertmodalbody").empty();
            $("#alertmodalbody").append('Licence for Policy ID '+data+' has been registered successfully!');
            $("#alertmodal").on("hidden.bs.modal", function () {
                window.location.href="AdminHome";
            });
            $("#alertmodal").modal('show');
        }, 
        error: function (){
            $("#alertmodalbody").empty();
            $("#alertmodalbody").append('Unable to store to database!');
            $("#alertmodal").modal('show');
        }
        });
    }

    function init() {
        if (sessionStorage.getItem('adminUser') === null) {
            alert('Unauthorized Access');
            localStorage.clear();
            window.location = 'Login';
        }
    }

function logout(){
    sessionStorage.clear();
    window.location="Login";
}