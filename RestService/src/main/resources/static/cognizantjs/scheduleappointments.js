var flag = false;
function validate() {
    flag = true;
    $('[data-toggle="tooltip"]').tooltip('dispose');
    $('[data-toggle="tooltip"]').removeAttr("title");
    $('[data-toggle="tooltip"]').removeAttr("data-toggle");
    validateDoa();
    $('[data-toggle="tooltip"]').tooltip({ placement: 'right', trigger: 'manual' }).tooltip('show');
    if (flag == true) { store();}
    return false;
}

function validateDoa() {
    var str = $("#doa").val();
    if (str == '') {
        $("#doa").attr("data-toggle", "tooltip");
        $("#doa").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var d1 = Date.parse(str);
        var d2 = new Date().getTime();
        if (d2 >= d1) {
            $("#doa").attr("data-toggle", "tooltip");
            $("#doa").attr("title", "Appointment date should be at least tomorrow");
            flag = false;
        }
    }
}

function getJson() {
    var $items = $('#doa,#slot');
    var obj = {};
    $items.each(function() {
        obj[this.id] = $(this).val();
    });

    $.ajax({
        type: "GET",
        url: 'http://10.230.179.19:6844/customer/getagent/'+$("#doa").val()+'/'+$("#slot").val(),
        async: false,
        dataType: "text",
        success: function(data){obj.aid=data;},
        error: function(){return null;}
    });
    obj.cid=sessionStorage.getItem("custUser");
    json = JSON.stringify(obj);
    return json;
}

function store() {
    var json = getJson();
    if(json===null){
        alert('Agent not available for the selected date andtime slot!');
        return;
    }
    $.ajax({
        type: "POST",
        url: "http://10.230.179.19:6844/customer/appointment/schedule",
        async: false,
        data: json,
        contentType: "application/json",
        dataType: "text",
        success: function(data) {
            $("#alertmodalbody").empty(); 
            $("#alertmodalbody").append(data); 
            $("#alertmodal").on("hidden.bs.modal", function(){
                window.location = "CustomerHome";
            });
            $("#alertmodal").modal('show');
    },
        error: function() { 
            $("#alertmodalbody").empty(); 
            $("#alertmodalbody").append('Agents not available for the selected time slot. Please choose another date-time combination.');
            $("#alertmodal").modal('show');
          }
    });
}

function init() {
    if (sessionStorage.getItem('custUser') === null) {
        alert('Unauthorized Access');
        window.location = 'Login';
    }
}

function logout(){
    sessionStorage.clear();
    window.location="Login";
}