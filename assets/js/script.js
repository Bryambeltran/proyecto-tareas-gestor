// assets/js/script.js

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Elementos del HTML real
const formulario = document.getElementById("formulario3");
const descripcion = document.getElementById("descripcion");
const prioridad = document.getElementById("prioridad");
const fecha = document.getElementById("fecha");

// Cargar al iniciar
renderizarTareas("pendientes");
renderizarTareas("en-progreso");
renderizarTareas("completadas");

// Evento formulario
formulario.addEventListener("submit", agregarNuevaTarea);

// ===============================
// AGREGAR TAREA
// ===============================
function agregarNuevaTarea(e) {
    e.preventDefault();

    const nuevaTarea = {
        id: Date.now(),
        descripcion: descripcion.value,
        prioridad: prioridad.value,
        fecha: fecha.value,
        estado: "pendientes"
    };

    tareas.push(nuevaTarea);
    guardarTareas();

    renderizarTareas("pendientes");
    formulario.reset();
}

// ===============================
// RENDERIZAR
// ===============================
function renderizarTareas(estado) {

    const columna = document.querySelector(`#${estado} .tareas-container`);
    const contador = document.querySelector(`#${estado} .contador`);

    let html = "";

    tareas
        .filter(tarea => tarea.estado === estado)
        .forEach(tarea => {

            let boton = "";

            if (estado === "pendientes") {
                boton = `
                <button onclick="cambiarEstado(${tarea.id}, 'en-progreso')">
                    Pasar a En Progreso
                </button>`;
            }

            else if (estado === "en-progreso") {
                boton = `
                <button onclick="cambiarEstado(${tarea.id}, 'completadas')">
                    Completar
                </button>`;
            }

            html += `
            <div class="tarea ${tarea.prioridad}">
                <h4>${tarea.descripcion}</h4>
                <p><strong>Prioridad:</strong> ${tarea.prioridad}</p>
                <p><strong>Fecha:</strong> ${tarea.fecha}</p>
                ${boton}
                <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </div>
            `;
        });

    columna.innerHTML = html;
    contador.textContent = tareas.filter(t => t.estado === estado).length;
}

// ===============================
// CAMBIAR ESTADO
// ===============================
function cambiarEstado(id, nuevoEstado) {

    const tarea = tareas.find(t => t.id === id);

    if (tarea) {
        const estadoAnterior = tarea.estado;
        tarea.estado = nuevoEstado;

        guardarTareas();

        renderizarTareas(estadoAnterior);
        renderizarTareas(nuevoEstado);
    }
}

// ===============================
// ELIMINAR
// ===============================
function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();

    renderizarTareas("pendientes");
    renderizarTareas("en-progreso");
    renderizarTareas("completadas");
}

// ===============================
// LOCAL STORAGE
// ===============================
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}
// Espera a que cargue el HTML
document.addEventListener("DOMContentLoaded", () => {
  const agenda = document.getElementById("agenda");

  agenda.addEventListener("click", () => {
    // Crear fondo oscuro
    const overlay = document.createElement("div");
    overlay.id = "overlay";

    // Crear ventana flotante
    const modal = document.createElement("div");
    modal.id = "modal";

    // Imagen agrandada
    const img = document.createElement("img");
    img.src = agenda.src;
    img.alt = "Agenda ampliada";

    modal.appendChild(img);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Cerrar al hacer click fuera de la imagen
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
  });
});