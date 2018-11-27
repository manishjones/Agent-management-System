var flag = false;
function validate() {
    flag = true;
    $('[data-toggle="tooltip"]').tooltip('dispose');
    $('[data-toggle="tooltip"]').removeAttr("title");
    $('[data-toggle="tooltip"]').removeAttr("data-toggle");
    validateUsername();
    validatePassword();
    $('[data-toggle="tooltip"]').tooltip({ placement: 'right', trigger: 'manual' }).tooltip('show');
    if (flag == true) {
        getPassword();
    }
}

function validateUsername() {
    var str = $("#inputEmail").val();
    if (str == '') {
        $("#inputEmail").attr("data-toggle", "tooltip");
        $("#inputEmail").attr("title", "Mandatory");
        flag = false;
    }
}

function validatePassword() {
    var str = $("#inputPassword").val();
    if (str == '') {
        $("#inputPassword").attr("data-toggle", "tooltip");
        $("#inputPassword").attr("title", "Mandatory");
        flag = false;
    }
}

function getPassword() {
    var str = $("#inputEmail").val();
    var str2 = $("#inputPassword").val();

    var json = {
        "username": str,
        "password": str2
    }

    var str3;
    var str4;
    var str5=JSON.stringify(json);
    
    var url = 'http://10.230.179.19:6844/';
    if (str.substr(0, 2) == 'CU') {
        url = url + 'customer' + '/password/';
        str3 = 'custUser';
        str4 = 'CustomerHome';
    }
    else if (str.substr(0, 2) == 'AD') {
        url = url + 'admin' + '/password/';
        str3 = 'adminUser';
        str4 = 'AdminHome';
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        data: str5,
        contentType: "application/json",
        dataType: "text",
        success: function () {
            window.sessionStorage.setItem(str3, str);
            window.location = str4;
        },
        error: function () {
            $("#alertmodalbody").empty();
            $("#alertmodalbody").append('Unauthorized Credentials!');
            $("#alertmodal").modal("show");
        }
    });
}

function init() {
    sessionStorage.clear();
}