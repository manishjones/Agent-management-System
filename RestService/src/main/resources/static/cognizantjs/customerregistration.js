var flag = false;
function validate() {
    flag = true;
    $('[data-toggle="tooltip"]').tooltip('dispose');
    $('[data-toggle="tooltip"]').removeAttr("title");
    $('[data-toggle="tooltip"]').removeAttr("data-toggle");
    validateName();
    validateAddress();
    validateMark();
    validateCity();
    validateState();
    validateZip();
    validatePremiums();
    validateIncome();
    validateContact();
    validateEMail();
    validatePassword();
    validateDob();
    validateHeight();
    validateWeight();
    $('[data-toggle="tooltip"]').tooltip({ placement: 'right', trigger: 'manual' }).tooltip('show');
    if (flag == true) { store(); }
    return false;
}

function validateHeight() {
    var str = $("#height").val();
    if (str != '') {
        var match = str.match("[0-9]+");
        var match2 = str.match("[0-9]+\\.[0-9]+");
        if (!(match != null && str == match[0])) {
            if (!(match2 != null && str == match2[0])) {
                $("#height").attr("data-toggle", "tooltip");
                $("#height").attr("title", "Height can contain be a number");
                flag = false;
            }
        }
    }
}

function validateWeight() {
    var str = $("#weight").val();
    if (str != '') {
        var match = str.match("[0-9]+");
        var match2 = str.match("[0-9]+\\.[0-9]+");
        if (!(match != null && str == match[0])) {
            if (!(match2 != null && str == match2[0])) {
                $("#weight").attr("data-toggle", "tooltip");
                $("#weight").attr("title", "Weight can contain only be a number");
                flag = false;
            }
        }
    }
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

function validateAddress() {
    var str = $("#address").val();
    if (str == '') {
        $("#address").attr("data-toggle", "tooltip");
        $("#address").attr("title", "Mandatory");
        this.flag = false;
    }
}


function validateMark() {
    var str = $("#mark").val();
    if (str == '') {
        $("#mark").attr("data-toggle", "tooltip");
        $("#mark").attr("title", "Mandatory");
        this.flag = false;
    }
}


function validateCity() {
    var str = $("#city").val();
    if (str == '') {
        $("#city").attr("data-toggle", "tooltip");
        $("#city").attr("title", "Mandatory");
        flag = false;
    }
}


function validateState() {
    var str = $("#state").val();
    if (str == '') {
        $("#state").attr("data-toggle", "tooltip");
        $("#state").attr("title", "Mandatory");
        flag = false;
    }
}

function validateZip() {
    var str = $("#zipcode").val();
    if (str == '') {
        $("#zipcode").attr("data-toggle", "tooltip");
        $("#zipcode").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var match = str.match("[0-9]{6}");
        if (!(match != null && str == match[0])) {
            $("#zipcode").attr("data-toggle", "tooltip");
            $("#zipcode").attr("title", "Zipcode should be of 6 digits");
            flag = false;
        }
    }
}

function validatePremiums() {
    var str = $("#premiums").val();
    if (str != '') {
        var match = str.match("[0-9]+");
        var match2 = str.match("[0-9]+\\.[0-9]+");
        if (!(match != null && str == match[0])) {
            if (!(match2 != null && str == match2[0])) {
                $("#premiums").attr("data-toggle", "tooltip");
                $("#premiums").attr("title", "Premium should only contain digits");
                flag = false;
            }
        }
    }
}

    function validateIncome() {
        var str = $("#income").val();
        if (str == '') {
            $("#income").attr("data-toggle", "tooltip");
            $("#income").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var match = str.match("[0-9]+");
            var match2 = str.match("[0-9]+\\.[0-9]+");
            if (!(match != null && str == match[0])) {
                if (!(match2 != null && str == match2[0])) {
                    $("#income").attr("data-toggle", "tooltip");
                    $("#income").attr("title", "Income should only contain digits");
                    flag = false;
                }
            }
        }
    }

    function validateContact() {
        var str = $("#contactno").val();
        if (str == '') {
            $("#contactno").attr("data-toggle", "tooltip");
            $("#contactno").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var match = str.match("[0-9]{10}");
            if (!(match != null && str == match[0])) {
                $("#contactno").attr("data-toggle", "tooltip");
                $("#contactno").attr("title", "Contact No. should be of 10 digits");
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
            var match = str.match("[a-zA-z0-9\\.\\_-]{2,}@[a-zA-z0-9\\.\\_-]{2,}\\.[a-zA-z\\.]{2,}");
            if (!(match != null && str == match[0])) {
                $("#email").attr("data-toggle", "tooltip");
                $("#email").attr("title", "Please enter a valid email address");
                flag = false;
            }
        }
    }

    function validatePassword() {
        var str = $("#password").val();
        if (str == '') {
            $("#password").attr("data-toggle", "tooltip");
            $("#password").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var b1 = new RegExp("[0-9]").test(str);
            var b2 = new RegExp("[A-Z]").test(str);
            var b3 = new RegExp("[a-z]").test(str);
            var b4 = str.length >= 8;
            if (!(b1 && b2 && b3 & b4)) {
                $("#password").attr("data-toggle", "tooltip");
                $("#password").attr("title", "Password should have at least 8 characters, 1 digit, 1 uppercase and 1 lowercase");
                flag = false;
            }
        }
    }

    function validateDob() {
        var str = $("#dob").val();
        if (str == '') {
            $("#dob").attr("data-toggle", "tooltip");
            $("#dob").attr("title", "Mandatory");
            flag = false;
        }
        else {

            var d1 = Date.parse(str);
            var d2 = new Date().getTime();
            if (d1 > d2) {
                $("#dob").attr("data-toggle", "tooltip");
                $("#dob").attr("title", "DOB can't be more than system date");
                flag = false;
            }
            else {
                var d3 = (d2 - d1) / 31536000000;
                if (d3 < 18) {
                    $("#dob").attr("data-toggle", "tooltip");
                    $("#dob").attr("title", "Agent has to be minimum 18 years");
                    flag = false;
                }
            }
        }
    }

    function getJson() {
        var $items = $('#name,#address,#city,#state,#zipcode,#contactno,#email,#dob,#mark,#height,#weight,#premiums,#income,#password');
        var obj = {};
        $items.each(function () {
            obj[this.id] = $(this).val();
        });
        var json = JSON.stringify(obj);
        return json;
    }


    function store() {
        var json = getJson();
        $.ajax({
            type: "POST",
            url: "http://10.230.179.19:6844/customer/register",
            async: false,
            data: json,
            contentType: "application/json",
            dataType: "text",
            success: function (data) {

                $("#alertmodalbody").empty();
                $("#alertmodalheader").empty();
                $("#alertmodalheader").append('Success');
                $("#alertmodalbody").append('Your login ID is ' + data);
                $("#alertmodal").on("hidden.bs.modal", function () {
                    window.location = "Login";
                });
                $("#alertmodal").modal('show');
            },
            error: function () {

                $("#alertmodalbody").empty();
                $("#alertmodalheader").empty();
                $("#alertmodalheader").append('Error');
                $("#alertmodalbody").append('Server error, please try later.');
                $("#alertmodal").modal('show');
            }
        });
    }
