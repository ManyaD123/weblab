<?php
// Set JSON header
header('Content-Type: application/json');

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Initialize response
$response = array(
    'status' => 'error',
    'message' => '',
    'data' => array()
);

try {
    // Check if request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Sanitize and validate input data
    $firstName = sanitizeInput($_POST['firstName'] ?? '');
    $lastName = sanitizeInput($_POST['lastName'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $dob = sanitizeInput($_POST['dob'] ?? '');
    $gender = sanitizeInput($_POST['gender'] ?? '');
    $address = sanitizeInput($_POST['address'] ?? '');
    $city = sanitizeInput($_POST['city'] ?? '');
    $state = sanitizeInput($_POST['state'] ?? '');
    $zipcode = sanitizeInput($_POST['zipcode'] ?? '');
    $country = sanitizeInput($_POST['country'] ?? '');
    $education = sanitizeInput($_POST['education'] ?? '');
    $interests = sanitizeInput($_POST['interests'] ?? '');

    // Validation
    $errors = array();

    if (empty($firstName) || strlen($firstName) < 2) {
        $errors[] = 'First Name is required and must be at least 2 characters';
    }

    if (empty($lastName) || strlen($lastName) < 2) {
        $errors[] = 'Last Name is required and must be at least 2 characters';
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid Email Address is required';
    }

    if (empty($phone) || !preg_match('/^[0-9\s\-\+\(\)]{10,}$/', str_replace(' ', '', $phone))) {
        $errors[] = 'Valid Phone Number is required';
    }

    if (empty($dob)) {
        $errors[] = 'Date of Birth is required';
    }

    if (empty($gender)) {
        $errors[] = 'Gender is required';
    }

    if (empty($address)) {
        $errors[] = 'Address is required';
    }

    if (empty($city)) {
        $errors[] = 'City is required';
    }

    if (empty($state)) {
        $errors[] = 'State/Province is required';
    }

    if (empty($zipcode)) {
        $errors[] = 'Zip/Postal Code is required';
    }

    if (empty($country)) {
        $errors[] = 'Country is required';
    }

    if (empty($education)) {
        $errors[] = 'Education Level is required';
    }

    if (!empty($errors)) {
        throw new Exception(implode(', ', $errors));
    }

    // If all validations pass, prepare success response
    $response['status'] = 'success';
    $response['message'] = 'Registration submitted successfully!';
    $response['data'] = array(
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'phone' => $phone,
        'dob' => $dob,
        'gender' => $gender,
        'address' => $address,
        'city' => $city,
        'state' => $state,
        'zipcode' => $zipcode,
        'country' => $country,
        'education' => $education,
        'interests' => $interests
    );

    // Optional: Save to database or file
    // saveToDatabase($response['data']);
    // or
    // saveToFile($response['data']);

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

// Return JSON response
echo json_encode($response);
exit();

/**
 * Sanitize user input
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Optional: Save data to database
 */
function saveToDatabase($data) {
    // Example: Connect to database and insert data
    // $conn = new mysqli('localhost', 'user', 'password', 'database');
    // $query = "INSERT INTO registrations (...) VALUES (...)";
    // $conn->query($query);
}

/**
 * Optional: Save data to file
 */
function saveToFile($data) {
    $filename = 'registrations_' . date('Y-m-d') . '.txt';
    $content = json_encode($data, JSON_PRETTY_PRINT) . "\n";
    file_put_contents($filename, $content, FILE_APPEND);
}

?>