$(document).ready(function() {
    // Form submission
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        $('.error-message').removeClass('show').text('');
        
        // Validate form
        if (validateForm()) {
            submitForm();
        }
    });

    // Validate individual fields on blur
    $('#firstName').on('blur', function() {
        validateField('firstName', 'First Name');
    });

    $('#lastName').on('blur', function() {
        validateField('lastName', 'Last Name');
    });

    $('#email').on('blur', function() {
        validateEmail();
    });

    $('#phone').on('blur', function() {
        validatePhone();
    });

    $('#dob').on('blur', function() {
        validateField('dob', 'Date of Birth');
    });

    $('#gender').on('change', function() {
        validateField('gender', 'Gender');
    });

    $('#address').on('blur', function() {
        validateField('address', 'Address');
    });

    $('#city').on('blur', function() {
        validateField('city', 'City');
    });

    $('#state').on('blur', function() {
        validateField('state', 'State/Province');
    });

    $('#zipcode').on('blur', function() {
        validateField('zipcode', 'Zip/Postal Code');
    });

    $('#country').on('blur', function() {
        validateField('country', 'Country');
    });

    $('#education').on('change', function() {
        validateField('education', 'Education Level');
    });

    $('#terms').on('change', function() {
        validateTerms();
    });
});

function validateForm() {
    let isValid = true;

    // Validate First Name
    if ($('#firstName').val().trim() === '') {
        showError('firstName', 'First Name is required');
        isValid = false;
    } else if ($('#firstName').val().trim().length < 2) {
        showError('firstName', 'First Name must be at least 2 characters');
        isValid = false;
    }

    // Validate Last Name
    if ($('#lastName').val().trim() === '') {
        showError('lastName', 'Last Name is required');
        isValid = false;
    } else if ($('#lastName').val().trim().length < 2) {
        showError('lastName', 'Last Name must be at least 2 characters');
        isValid = false;
    }

    // Validate Email
    if ($('#email').val().trim() === '') {
        showError('email', 'Email Address is required');
        isValid = false;
    } else if (!isValidEmail($('#email').val())) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone
    if ($('#phone').val().trim() === '') {
        showError('phone', 'Phone Number is required');
        isValid = false;
    } else if (!isValidPhone($('#phone').val())) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate DOB
    if ($('#dob').val() === '') {
        showError('dob', 'Date of Birth is required');
        isValid = false;
    }

    // Validate Gender
    if ($('#gender').val() === '') {
        showError('gender', 'Gender is required');
        isValid = false;
    }

    // Validate Address
    if ($('#address').val().trim() === '') {
        showError('address', 'Address is required');
        isValid = false;
    }

    // Validate City
    if ($('#city').val().trim() === '') {
        showError('city', 'City is required');
        isValid = false;
    }

    // Validate State
    if ($('#state').val().trim() === '') {
        showError('state', 'State/Province is required');
        isValid = false;
    }

    // Validate Zipcode
    if ($('#zipcode').val().trim() === '') {
        showError('zipcode', 'Zip/Postal Code is required');
        isValid = false;
    }

    // Validate Country
    if ($('#country').val().trim() === '') {
        showError('country', 'Country is required');
        isValid = false;
    }

    // Validate Education
    if ($('#education').val() === '') {
        showError('education', 'Education Level is required');
        isValid = false;
    }

    // Validate Terms
    if (!$('#terms').is(':checked')) {
        showError('terms', 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

function validateField(fieldId, fieldName) {
    const value = $('#' + fieldId).val().trim();
    
    if (value === '') {
        showError(fieldId, fieldName + ' is required');
        return false;
    } else {
        clearError(fieldId);
        return true;
    }
}

function validateEmail() {
    const email = $('#email').val().trim();
    
    if (email === '') {
        showError('email', 'Email Address is required');
        return false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return false;
    } else {
        clearError('email');
        return true;
    }
}

function validatePhone() {
    const phone = $('#phone').val().trim();
    
    if (phone === '') {
        showError('phone', 'Phone Number is required');
        return false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        return false;
    } else {
        clearError('phone');
        return true;
    }
}

function validateTerms() {
    if (!$('#terms').is(':checked')) {
        showError('terms', 'You must agree to the terms and conditions');
        return false;
    } else {
        clearError('terms');
        return true;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showError(fieldId, message) {
    $('#' + fieldId + 'Error').text(message).addClass('show');
}

function clearError(fieldId) {
    $('#' + fieldId + 'Error').text('').removeClass('show');
}

function submitForm() {
    const formData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        dob: $('#dob').val(),
        gender: $('#gender').val(),
        address: $('#address').val(),
        city: $('#city').val(),
        state: $('#state').val(),
        zipcode: $('#zipcode').val(),
        country: $('#country').val(),
        education: $('#education').val(),
        interests: $('#interests').val()
    };

    // Send data to PHP
    $.ajax({
        type: 'POST',
        url: 'process_form.php',
        data: formData,
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                displaySuccessPage(response.data);
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function() {
            alert('An error occurred while processing your request.');
        }
    });
}

function displaySuccessPage(data) {
    // Hide form, show success message
    $('#formContainer').hide();
    $('#successContainer').show();

    // Populate submitted data
    let tableHTML = '';
    for (let key in data) {
        if (data.hasOwnProperty(key) && data[key] !== '') {
            const label = formatLabel(key);
            tableHTML += '<tr>';
            tableHTML += '<td>' + label + '</td>';
            tableHTML += '<td>' + escapeHtml(data[key]) + '</td>';
            tableHTML += '</tr>';
        }
    }

    $('#submittedDataBody').html(tableHTML);
}

function formatLabel(str) {
    // Convert camelCase to Title Case
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(char) { return char.toUpperCase(); })
        .trim();
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}