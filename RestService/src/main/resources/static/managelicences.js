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