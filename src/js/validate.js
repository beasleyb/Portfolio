// --------------------------------------------
// Contact form validation
// --------------------------------------------

function validate(){

	var $contactForm 	= $('#contactForm', $(document)),
		$nameField		= $('#nameField', $contactForm),
		$emailField		= $('#emailField', $contactForm),
		$messageField	= $('#messageField', $contactForm);

	$contactForm.on('submit', function(e){
		e.preventDefault();
		formValidation(_init());
	});

	function _init(){
		var formValues 	= { 
			name: $nameField.val(),
			email: $emailField.val(),
			message: $messageField.val()
		};

		return formValues;
	}

	function formValidation(formValues){
		var validationResults = {
			nameResult: nameValidation(formValues.name),
			emailResult: emailValidation(formValues.email),
			messageResult: messageValidation(formValues.message)
		};
	}

	function nameValidation(name){
		// Do stuff
	}

	function emailValidation(email){
		// Regex pattern for email field.
		// '\w{2,15}' allows for longer domains.
		var emailPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/);

		return emailPattern.test(email);
	}

	function messageValidation(message){
		// Do stuff
	}

	function errorKeyup(field){
		// Do stuff
	}

	function submitForm(values){
		// Do stuff
	}
}

// $("#contact-form").on('submit', function(e) {
//     e.preventDefault();
//     var emailData = {
//         name: $("#name").val(),
//         email: $("#email").val(),
//         message: $("#message").val()
//     };

//     function isValidEmail(emailAddress) {
//     var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/);
//     return pattern.test(emailAddress);
//     };
//     if (isValidEmail(emailData['email']) && emailData['name'].length > 1 && emailData['message'].length > 50) {
//        $.ajax({
//         type: "POST",
//         url: "php/mailer.php",
//         data: emailData,
//         success: function() {
//             $("#contact-form")[0].reset();
//             $("#success").fadeIn(100);
//         },
//         error: function(errorThrown) {
//             $("#ajax-error").fadeIn(100);
//             console.log(errorThrown);
//         }
//     }); 
//     }
//     else {
//         $("#error").fadeIn(100);
//     }
// });

// $(".close").on('click', function(e) {
//     $(this).parent().fadeOut(100);
// });