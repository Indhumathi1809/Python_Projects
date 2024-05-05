// Form validation
function validateForm() {
    var username = document.forms["registrationForm"]["username"].value;
    var password = document.forms["registrationForm"]["password"].value;
    var confirm_password = document.forms["registrationForm"]["confirm_password"].value;

    if (username === "") {
        alert("Username must be filled out");
        return false;
    }

    if (password === "") {
        alert("Password must be filled out");
        return false;
    }

    if (password !== confirm_password) {
        alert("Passwords do not match");
        return false;
    }
}
