<?php


$db = mysqli_connect('localhost:3307', 'root', 'root', 'appsalon');

if(!$db) {
    echo "error al conectar";
    exit;
}

