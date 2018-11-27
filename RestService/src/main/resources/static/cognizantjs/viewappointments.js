var a = '<div class="col-md-4">' +
    '<div class="card mb-4 shadow-sm">' +
    '<div class="card-body">' +
    '<h3 class="card-heading">Appointment Details</h3>' +
    '<p class="card-text">Agent ID' +
    '<br>Agent Name' +
    '<br>Agent Contact Number' +
    '<br>Agent E-Mail' +
    '</p>' +
    '<div class="d-flex justify-content-between align-items-center">' +
    '<small class="text-muted">Appointment Time</small>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

var b = '<div class="col-md-4">' +
    '<div class="card mb-4 shadow-sm">' +
    '<div class="card-body">' +
    '<h3 class="card-heading">Appointment Details</h3>' +
    '<p class="card-text">Agent ID' +
    '<br>Agent Name' +
    '<br>Agent Contact Number' +
    '<br>Agent E-Mail' +
    '</p>' +
    '<div class="d-flex justify-content-between align-items-center">' +
    '<small class="text-muted">Appointment Time</small>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

var jArr;

function init() {
    if (sessionStorage.getItem('custUser') === null) {
        alert('Unauthorized Access');
        localStorage.clear();
        window.location = 'Login';
    }
    else {
        $.ajax({
            type: "GET",
            url: "http://10.230.179.19:6844/customer/appointment/" + sessionStorage.getItem('custUser'),
            async: false,
            dataType: "json",
            success: function (data) { jArr = data; upcoming() },
            error: function () { 
                $("#alertmodalbody").empty(); 
                $("#alertmodalbody").append('No appointments to show.');
                $("#alertmodal").on("hidden.bs.modal", function(){
                    window.location = "CustomerHome";
                });
                $("#alertmodal").modal('show');
            }
        });
    }
}

function upcoming() {

    $("#b1").attr("class","btn btn-primary my-2 active");
    $("#b2").attr("class","btn btn-primary my-2");
    $("#cardspace").empty();
    for (i = 0; i < jArr.length; i++) {
        var curDt = new Date();
        var apDt = new Date(jArr[i].date);
        if (apDt >= curDt) {
            var a = '<div class="col-md-4">' +
                '<div class="card mb-4 shadow-sm">' +
                '<div class="card-body">' +
                '<h3 class="card-heading">Appointment Details</h3>' +
                '<p class="card-text">'+
                '<table class="table table-hover">'+
                '<tr>'+
                '<th>Agent ID</th>'+
                '<td>'+ jArr[i].agent.id + '</td>'+
                '</tr>'+
                '<tr>'+
                '<th>Agent Name</th>'+
                '<td>' + jArr[i].agent.name + '</td>'+
                '</tr>'+
                '<tr>'+
                '<th>Contact No.</th>'+
                '<td>' + jArr[i].agent.contactNumber + '</td>'+
                '</tr>'+
                '<tr>'+
                '<th>e-Mail</th>'+
                '<td>' + jArr[i].agent.emailAddress + '</td>'+
                '</tr>'+
                '</tbody>'+
                '</table>'+
                '</p>' +
                '<div class="d-flex justify-content-between align-items-center">' +
                '<small class="text-muted">' + jArr[i].date + '</small>' +
                '<small class="text-muted">' + jArr[i].timeSlot.replace(/_/g,' ') + '</small>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            $("#cardspace").append(a);
        }
    }
}

function past() {

    $("#b2").attr("class","btn btn-primary my-2 active");
    $("#b1").attr("class","btn btn-primary my-2");
    $("#cardspace").empty();
    for (i = 0; i < jArr.length; i++) {
        var curDt = new Date();
        var apDt = new Date(jArr[i].date);
        if (apDt < curDt) {
            var a = '<div class="col-md-4">' +
            '<div class="card mb-4 shadow-sm">' +
            '<div class="card-body">' +
            '<h3 class="card-heading">Appointment Details</h3>' +
            '<p class="card-text">'+
            '<table class="table table-hover">'+
            '<tr>'+
            '<th>Agent ID</th>'+
            '<td>'+ jArr[i].agent.id + '</td>'+
            '</tr>'+
            '<tr>'+
            '<th>Agent Name</th>'+
            '<td>' + jArr[i].agent.name + '</td>'+
            '</tr>'+
            '<tr>'+
            '<th>Contact No.</th>'+
            '<td>' + jArr[i].agent.contactNumber + '</td>'+
            '</tr>'+
            '<tr>'+
            '<th>e-Mail</th>'+
            '<td>' + jArr[i].agent.emailAddress + '</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>'+
            '</p>' +
            '<div class="d-flex justify-content-between align-items-center">' +
            '<small class="text-muted">' + jArr[i].date + '</small>' +
            '<small class="text-muted">' + jArr[i].timeSlot.replace(/_/g,' ') + '</small>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
            $("#cardspace").append(a);
        }
    }
}

function logout(){
    sessionStorage.clear();
    window.location="Login";
}