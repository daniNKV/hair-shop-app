<?php

function obtenerServicios() {
    try {
        // Importar conexión
        require 'database.php';
        
        //Escribir código sql
        $sql = "SELECT * FROM servicios;";

        $consulta = mysqli_query($db, $sql);

        // Arreglo Vacio
        $servicios = [];

        $indice = 0;

        //Obtener Resultados
        while( $row = mysqli_fetch_assoc($consulta) ) {
            $servicios[$indice]['id'] = $row['id'];
            $servicios[$indice]['nombre'] = $row['nombre'];
            $servicios[$indice]['precio'] = $row['precio'];
            
            $indice++;
        }
        /*
        echo "<pre>";
        var_dump($servicios);
        echo "<\pre>";
        */
        
        return $servicios;
    }
    catch (\Throwable $th) {
        var_dump($th);
    }
}

obtenerServicios();