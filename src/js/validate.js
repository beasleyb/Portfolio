// --------------------------------------------
// Contact form validation
// --------------------------------------------
// To do:
// 1. Switch to NodeMailer after port to Express.

function validate(){

	var $contactForm 	= $('#contactForm', $(document)),
		$nameField		= $('#nameField', $contactForm),
		$emailField		= $('#emailField', $contactForm),
		$messageField	= $('#messageField', $contactForm);

	// Validate form on submit.
	$contactForm.on('submit', function(e){
		e.preventDefault();
		_init();
	});

	// Listening for keyup, change, and paste.
	// Input not included to prevent firing twice on paste.
	$('.error, .success', $contactForm).on('keyup change paste', function(){
		fieldKeyup($(this));
	});

	function _init(){
		var formValues 	= {
			name: $nameField.val(),
			email: $emailField.val(),
			message: $messageField.val()
		};

		formValidation(formValues);
	}

	function formValidation(formValues){
		var validationResults = {
			name: nameValidation(formValues.name),
			email: emailValidation(formValues.email),
			message: messageValidation(formValues.message)
		};

		var proceed = true;

		for (var field in validationResults){
			if (!validationResults[field]){
				proceed = false;
				
				// Add error class to fields that failed validation.
				var failedField = $('#'+field+'Field');

				if (!failedField.hasClass('error')){
					failedField.addClass('error');
				}
			}
		}

		// Submit form if validation passed
		if (proceed){
			submitForm(formValues);
		} else {
			validate();
		}
	}

	function nameValidation(name){
		// Names between 2 and 30 character are valid.
		var result = (name.length >= 2 && name.length <= 30);

		return result;
	}

	function emailValidation(email){
		// Regex pattern for email field.
		// '\w{2,15}' allows for longer domains.
		var emailPattern 	= new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/),
			result 			= emailPattern.test(email);

		return result;
	}

	function messageValidation(message){
		// Messages between 30 and 1000 characters are valid.
		var result = (message.length >= 30 && message.length <= 1000);

		return result;
	}

	function fieldKeyup(field){
		var fieldValue 	= field.val(),
			fieldID		= field.attr('id');

		// Method lookup based on field
		var keyupActions = {
			'nameField': function(){
				return nameValidation(fieldValue)
			},
			'emailField': function(){
				return emailValidation(fieldValue)
			},
			'messageField': function(){
				return messageValidation(fieldValue)
			}
		};

		if (typeof keyupActions[fieldID] !== 'function') {
			throw new Error('Invalid field.');
		}

		var result = keyupActions[fieldID]();

		// Toggle error and success classes based on result.
		if (!result && field.hasClass('success')){
			field.toggleClass('error success');
		}
		else if (result && field.hasClass('error')){
			field.toggleClass('error success');
		}
	}

	function submitForm(data){
		// Ajax using 'mailer.php' for action.
		$.ajax({
			type: "POST",
			url: 'php/mailer.php',
			data: data,
			success: function(){
				$contactForm[0].reset();
			},
			error: function(errorThrown){
				console.log(errorThrown);
			}
		});
	}
}