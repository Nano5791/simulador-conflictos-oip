// Base de datos del flujo - Mapeo completo del Excel
const flujo = {
  inicio: {
    pregunta: "¿Eres funcionario público equivalente o superior a Director/a General del Poder Ejecutivo de la Ciudad, o máxima autoridad de un Ente Descentralizado o Sociedad de la Ciudad?",
    opciones: [
      { texto: "Sí", proximo: "tipo_actividad" },
      { texto: "No", proximo: "fui_funcionario" }
    ]
  },

  tipo_actividad: {
    pregunta: "¿Tu actividad es de carácter privada?",
    opciones: [
      { texto: "Privada", proximo: "actividad_privada_prevista" },
      { texto: "Pública", proximo: "no_conflicto" },
      { texto: "Ninguna de las anteriores", proximo: "consulta_ofip" }
    ]
  },

  actividad_privada_prevista: {
    pregunta: "¿Además del cargo público, tienes previsto desarrollar otra actividad privada?",
    opciones: [
      { texto: "Sí", proximo: "socio_sociedad" },
      { texto: "No", proximo: "no_conflicto" }
    ]
  },

  socio_sociedad: {
    pregunta: "¿Vas a constituir una sociedad o adquirir participación en una existente? (art. 27 inc. d)",
    opciones: [
      { texto: "Sí", proximo: "objeto_social_propio" },
      { texto: "No", proximo: "es_docente" }
    ]
  },

  objeto_social_propio: {
    pregunta: "¿El objeto social de la sociedad se encuentra bajo tu ámbito de competencia?",
    opciones: [
      { texto: "Sí", proximo: "influencia_cotizacion" },
      { texto: "No", proximo: "es_docente" }
    ]
  },

  influencia_cotizacion: {
    pregunta: "¿La cotización de la sociedad puede verse influenciada por los actos que emitas en razón de tu cargo? (art. 37 inc. a)",
    opciones: [
      { texto: "Sí", proximo: "incompatibilidad_actividad" },
      { texto: "No", proximo: "es_docente" }
    ]
  },

  es_docente: {
    pregunta: "¿Es una actividad docente?",
    opciones: [
      { texto: "Sí", proximo: "recomendacion_docente" },
      { texto: "No", proximo: "provee_bienes" }
    ]
  },

  provee_bienes: {
    pregunta: "¿Provees o vas a proveer bienes o servicios al organismo donde ejerces funciones o a entidades bajo tu jurisdicción? (art. 26 inc. b)",
    opciones: [
      { texto: "Sí", proximo: "incompatibilidad_bienes" },
      { texto: "No", proximo: "relaciones_fiscalizadas" }
    ]
  },

  relaciones_fiscalizadas: {
    pregunta: "¿Diriges, asesoras o mantienes relaciones contractuales con empresas directamente fiscalizadas por tu organismo? (art. 26 inc. c)",
    opciones: [
      { texto: "Sí", proximo: "consulta_ofip" },
      { texto: "No", proximo: "no_conflicto" }
    ]
  },

  fui_funcionario: {
    pregunta: "¿Fuiste funcionario público?",
    opciones: [
      { texto: "Sí", proximo: "anio_desvinculacion" },
      { texto: "No", proximo: "va_a_ser_designado" }
    ]
  },

  anio_desvinculacion: {
    pregunta: "¿Pasó más de un año desde que dejaste la función pública? (art. 51)",
    opciones: [
      { texto: "Sí", proximo: "no_incompatibilidad" },
      { texto: "No", proximo: "no_incompatibilidad" }
    ]
  },

  va_a_ser_designado: {
    pregunta: "¿Vas a ser designado en un nuevo cargo público?",
    opciones: [
      { texto: "Sí", proximo: "cargo_regula_entidad" },
      { texto: "No", proximo: "no_incompatibilidad" }
    ]
  },

  cargo_regula_entidad: {
    pregunta: "¿Tu nuevo cargo está en un organismo que controla o regula la entidad en la que trabajaste? (art. 50)",
    opciones: [
      { texto: "Sí", proximo: "anio_desvinculacion" },
      { texto: "No", proximo: "intervino_privatizacion" }
    ]
  },

  intervino_privatizacion: {
    pregunta: "¿Interviniste en procesos de privatización o concesión de servicio público? (art. 50)",
    opciones: [
      { texto: "Sí", proximo: "tres_anios_privatizacion" },
      { texto: "No", proximo: "no_incompatibilidad" }
    ]
  },

  tres_anios_privatizacion: {
    pregunta: "¿Han transcurrido más de 3 años desde tu última intervención en procesos de privatización o concesión?",
    opciones: [
      { texto: "Sí", proximo: "no_incompatibilidad" },
      { texto: "No", proximo: "consulta_ofip" }
    ]
  },

  // Resultados finales
  no_conflicto: {
    tipo: "resultado",
    mensaje: "No se visualiza una situación de conflicto de intereses."
  },

  no_incompatibilidad: {
    tipo: "resultado",
    mensaje: "NO HAY LIMITACIÓN/INCOMPATIBILIDAD."
  },

  incompatibilidad_actividad: {
    tipo: "resultado",
    mensaje: "La actividad es incompatible con el ejercicio de la función pública. Comuníquese con la OFIP.",
    clase: "advertencia"
  },

  incompatibilidad_bienes: {
    tipo: "resultado",
    mensaje: "Usted se encuentra realizando una actividad incompatible con la función pública. Comuníquese con la OFIP.",
    clase: "advertencia"
  },

  recomendacion_docente: {
    tipo: "resultado",
    mensaje: "En principio, la actividad docente es compatible con el ejercicio de la función pública. Igualmente, se sugiere que consultes tu situación con la OFIP."
  },

  consulta_ofip: {
    tipo: "resultado",
    mensaje: "En principio, la actividad es compatible con el ejercicio de la función pública. Sin embargo, se sugiere que consultes con la OFIP."
  }
};

