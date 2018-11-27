function fillHome(){
    $("#homebtn").attr("class","nav-link active");
    $("#featuresbtn").attr("class","nav-link inactive");
    $("#contactsbtn").attr("class","nav-link inactive");
    $("#hometitle")('Welcome to Agent Management System!');
    $("#hometext")('Please Login either as a customer or an administrator to continue. Unregistered customers can register using the link from the sign-in screen.');
    
}

function fillFeatures(){
    $("#homebtn").attr("class","nav-link inactive");
    $("#featuresbtn").attr("class","nav-link active");
    $("#contactsbtn").attr("class","nav-link inactive");
    $("#hometitle")('Functions');
    $("#hometext")('Agent Management System (AMS) is used for insurance agent maintenance, license management, scheduling customer '+
    'appointmentsfor Insurance policies and agent commission calculation for an insurance consultant.');
}

function fillContacts(){
    $("#homebtn").attr("class","nav-link inactive");
    $("#featuresbtn").attr("class","nav-link inactive");
    $("#contactsbtn").attr("class","nav-link active");
    $("#hometitle")('Contacts');
    $("#hometext")('Raj Kishore Mahli : +918158035053<br>Akash Nair:+917720048849<br>Manish Kumar :+918504826808<br>Manish Golla :+918019267367 ');
}