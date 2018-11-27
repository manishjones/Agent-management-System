var flag = true;
function validate() {
    flag = true;
    $('[data-toggle="tooltip"]').tooltip('dispose');
    $('[data-toggle="tooltip"]').removeAttr("title");
    $('[data-toggle="tooltip"]').removeAttr("data-toggle");
    validateDates();
    $('[data-toggle="tooltip"]').tooltip({ placement: 'right', trigger: 'manual' }).tooltip('show');
    return false;
}

function validateDates(){
    var s1=$("#from").val();
    var s2=$("#to").val();
    if(s1==''||s2==''){
        $("#to").attr("data-toggle", "tooltip");
        $("#to").attr("title", "Dates can't be empty!");
            flag = false;
    }
    else if(s1!=''&&s2!=''){
        var d1=new Date(s1);
        var d2=new Date(s2);
        var dif=(d2.getTime()-d1.getTime())/2592000000;
        if(d1>d2){
            $("#to").attr("data-toggle", "tooltip");
            $("#to").attr("title", "Cannot exceed the above date");
            flag = false;
        }
        else if(dif>3){
            $("#to").attr("data-toggle", "tooltip");
            $("#to").attr("title", "Commission calculation can't exceed 3 months");
            flag = false;
        }
    }
}

function init() {
    if (sessionStorage.getItem('adminUser') === null) {
        alert('Unauthorized Access');
        localStorage.clear();
        window.location = 'Login';
    }
    $("#formspace").append(allform);
}

function selectForm(){
    if($("#formselect").find(":selected").text()=='All Agents'){
        $("#formspace").empty();
        $("#formspace").append(allform);
    }
    else if($("#formselect").find(":selected").text()=='Single Agent'){

        $("#formspace").empty();
        $("#formspace").append(singleform);
        populateAgents();

    }
}

function allAgents(){
    $("#modalbody").empty();
    var tHead='<table class="table table-light">'+
    '<thead style="color:white;">'+
    '<tr>'+
    '<th>Agent ID</th>'+
    '<th>Agent Name</th>'+
    '<th>Total Amount</th>'+
    '<th>Total Commission</th>'+
    '</tr>'+
    '</thead>'+
    '<tbody style="color:white;">';

    var tFoot='</tbody>'+
    '</table>';


    $.ajax({
        type: "GET",
        url: "http://10.230.179.19:6844/admin/commission/" + $("#from").val() + "/" + $("#to").val(),
        async: false,
        dataType: "json",
        success: function (data) {
            
            var body='';
            for(i=0;i<data.length;i++){
                body=body+'<tr><td>'+data[i].id+'</td><td>'+data[i].name+'</td><td>'+data[i].total+'</td><td>'+data[i].commission+'</td></tr>'
            }  
              var table=tHead+body+tFoot;
              $("#modalbody").append(table);
              $("#cModal").modal("show");
        },
        error: function () { 
            $("#alertmodalbody").empty(); 
            $("#alertmodalbody").append('No records exist!');
            $("#alertmodal").modal('show');   
    }
    });
    return false;
}

function singleAgent(){
    $("#modalbody").empty();
    var tHead='<table class="table table-hover">'+
    '<thead style="color:white;">'+
    '<tr>'+
    '<th>Agent ID</th>'+
    '<th>Agent Name</th>'+
    '<th>Total Amount</th>'+
    '<th>Total Commission</th>'+
    '<th>No. Of Appointments</th>'+
    '<th>No. Of Policies Registered</th>'+
    '</tr>'+
    '</thead>'+
    '<tbody style="color:white;">';

    var tFoot='</tbody>'+
    '</table>';


    $.ajax({
        type: "GET",
        url: "http://10.230.179.19:6844/admin/commission/"+ $("#agentid").val() +"/" + $("#from").val() + "/" + $("#to").val(),
        async: false,
        dataType: "json",
        success: function (data) {
            var body='<tr><td>'+data.id+'</td><td>'+data.name+'</td><td>'+data.total+'</td><td>'+data.commission+'</td><td>'+data.app+'</td><td>'+data.pol+'</td></tr>'
              var table=tHead+body+tFoot;
              $("#modalbody").append(table);
              $("#cModal").modal("show");
        },
        error: function () { $("#alertmodalbody").empty(); 
        $("#alertmodalbody").append('No suitable records exist!');
        $("#alertmodal").modal('show');  }
    });
    return false;
}

function populateAgents(){
    $.ajax({
        type: "GET",
        url: "http://10.230.179.19:6844/admin/agent",
        async: false,
        dataType: "json",
        success: function (data) {
            for(i=0;i<data.length;i++){
                $("#agentid").append('<option value=\"'+data[i].id+'\">'+data[i].id+'</option>');
            }
        },
        error: function () { 
            $("#alertmodalbody").empty(); 
            $("#alertmodalbody").append('No suitable records exist!');
            $("#alertmodal").modal('show'); 
        }
    });
}

function logout(){
    sessionStorage.clear();
    window.location="Login";
}

var singleform ='<form onsubmit="return singleAgent()">'+
'<div class="form-group">'+
'<label for="agentid">Agent ID</label>'+
'<select id="agentid" type="text" class="form-control" placeholder="AgentId"></select>'+
'</div>'+
'<div class="form-group">'+
'<label for="from">From Date </label>'+
'<input class="form-control" type="date" id="from" placeholder="From Date">'+
'</div>'+
'<div class="form-group ">'+
'<label for="to">To Date </label>'+
'<input class="form-control" type="date" id="to" placeholder="To Date">'+
'</div>'+
'<div class="form-group ">'+
'</div>'+
'<hr>'+
'<div class="form-group">'+
'<center>'+
'<button class="btn btn-primary col-6" type="submit">Submit</button>'+
'</center>'+
'</div>'+
'</form>';

var allform ='<form onsubmit="return allAgents()">'+
'<div class="form-group">'+
'<label for="from">From Date </label>'+
'<input class="form-control" type="date" id="from" placeholder="From Date">'+
'</div>'+
'<div class="form-group ">'+
'<label for="to">To Date </label>'+
'<input class="form-control" type="date" id="to" placeholder="To Date">'+
'</div>'+
'<div class="form-group ">'+
'</div>'+
'<hr>'+
'<div class="form-group">'+
'<center>'+
'<button class="btn btn-primary col-6" type="submit">Submit</button>'+
'</center>'+
'</div>'+
'</form>';

