var jArr;

function init() {
    if (sessionStorage.getItem('adminUser') === null) {
        alert('Unauthorized Access');
        localStorage.clear();
        window.location = 'Login';
    }
    else {
        $.ajax({
            type: "GET",
            url: "http://10.230.179.19:6844/admin/policy/",
            async: false,
            dataType: "json",
            success: function (data) { jArr = data; active() },
            error: function () {
                $("#alertmodalbody").empty();
                $("#alertmodalbody").append('No policy records could be found');
                $("#alertmodal").on("hidden.bs.modal", function () {
                    window.location = "AdminHome";
                });
                $("#alertmodal").modal("show");
            }
        });
    }
}

    function active() {

        $("#b1").attr("class","btn btn-primary my-2 active");
        $("#b2").attr("class","btn btn-primary my-2");
        $("#cardspace").empty();
        for (i = 0; i < jArr.length; i++) {
            var curDt = new Date();
            var expDt = new Date(jArr[i].licenceExpiryDate);
            if (expDt >= curDt) {
                var card = '<div class="col-md-4"><div class="card mb-4 shadow-sm"><div class="card-body">' +
                    '<h3 class="card-heading">' + jArr[i].id + '</h3>' +
                    '<p class="card-text">Company: ' + jArr[i].companyName + '<br>Company E-Mail: ' + jArr[i].companyEMail + '<br>Licence Registration Date: ' + jArr[i].licenceRegistryDate + '</p>' +
                    '<div class="d-flex justify-content-between align-items-center">' +
                    '<div class="btn-group">' +
                    '<button type="button" class="btn btn-sm btn-info" onclick="policyDetails(\'' + jArr[i].id + '\')">Details</button>' +
                    '</div>' +
                    '<small class="text-muted">Expires On: ' + jArr[i].licenceExpiryDate + '</small>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $("#cardspace").append(card);
            }
        }
    }

    function expired() {

        $("#b2").attr("class","btn btn-primary my-2 active");
        $("#b1").attr("class","btn btn-primary my-2");
        $("#cardspace").empty();
        for (i = 0; i < jArr.length; i++) {
            var curDt = new Date();
            var expDt = new Date(jArr[i].licenceExpiryDate);
            if (expDt < curDt) {
                var card = '<div class="col-md-4"><div class="card mb-4 shadow-sm"><div class="card-body">' +
                    '<h3 class="card-heading">' + jArr[i].id + '</h3>' +
                    '<p class="card-text">Company: ' + jArr[i].companyName + '<br>Company E-Mail: ' + jArr[i].companyEMail + '<br>Licence Registration Date: ' + jArr[i].licenceRegistryDate + '</p>' +
                    '<div class="d-flex justify-content-between align-items-center">' +
                    '<div class="btn-group">' +
                    '<div class="btn-group">' +
                    '<button type="button" class="btn btn-sm btn-info" onclick="policyDetails(\'' + jArr[i].id + '\')">Details</button>' +
                    '<button type="button" class="btn btn-sm btn-success" onclick="renew(\'' + jArr[i].id + '\')">Renew</button>' +
                    '</div>' +
                    '</div>' +
                    '<small class="text-muted">Expired On: ' + jArr[i].licenceExpiryDate + '</small>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $("#cardspace").append(card);
            }
        }
    }

    function logout() {
        sessionStorage.clear();
        window.location = "Login";
    }

    function policyDetails(polId) {

        $("#modalbody").empty();
        var tHead = '<table class="table table-hover">' +
            '<thead>' +
            '</thead>' +
            '<tbody>';

        var tFoot = '</tbody>' +
            '</table>';

        $.ajax({
            type: "GET",
            url: "http://10.230.179.19:6844/admin/policy/" + polId,
            async: false,
            dataType: "json",
            success: function (data) {

                var body = '<tr><th>ID</th><td>' + data.id + '</td></tr>' +
                    '<tr><th>Name</th><td>' + data.name + '</td></tr>' +
                    '<tr><th>Company ID</th><td>' + data.companyId + '</td></tr>' +
                    '<tr><th>Company Name</th><td>' + data.companyName + '</td></tr>' +
                    '<tr><th>Company Address</th><td>' + data.companyAddress + '</td></tr>' +
                    '<tr><th>Key Contact</th><td>' + data.keyContactName + '</td></tr>' +
                    '<tr><th>Contact No.</th><td>' + data.keyContactNumber + '</td></tr>' +
                    '<tr><th>Company EMail</th><td>' + data.companyEMail + '</td></tr>' +
                    '<tr><th>Licence Registration Date</th><td>' + data.licenceRegistryDate + '</td></tr>' +
                    '<tr><th>Licence Expiry Date</th><td>' + data.licenceExpiryDate + '</td></tr>';

                var table = tHead + body + tFoot;

                $("#modalbody").append(table);
                $("#pModal").modal("show");
            },
            error: function () { 
                $("#alertmodalbody").empty();
                $("#alertmodalbody").append('No policy record could be found');
                $("#alertmodal").modal("show");

            }   
        });
        return false;
    }

    function renew(polId) {

        $("#modalbody").empty();
        var tHead = '<table class="table table-hover">' +
            '<thead>' +
            '</thead>' +
            '<tbody>';

        var tFoot = '</tbody>' +
            '</table>';

        $.ajax({
            type: "GET",
            url: "http://10.230.179.19:6844/admin/policy/" + polId,
            async: false,
            dataType: "json",
            success: function (data) {

                var body = '<tr><th>ID</th><td>' + data.id + '</td></tr>' +
                    '<tr><th>Name</th><td>' + data.name + '</td></tr>' +
                    '<tr><th>Company ID</th><td>' + data.companyId + '</td></tr>' +
                    '<tr><th>Licence Registration Date</th><td>' + data.licenceRegistryDate + '</td></tr>' +
                    '<tr><th>Licence Expiry Date</th><td>' + data.licenceExpiryDate + '</td></tr>' +
                    '<tr><th>Select Renewal Duration</th><td>' +
                    '<select class="form-control" onchange="calExp()" id="period">' +
                    '<option value=0 selected disabled>Please Select A Period</option>' +
                    '<option value=6>6 Months</option>' +
                    '<option value=12>12 Months</option>' +
                    '<option value=18>18 Months</option>' +
                    '<option value=24>24 Months</option>' +
                    '<option value=30>30 Months</option>' +
                    '</select>' +
                    '</td></tr>' +
                    '<tr><th>Updated Expiry Date</th><td>' +
                    '<input class="form-control" type="date" id="exp" disabled required>' +
                    '</td></tr>'

                var subbtn = '<a class="btn btn-success" onclick="renewLicence(\'' + data.id + '\',$(\'#exp\').val())">Renew</a>';

                var table = tHead + body + tFoot + subbtn;

                $("#modalbody").append(table);
                $("#pModal").modal("show");

            },
            error: function () { 
                $("#alertmodalbody").empty();
                $("#alertmodalbody").append('No policy record could be found');
                $("#alertmodal").modal("show");
            }
        });
        return false;
    }

    function calExp() {
        var date = new Date();
        var mth = parseInt($("#period").val());
        var newm = parseInt(date.getMonth() + mth);
        date.setMonth(newm);
        var strd = (date.getFullYear()) + '-' + (date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate());
        $("#exp").val(strd);
    }

    function renewLicence(id, eDt) {

        $.ajax({
            type: "GET",
            url: "http://10.230.179.19:6844/admin/policy/" + id,
            async: false,
            dataType: "json",
            success: function (data) {
                data.licenceExpiryDate = eDt;
                var json = JSON.stringify(data);

                $.ajax({
                    type: "POST",
                    url: "http://10.230.179.19:6844/admin/licence/renew",
                    async: false,
                    data: json,
                    contentType: "application/json",
                    dataType: "text",
                    success: function (data) { 
                        $("#alertmodalbody").empty();
                        $("#alertmodalbody").append('The Licence has been renewed.'); 
                        $("#alertmodal").on("hidden.bs.modal", function () {
                        window.location = "ViewLicences";
                    });
                    $("#alertmodal").modal("show"); 
                },
                    error: function () { 
                        $("#alertmodalbody").empty();
                        $("#alertmodalbody").append('No policy record could be found'); 
                        $("#alertmodal").modal("show");
                }
                });
            },
            error: function () { 
                $("#alertmodalbody").empty();
                $("#alertmodalbody").append('No policy record could be found'); 
                $("#alertmodal").on("hidden.bs.modal", function () {
                    window.location = "ViewLicences";
                });
                $("#alertmodal").modal("show");
            }
        });
        return false;
    }