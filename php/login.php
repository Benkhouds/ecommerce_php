<?php
include('config/db.php');
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

if (!empty($email) && !empty($password)) {
    $query = mysqli_query($conn, "SELECT p.session_id, q.id FROM(users p inner join shopping_cart q on p.id=q.user_id) WHERE email='{$email}' AND password='{$password}'");
    if ($query) {
        if (mysqli_num_rows($query) > 0) {
            $row = mysqli_fetch_assoc($query);
            session_start();
            $_SESSION['session_id'] = $row['session_id'];
            $_SESSION['cart_id'] = $row['id'] ;
            echo "success" ;
        } else {
            echo "Incorrect email or password!";
        }
    } else {
        echo "error: " . mysqli_sqlstate($conn);
    }
} else {

    echo "All fields are required!";
}