<?php
$conn = mysqli_connect('localhost', 'root', '', 'ecommerce');
if (!$conn) {
    echo 'error' . mysqli_connect_error();
    die();
}