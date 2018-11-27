function viewAppointments() {
    $("#cardspace").empty();
    $("#buttonspace").empty();

    var btns='<hr><div class="btn-group">'+
    '<a class="btn btn-secondary my-2" onclick="currentAppointments()">Current Appointments</a>'+
    '<a class="btn btn-secondary my-2" onclick="pastAppointments()">Past Appointments</a>'+
    '</div><br>';

    var closebtn='<a class="btn btn-secondary btn-sm" onclick="closeView()">Close</a><br><br>';

    $("#buttonspace").append(btns);
    $("#buttonspace").append(closebtn);
    currentAppointments();

    var x = document.getElementById("jumbot");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function currentAppointments(){
    $("#cardspace").empty();
    var data={
        "date":"Appointment Date",
        "agentid":"Agent ID",    
        "name":"Agent Name",
        "agentcontactno":"Agent Contact Number",
        "agentemail":"Agent E-Mail",
        "appointmenttime":"Appointment Time"
    };
    for (i = 0; i < 10; i++) {
        var card = '<div class="col-md-4"><div class="card mb-4 shadow-sm"><div class="card-body">' +
            '<h3 class="card-heading">'+data.date+'</h3>' +
            '<p class="card-text">'+data.agentid+'<br>Agent Name<br>'+data.agentcontactno+'<br>'+data.agentemail+'</p>' +
            '<div class="d-flex justify-content-between align-items-center">' +
            '<div class="btn-group">' +
            '<button type="button" class="btn btn-sm btn-outline-secondary">Cancel</button>' +
            '</div>' +
            '<small class="text-muted">'+data.appointmenttime+'</small>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("#cardspace").append(card);
    }
}

function pastAppointments(){
    $("#cardspace").html("");
    var data={
        "date":"Appointment Date",
        "agentid":"Agent ID",    
        "name":"Agent Name",
        "agentcontactno":"Agent Contact Number",
        "agentemail":"Agent E-Mail",
        "appointmenttime":"Appointment Time"
    };
    for (i = 0; i < 8; i++) {
        var card = '<div class="col-md-4"><div class="card mb-4 shadow-sm"><div class="card-body">' +
            '<h3 class="card-heading">'+data.date+'</h3>' +
            '<p class="card-text">'+data.agentid+'<br>Agent Name<br>'+data.agentcontactno+'<br>'+data.agentemail+'</p>' +
            '<div class="d-flex justify-content-between align-items-center">' +
            '<small class="text-muted">'+data.appointmenttime+'</small>' +
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
    toggleJumbo();
}

function toggleJumbo() {
    var x = document.getElementById("jumbot");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function init(){
    if(sessionStorage.getItem('custUser')===null){
        alert('Unauthorized Access');
        localStorage.clear();
        window.location='Login.html';    
    }
}

function logout(){
    sessionStorage.clear();
    window.location="Login.html";
}