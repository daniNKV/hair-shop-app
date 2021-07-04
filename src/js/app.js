let pagina = 1;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener(('DOMContentLoaded') , () => {
    iniciarApp();
})

function iniciarApp() {
    mostrarServicios();


// Resalta el div actual segun el tab
    mostrarSeccion();

// Oculta o muestra una seccion segun el tab
    cambiarSeccion();

// Paginacion siguiente y anterior
    paginaSiguiente();
    paginaAnterior();

// Comprueba pagina actual y muestra/oculta la paginacion
    botonesPaginador();
// Muestra el resumen de la cita o el error 
    mostrarResumen();
// Almacena el nombre de la cita en el objeto
    nombreCita();
// Almacena la fecha de la cita en el objeto
    fechaCita();
}




function mostrarSeccion() {
    
    // Eliminar mostrar-seccion del tab anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar-seccion');
    }
    
    const seccionActual = document.querySelector(`#paso-${pagina}`)
    seccionActual.classList.add('mostrar-seccion')
    
    // Elimina la clase actual al tab anterior
    const tabAnterior = document.querySelector('.tabs .actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }
   
    // Resalta tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');




}
function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);
            
            // Llamar a mostrar seccion
            mostrarSeccion();
            botonesPaginador();
        })
        
    })
}

function paginaSiguiente () {
    const $paginaSiguiente = document.getElementById('siguiente')
    $paginaSiguiente.addEventListener('click', () => {
        pagina++;

        botonesPaginador();
    })
}
function paginaAnterior () {
    const $paginaAnterior = document.getElementById('anterior')
    $paginaAnterior.addEventListener('click', () => {
        pagina--;

        botonesPaginador();

    });
}
function botonesPaginador () {
    const $paginaSiguiente = document.getElementById('siguiente')
    const $paginaAnterior = document.getElementById('anterior')

    if (pagina === 1) {
        $paginaAnterior.classList.add('ocultar');
        $paginaSiguiente.classList.remove('ocultar')
    }else if (pagina === 3) {
        $paginaSiguiente.classList.add('ocultar');
        $paginaAnterior.classList.remove('ocultar');
    }else {
        $paginaAnterior.classList.remove('ocultar');
        $paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion(); // Muestra la seccion


}

async function mostrarServicios() {
    const $servicios = './servicios.json';

    try {
        const resultado = await fetch($servicios);
        const db = await resultado.json();

        const {servicios} = db;

        //Generar HTML
        servicios.forEach(servicio => {
            const {id, nombre, precio} = servicio;

            //DOM Scripting
            //Nombre
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add("nombre-servicio");
           
            //Precio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add("precio-servicio");
            
            //Div Contenedor
            const servicioDiv = document.createElement('DIV')
            servicioDiv.classList.add('servicio')
            servicioDiv.dataset.idServicio = id;
            
            //Selecciona un Servicio 
            servicioDiv.onclick = seleccionarServicio;
           
            //Inyectar elementos en el DIV
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);
            
            //Inyectar en el HTML
            document.querySelector('#servicios').appendChild(servicioDiv);
        })
    }catch (error) {
        console.log(error);
    }
}
function seleccionarServicio(event) {
    let elemento;
    if (event.target.tagName === 'P'){
        elemento = event.target.parentElement;
    }else {
        elemento = event.target.parentElement;
    }
   // console.log(elemento.dataset.idServicio)

    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado')

        const id = parseInt (elemento.dataset.idServicio);

        eliminarServicio(id);
    } else {    
        elemento.classList.add('seleccionado');
        const servicioObj = {
            id: parseInt(elemento.dataset.idServicio),
            nombre: elemento.firstElementChild.textContent,
            precio: elemento.firstElementChild.nextSibling.textContent
        }
        agregarServicio(servicioObj);
    }
}
function eliminarServicio (id) {
    const { servicios } = cita;
    cita.servicios = servicios.filter( servicio => servicio.id !== id);
    console.log(cita);
}
function agregarServicio (servicioObj) {
    const { servicios } = cita;
    cita.servicios = [...servicios, servicioObj];
    console.log(cita);

}

function mostrarResumen () {

    //Destructuring 
    const { nombre, fecha, hora, servicios } = cita;
    //Seleccionar el resumen
    const resumenDiv = document.querySelector('.contenido-resumen');

    // validacion de objeto
    if (Object.values(cita).includes('')) {
        const noServicios = document.createElement('P');
        noServicios.textContent = 'Faltan datos de Servicios, hora, fecha o nombre'
        noServicios.classList.add('invalidar-cita')
        //Agregar a resumen Div
        resumenDiv.appendChild(noServicios);
    }
}
function nombreCita() {
    const $nombreInput = document.getElementById('nombre') 
    $nombreInput.addEventListener('input', event => {
        const $nombreTexto = event.target.value.trim();
        
        // Validacion nombre Texto
        if ($nombreTexto === '' || $nombreTexto.length < 3){
            mostrarAlerta('Nombre no valido', 'error')
        }else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

            cita.nombre = $nombreTexto;

            console.log(cita);
        }
    })
}
function fechaCita() {
    const fechaInput = document.getElementById('fecha')
    fechaInput.addEventListener('input', event => {
        const opciones = {
            weekday: 'long',
            year: 'numeric',
            month: 'long'
        }
        const dia = new Date(event.target.value).getUTCDay();

        if ([0, 6].includes(dia)) {
            event.preventDefault();
            fechaInput.value = '';
            mostrarAlerta('No trabajamos los fines de semana :(', 'error');
        }else {
            cita.fecha = fechaInput.value;
        }
    })
} //toLocalDateString('es-ES', opciones)
function mostrarAlerta(mensaje, tipo) {
    // Si hay alertas, no crear otra
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        return;
    }
    //Crea elemento Alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    if(tipo === 'error') {
        alerta.classList.add('error');
    }

    // Inyectar en el HTML
    const $form = document.querySelector('.form');
    $form.appendChild(alerta)

    // Eliminar la alerta después de 3 seg
    setTimeout(() => {
        alerta.remove()
    },3000)
}