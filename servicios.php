<?php

require 'includes/funciones.php';

$servicios = obtenerServicios();
echo json_encode($servicios, JSON_INVALID_UTF8_IGNORE);


