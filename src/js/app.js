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
}
function mostrarSeccion() {
    const seccionActual = document.querySelector(`#paso-${pagina}`)
    seccionActual.classList.add('mostrar-seccion')

    // Resalta tab actual

    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');

}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');
    const tabActual = `#paso-${pagina}`;
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);
            
            // Eliminar mostrar-seccion del tab anterior
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');
           
            //Agrega mostrar-seccion donde dimos click
            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');
            
            // Elimina la clase actual al tab anterior
            document.querySelector('.tabs .actual').classList.remove('actual')

            // Agrega clase actual al nuevo tab
            const tabActual = document.querySelector(`[data-paso="${pagina}"]`);
            tabActual.classList.add('actual');
        })
        
    })
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
