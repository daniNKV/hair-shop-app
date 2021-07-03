let pagina = 1;


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
    console.log(elemento.dataset.idServicio)

    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado')
    } else {    
        elemento.classList.add('seleccionado')
}
}
