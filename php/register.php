<?php
include('./config/db.php');

$fname = mysqli_real_escape_string($conn, $_POST["fname"]);
$lname = mysqli_real_escape_string($conn, $_POST["lname"]);
$email = mysqli_real_escape_string($conn, $_POST["email"]);
$password = mysqli_real_escape_string($conn, $_POST["password"]);
$extensions = ["jpeg", "jpg", "png"];
if (!empty($fname) && !empty($lname) && !empty($email) && !empty($password)) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $result = mysqli_query($conn, "SELECT email FROM users WHERE email='{$email}'");
        if ($result) {
            if (mysqli_num_rows($result) == 0) {
                if (isset($_FILES['image']) && $_FILES["image"]["error"] == 0) {
                    $img_name = basename($_FILES['image']['name']);
                    $img_extension = pathinfo($img_name, PATHINFO_EXTENSION);
                    if (in_array($img_extension, $extensions)) {
                        $img_tmp_name = $_FILES['image']['tmp_name'];
                        if (!file_exists("user_images/" . $img_name)) {
                            $img_tmp = $_FILES["image"]["tmp_name"];
                            move_uploaded_file($img_tmp, "../user_images/" . $img_name);
                        }
                        $session_id = rand(time(), 1000000);
                        $sql = "insert into users(fname, lname, email , password, image, session_id,type)
                        values('{$fname}','{$lname}','{$email}','{$password}','{$img_name}',{$session_id},'client')";
                        $query = mysqli_query($conn, $sql);

                        if ($query) {
                            session_start();
                            $_SESSION['session_id'] = $session_id;
                            $user_id = mysqli_insert_id($conn);
                            
                            $sql_cart = "insert into shopping_cart(user_id) values($user_id)";
                            $query_cart = mysqli_query($conn, $sql_cart);

                            if($query_cart){
                                $_SESSION['cart_id']= mysqli_insert_id($conn); 
                                  echo "success";
                            }
                            else{
                                echo "lasttt-error: ".mysqli_sqlstate($conn); 
                            }
                            
                        } else {
                            echo "last-error:" . mysqli_sqlstate($conn);
                        }
                    } else {
                        echo "Invalid image format";
                    }
                } else {
                    echo "please select an image !";
                }
            } else {
                echo "Email already exists";
            }
        } else {
            echo "first-error:" . mysqli_sqlstate($conn);
        }
    } else {
        echo "Invalid Email";
    }
} else {
    echo "All inputs are required";
}