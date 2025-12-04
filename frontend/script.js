// Variable global para almacenar los equipos
let arrayEquipos = [];

// Función para cargar los datos del JSON
async function cargarDatosEquipos() {
    try {
        const response = await fetch('/api/equipos');

        if (!response.ok) {
            throw new Error(`Error al cargar el archivo: ${response.status}`);
        }

        arrayEquipos = await response.json();
        console.log('Datos cargados correctamente:', arrayEquipos);
        cargarEquipos();

        // Una vez cargados los datos, ejecutar la función principal

    } catch (error) {
        console.error('Error cargando los equipos:', error);
        // Puedes mostrar un mensaje de error al usuario
        const listaEquipos = document.getElementById("lista-equipos");
        if (listaEquipos) {
            listaEquipos.innerHTML = '<p style="color: white">Error al cargar los equipos. Intenta recargar la página.</p>';
        }
    }
}

cargarDatosEquipos();



function cargarEquipos() {
    const listaEquipos = document.getElementById("lista-equipos");
    console.log(listaEquipos);
    arrayEquipos.forEach(equipo => {
        let li = document.createElement("li");
        li.innerHTML = `
            <div class="card-equipo" style="--team-color: ${equipo.colorCard}">
                <div class="barra-card">
                    <h2>${equipo.nombreCorto}</h2>
                    <div class="container-logo-equipo">
                        <a href = "equipo/${equipo.id}"><img src="${equipo.logoChico}" alt="${equipo.nombre}"></a>
                    </div>
                </div>
                <img src="${equipo.imagenAuto}" alt="auto Red Bull" class="auto-equipo">
            </div>
        `;
        listaEquipos.appendChild(li);
        console.log(li);
    });
};





function cargarPerfil() {
    console.log("entra a cargar perfil")
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get("team");
    console.log(teamId);

    // Buscar el equipo usando find (más eficiente que while)
    const equipo = arrayEquipos.find(e => e.id === teamId);
    const fondo = document.querySelector(".fondo-color");

    if (equipo && fondo) {
        document.getElementById("logo-equipo").src = equipo.logo;
        document.getElementById("nombre-equipo").alt = equipo.nombre;
        document.getElementById("nombre-equipo").textContent = equipo.nombre;
        // document.getElementById("historia-equipo").textContent = equipo.historia; esto lo saqué pq me daba problema a la carga que venía después
        fondo.style.background = equipo.colorFondo;

        //cargo los pilotos del equipo correspondiente
        cargarPilotos(equipo);
    }
}

cargarPerfil();

// Función adicional para cargar datos de pilotos
function cargarPilotos(equipo) {
    const equipoPilotos = document.getElementById("equipo-pilotos");
    console.log(equipoPilotos);

    const pilotoPrincipal = document.getElementById("piloto-principal");
    const pilotoApoyo = document.getElementById("piloto-apoyo");

    if (pilotoPrincipal) {
        pilotoPrincipal.innerHTML = `
        <div class="pilot-card" style="--team-color: ${equipo.colorCard};">
            <div class="pilot-info">
                <h3>${equipo.nombrePilotoPrincipal}</h3>
                <p class="pilot-number">${equipo.numeroPilotoPrincipal}</p>
            </div>
            <div class="pilot-image-container">
                <img src="${equipo.imagenPilotoPrincipal}" alt="${equipo.nombrePilotoPrincipal}" class="pilot-image">
            </div>
        </div>
        `;
    }

    if (pilotoApoyo) {
        pilotoApoyo.innerHTML = `
        <div class="pilot-card" style="--team-color: ${equipo.colorCard};">
            <div class="pilot-info">
                <h3>${equipo.nombrePilotoApoyo}</h3>
                <p class="pilot-number">${equipo.numeroPilotoApoyo}</p>
            </div>
            <div class="pilot-image-container">
                <img src="${equipo.imagenPilotoApoyo}" alt="${equipo.nombrePilotoApoyo}" class="pilot-image">
            </div>
        </div>
        `;
    }
}

// Iniciar la carga de datos cuando se carga la página
/* document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM cargado, iniciando carga de datos...');
    cargarDatosEquipos();
}); */