// Variables de estado
let pasoActual = null;
let temporizador = null;
let segundos = 0;

// Elementos del DOM
const preguntaContainer = document.getElementById("pregunta-container");
const resultadoDiv = document.getElementById("resultado");
const btnInicio = document.getElementById("btn-inicio");
const contadorDiv = document.createElement("div");

// Agregar contador al DOM
contadorDiv.id = "contador";
contadorDiv.style.fontSize = "0.9em";
contadorDiv.style.color = "#666";
contadorDiv.style.marginTop = "10px";
contadorDiv.style.textAlign = "right";
contadorDiv.classList.add("oculto");
document.querySelector(".container").appendChild(contadorDiv);

// Formatear tiempo: segundos → mm:ss
function formatearTiempo(seg) {
  const mins = Math.floor(seg / 60);
  const secs = seg % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Iniciar simulador
btnInicio.addEventListener("click", () => {
  if (btnInicio.textContent === "Iniciar" || btnInicio.textContent === "Volver a empezar") {
    pasoActual = "inicio";
    segundos = 0;
    contadorDiv.classList.remove("oculto");
    contadorDiv.textContent = `Tiempo: 00:00`;

    if (temporizador) clearInterval(temporizador);
    temporizador = setInterval(() => {
      segundos++;
      contadorDiv.textContent = `Tiempo: ${formatearTiempo(segundos)}`;
    }, 1000);

    btnInicio.classList.add("oculto");
    resultadoDiv.classList.add("oculto");
    preguntaContainer.innerHTML = "";
    mostrarPregunta(pasoActual);
  }
});

// Mostrar una pregunta
function mostrarPregunta(id) {
  const nodo = flujo[id];
  if (!nodo) return;

  if (nodo.tipo === "resultado") {
    clearInterval(temporizador);
    mostrarResultado(nodo.mensaje, nodo.clase);
    return;
  }

  preguntaContainer.innerHTML = `
    <p><strong>${nodo.pregunta}</strong></p>
    <div class="opciones">
      ${nodo.opciones.map(op => 
        `<button onclick="irA('${op.proximo}')">${op.texto}</button>`
      ).join('')}
    </div>
  `;
}

// Ir a siguiente paso
function irA(proximo) {
  pasoActual = proximo;
  mostrarPregunta(proximo);
}

// Mostrar resultado final
function mostrarResultado(mensaje, clase = "") {
  preguntaContainer.innerHTML = "";
  resultadoDiv.innerHTML = `
    <p class="${clase} recomendacion">${mensaje}</p>
    <p><strong>Tiempo total: ${formatearTiempo(segundos)}</strong></p>
  `;
  resultadoDiv.classList.remove("oculto");

  btnInicio.textContent = "Volver a empezar";
  btnInicio.classList.remove("oculto");
}