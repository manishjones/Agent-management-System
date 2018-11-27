function viewLicences() {
    $("#cardspace").empty();
    $("#buttonspace").empty();

    var btns='<hr><div class="btn-group">'+
    '<a class="btn btn-secondary my-2" onclick="viewActive()">View Active Licenes</a>'+
    '<a class="btn btn-secondary my-2" onclick="viewExpired()">View Expired Licenes</a>'+
    '</div><br>';

    var closebtn='<a class="btn btn-secondary btn-sm" onclick="closeView()">Close</a><br><br>';

    $("#buttonspace").append(btns);
    $("#buttonspace").append(closebtn);

    var x = document.getElementById("jumbot");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    viewActive();
}

function viewActive(){
    $("#cardspace").empty();
    var data={
        "id":"Policy ID",
        "cname":"Company Name",    
        "cemail":"Company E-Mail",
        "registrationdate":"Licence Registration Date",
        "expirydate":"Licence Expiry Date"
    };
    for (i = 0; i < 10; i++) {
        var card = '<div class="col-md-4"><div class="card mb-4 shadow-sm"><div class="card-body">' +
            '<h3 class="card-heading">'+data.id+'</h3>' +
            '<p class="card-text">Company: '+data.cname+'<br>Company E-Mail: '+data.cemail+'<br>Licence Registration Date: '+data.registrationdate+'</p>' +
            '<div class="d-flex justify-content-between align-items-center">' +
            '<div class="btn-group">' +
            '<button type="button" class="btn btn-sm" onclick="$(#policyModal).modal()">Details</button>' +
            '</div>' +
            '<small class="text-muted">Expires On: '+data.expirydate+'</small>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("#cardspace").append(card);
    }
}

function viewExpired(){
    $("#cardspace")("");
    var data={
        "id":"Policy ID",
        "cname":"Company Name",    
        "cemail":"Company E-Mail",
        "registrationdate":"Licence Registration Date",
        "expirydate":"Licence Expiry Date"
    };
    for (i = 0; i < 8; i++) {
        var card = '<div class="col-md-4"><div class="card mb-4 shadow-sm"><div class="card-body">' +
            '<h3 class="card-heading">'+data.id+'</h3>' +
            '<p class="card-text">Company: '+data.cname+'<br>Company E-Mail: '+data.cemail+'<br>Licence Registration Date: '+data.registrationdate+'</p>' +
            '<div class="d-flex justify-content-between align-items-center">' +
            '<div class="btn-group">' +
            '<button type="button" class="btn btn-sm btn-outline-secondary">Details</button>' +
            '<button type="button" class="btn btn-sm btn-outline-secondary">Renew</button>' +
            '</div>' +
            '<small class="text-muted">Expires On: '+data.expirydate+'</small>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("#cardspace").append(card);
    }
}

function closeView(){
    $("#cardspace").empty();
    $("#buttonspace").empty();
    var x = document.getElementById("jumbot");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
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