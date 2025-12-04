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
                        <a href = "equipos/${equipo.id}"><img src="${equipo.logoChico}" alt="${equipo.nombre}"></a>
                    </div>
                </div>
                <img src="${equipo.imagenAuto}" alt="auto Red Bull" class="auto-equipo">
            </div>
        `;
        listaEquipos.appendChild(li);
        console.log(li);
    });
};