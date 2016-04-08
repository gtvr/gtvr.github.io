firebaseURL = "https://gtvr.firebaseio.com"

function createUser(emailid, passwd, myname) {
    var ref = new Firebase(firebaseURL);
    ref.createUser({
	email: emailid,
	password: passwrd
    }, function(error, userData) {
	if (error) {
	    $('#registerError').html("<span style='color:red'>Error: " + error.message + "</span>");
	} else {
	    $('#signupform').html("Successfully Created Your Account! You can now log in.");
	    newRef = ref.push();
	    newRef.set({
		uid: userData.uid,
		name: myname
	    });
	}
    });
}

function loginUser(emailid, passwrd) {
    var ref = new Firebase(firebaseURL);
    ref.authWithPassword({
	email: emailid,
	password: passwrd
    }, function(error, userData) {
	if (error) {
	    $('#loginError').html("<span style='color:red'>Error: " + error.message + '</span>');
	} else {}
    });
}
