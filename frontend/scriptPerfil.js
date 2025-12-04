
console.log("=== DEBUG INICIAL ===");
console.log("URL completa:", window.location.href);
console.log("Pathname:", window.location.pathname);
console.log("¿Existe .fondo-color?", !!document.querySelector(".fondo-color"));
console.log("¿Existe #logo-equipo?", !!document.getElementById("logo-equipo"));
console.log("¿Existe #nombre-equipo?", !!document.getElementById("nombre-equipo"));

let arrayEquipos = [];

async function cargarPerfilEquipo() {
    console.log("Cargando perfil del equipo...");
    const params = window.location.pathname.split("/");
    const teamId = params[params.length - 1];
    console.log("ID del equipo: ",teamId);

    if (!teamId) {
        console.error("No se especificó equipo en la URL");
        return;
    }

    try {
        const response = await fetch(`/api/equipos/${teamId}`);
        if (!response.ok) {
            if(response.status === 404) {
                throw new Error('Equipo no encontrado');
            }
            throw new Error(`Error al obtener datos del equipo: ${response.statusText}`);
        }
        const equipo = await response.json();
        console.log(`Datos del equipo obtenidos: ${equipo}`);

        mostrarPerfilEquipo(equipo);

    } catch (error) {
        console.error('Error al cargar el perfil del equipo:', error);
        document.getElementById("equipo-perfil").innerHTML = `<p class="error-message">No se pudo cargar el perfil del equipo. Por favor, inténtelo de nuevo más tarde.</p>`;
    }
}

cargarPerfilEquipo();

function mostrarPerfilEquipo(equipo) {
    
    const equipo = arrayEquipos.find(e => e.id === teamId);
    const fondo = document.querySelector(".fondo-color");
    
    if (!fondo) {
        console.error("No se encontró .fondo-color en el DOM");
        return;
    }

    if (equipo && fondo) {
        document.getElementById("logo-equipo").src = equipo.logo;
        document.getElementById("nombre-equipo").textContent = equipo.nombre;
        document.getElementById("nombre-equipo").textContent = equipo.nombre;
        // document.getElementById("historia-equipo").textContent = equipo.historia; esto lo saqué pq me daba problema a la carga que venía después
        fondo.style.background = equipo.colorFondo;

        //cargo los pilotos del equipo correspondiente
        cargarPilotos(equipo);
    }
}



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