().ready(function() {
    //Does nothing for now:
    var pathname = (window.location.pathname).replace(window.location.hash, "");
    if (pathname == "/") {
	//Do something - URL control. Requires apache .htaccess
    }

    $('#login_submit').on('click', function() {
	var username = $('#login_user').val();
	var pass = $('#login_pass').val();
	$('#loginmenu_close').click();
	loginDbUser(username, pass);
    });

    //If user registers a doctor account:
    $('#register_submit').on('click', function() {
	var name = $('#register_name').val();
	var username = $('#register_user').val();
	var pass = $('#register_pass').val();
	var terms = $('#register_termsconditions').is(":checked");
	//Validate user input
	if (name == "" || username == "" || pass == "") {
	    $('#registerError').html("<span style='color:red'>Error: Please fill in all the fields.</span>");
	} else {
	    //Check that they checked the terms and conditions.
	    if (terms) {
		$('#loginmenu_close').click();
		createDbUser(username, pass,  name);
	    } else {
		$('#registerError').html("<span style='color:red'>Error: Please accept Terms and Conditions</span>");
	    }
	}
    });
    /********END********/







    /********Logon functions********/
    var ref = new Firebase(firebaseURL);
    //If user logs in:
    ref.onAuth(function(authData) {
	if (authData) {
	    $('.nav').html("");
	    $('#loggedinuserbox > div').html("");
	    $('#authenticationforms').hide();
	    $('#loggedinuserbox').fadeIn();
	    ref.once("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
		    var childData = childSnapshot.val();
		    if (childData['uid'] == authData.uid) {
			$('.nav').append('<li class="active"><a data-toggle="pill" href="#home" id="#homebutton">Home</a></li>');
			$('#loggedinuserbox > div').append('<h5 style="display:inline;color:#888;font-family:Raleway;" id="welcomeText">Welcome, ' + childData['name'] + '!</h5> <br>');
			$('#loggedinuserbox > div').append('<br>');
			$('#loggedinuserbox > div').append('<h5 style="display:inline;color:#888;font-family:Raleway;" id="welcomeText">You\'re enrolled as a ' + childData['urole'] + '.</h5>');
			if (childData['urole'] == 'doctor') {
			    $('.nav').append('<li><a data-toggle="pill" href="#newPatient">New Patient</a></li>');
			    $('.nav').append('<li><a data-toggle="pill" href="#existingPatients">Existing Patients</a></li>');
			    $('.nav').append('<li><a data-toggle="pill" href="#patientInfo" id="patientInfobutton">Patient Info</a></li>');
			    getPatients(authData.uid);
			} else if (childData['urole'] == 'patient') {
			    $('.nav').append('<li><a data-toggle="pill" href="#patientInfo">My Info</a></li>');
			    patientInfo('', childData);
			}
		    }
		});
	    });
	} else {
	    $('#loggedinuserbox').hide();
	    $('#authenticationforms').fadeIn();
	    $('.nav').html("");
	}
    });

    //When the logout button is pressed:
    $('#logoutButton').on('click', function() {
	$('#loggedinuserbox').hide();
	$('.nav').html("");
	var ref = new Firebase(firebaseURL);
	ref.unauth();
	location.reload();
    });
});
