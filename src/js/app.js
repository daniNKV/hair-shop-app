
document.addEventListener(('DOMContentLoaded') , () => {
    iniciarApp();
})

function iniciarApp() {
    mostrarServicios();
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
