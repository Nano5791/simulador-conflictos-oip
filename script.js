// Base de datos del flujo (tu simulador completo)
const flujo = {
  nombre_usuario: {
    pregunta: "Para comenzar, por favor ingrese su nombre y apellido:",
    tipo: "texto",
    siguiente: "inicio"
  },
  inicio: {
    pregunta: "¿Cuál es tu situación actual?",
    tipo: "multiple_choice",
    opciones: [
      { valor: "soy_funcionario", texto: "Soy funcionario/a - agente público", siguiente: "jerarquia_actual" },
      { valor: "fui_funcionario", texto: "Fui funcionario/a", siguiente: "fue_sujeto_ddjj" },
      { valor: "voy_a_ser_designado", texto: "Voy a ser designado en un nuevo cargo público", siguiente: "jerarquia_futura" }
    ]
  },
  // === RAMA 1: SOY FUNCIONARIO ===
  jerarquia_actual: {
    pregunta: "¿Cuál es tu jerarquía actual?",
    tipo: "multiple_choice",
    opciones: [
      { 
        valor: "director_general_superior", 
        texto: "EQUIVALENTE o SUPERIOR a Director/a General del Poder Ejecutivo de la Ciudad, o soy MÁXIMA AUTORIDAD de Ente Descentralizado o Sociedad de la Ciudad", 
        siguiente: "actividad_junto_cargo_alto" 
      },
      { 
        valor: "agente_publico", 
        texto: "Soy funcionario/a - agente público", 
        siguiente: "actividad_junto_cargo_basico" 
      }
    ]
  },

  actividad_junto_cargo_alto: {
    pregunta: "¿Desarrollás otra actividad junto al cargo?",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "SÍ", siguiente: "tipo_actividad_privada_alto" },
      { valor: "no", texto: "NO", resultado: "NO HAY LIMITACIÓN/INCOMPATIBILIDAD" }
    ]
  },

  actividad_junto_cargo_basico: {
    pregunta: "¿Desarrollás otra actividad junto al cargo?",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "SÍ", siguiente: "tipo_actividad_privada_basico" },
      { valor: "no", texto: "NO", resultado: "No se visualiza una situación de conflicto de intereses." }
    ]
  },

  tipo_actividad_privada_alto: {
    pregunta: "¿Qué tipo de actividad desarrollás?",
    tipo: "multiple_choice",
    opciones: [
      { valor: "instituciones_no_estatales", texto: "Soy socio, asociado, directivo, presto servicios a instituciones no estatales", siguiente: "evaluacion_conflicto_servicios_alto" },
      { valor: "forma_autonoma", texto: "En forma autónoma, individual, personal o independiente", siguiente: "tipo_profesion_liberal_alto" },
      { valor: "docencia", texto: "Ejerzo la docencia", siguiente: "recomendacion_docente" }
    ]
  },

  tipo_actividad_privada_basico: {
    pregunta: "¿Qué tipo de actividad desarrollás?",
    tipo: "multiple_choice",
    opciones: [
      { valor: "instituciones_no_estatales", texto: "Soy socio, asociado, directivo, presto servicios a instituciones no estatales", siguiente: "evaluacion_conflicto_servicios_basico" },
      { valor: "forma_autonoma", texto: "En forma autónoma, individual, personal o independiente", siguiente: "tipo_profesion_liberal_basico" },
      { valor: "docencia", texto: "Ejerzo la docencia", siguiente: "recomendacion_docente" }
    ]
  },

  evaluacion_conflicto_servicios_alto: {
    pregunta: "¿Tu actividad involucra alguna de estas situaciones?",
    tipo: "multiple_choice",
    opciones: [
      { valor: "vinculaciones_organismos", texto: "Tengo vinculaciones con organismos o empresas de la Ciudad (art. 27 inc. a)", siguiente: "conflicto_potencial" },
      { valor: "gestiones_representacion", texto: "Ejercés profesión liberal, prestás servicios, efectuás gestiones, dirigís, administrás, representás y/o patrocinás (art. 27 inc. b)", siguiente: "conflicto_potencial" },
      { valor: "instituciones_sectoriales", texto: "Sos socio, asociado, directivo o prestás servicios a instituciones no estatales dedicadas a defensa o representación de intereses económicos sectoriales (art. 27 inc. c)", siguiente: "conflicto_potencial" }
    ]
  },

  evaluacion_conflicto_servicios_basico: {
    pregunta: "¿Tu actividad involucra alguna de estas situaciones?",
    tipo: "multiple_choice",
    opciones: [
      { valor: "vinculaciones_organismos", texto: "Tengo vinculaciones con organismos o empresas de la Ciudad (art. 27 inc. a)", siguiente: "conflicto_potencial" },
      { valor: "gestiones_representacion", texto: "Ejercés profesión liberal, prestás servicios, efectuás gestiones, dirigís, administrás, representás y/o patrocinás (art. 27 inc. b)", siguiente: "conflicto_potencial" },
      { valor: "instituciones_sectoriales", texto: "Sos socio, asociado, directivo o prestás servicios a instituciones no estatales dedicadas a defensa o representación de intereses económicos sectoriales (art. 27 inc. c)", siguiente: "conflicto_potencial" }
    ]
  },

  tipo_profesion_liberal_alto: {
    pregunta: "¿Qué tipo de actividad profesional ejerces?",
    tipo: "multiple_choice",
    opciones: [
      { valor: "profesion_liberal", texto: "Ejerzo una profesión liberal de cualquier naturaleza en las que tengo vinculaciones con organismos (art. 27 inc. a)", siguiente: "es_docencia_profesion" },
      { valor: "servicios_remunerados", texto: "Ejerzo servicios, efectúo gestiones, dirijo, administro, represento y/o patrocino, en forma remunerada u honoraria (art. 27 inc. b)", siguiente: "conflicto_potencial" },
      { valor: "instituciones_sectoriales", texto: "Soy socio, asociado, directivo o presto servicios a instituciones no estatales (art. 27 inc. c)", siguiente: "conflicto_potencial" }
    ]
  },

  tipo_profesion_liberal_basico: {
    pregunta: "¿Qué tipo de actividad profesional ejerces?",
    tipo: "multiple_choice",
    opciones: [
      { valor: "profesion_liberal", texto: "Ejerzo una profesión liberal de cualquier naturaleza en las que tengo vinculaciones con organismos (art. 27 inc. a)", siguiente: "es_docencia_profesion" },
      { valor: "servicios_remunerados", texto: "Ejerzo servicios, efectúo gestiones, dirijo, administro, represento y/o patrocino, en forma remunerada u honoraria (art. 27 inc. b)", siguiente: "conflicto_potencial" },
      { valor: "instituciones_sectoriales", texto: "Soy socio, asociado, directivo o presto servicios a instituciones no estatales (art. 27 inc. c)", siguiente: "conflicto_potencial" }
    ]
  },

  es_docencia_profesion: {
    pregunta: "¿Es una actividad docente?",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "SÍ", siguiente: "recomendacion_docente" },
      { valor: "no", texto: "NO", siguiente: "conflicto_potencial" }
    ]
  },

  recomendacion_docente: {
    tipo: "resultado",
    mensaje: "En principio, la actividad docente que desarrollas simultáneamente no configura un conflicto de intereses, de todos modos, se sugiere que consultes tu situación con la OFIP."
  },

  conflicto_potencial: {
    tipo: "resultado",
    mensaje: "Podrías estar realizando una actividad privada sobre la cual es factible que se configure una incompatiblidad. Te recomendamos consultar tu situación en la OFIP."
  },

  // === RAMA 2: FUI FUNCIONARIO ===
  fue_sujeto_ddjj: {
    pregunta: "¿Fue sujeto obligado a presentar DDJJ art. 9?",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "SÍ", siguiente: "realizo_gestiones" },
      { valor: "no", texto: "NO", resultado: "NO HAY LIMITACIÓN/INCOMPATIBILIDAD" }
    ]
  },

  realizo_gestiones: {
    pregunta: "¿Realizás alguna de estas actividades?",
    tipo: "multiple_choice",
    opciones: [
      { valor: "gestiones_administrativas", texto: "Realizar gestiones administrativas o representar a terceros ante el organismo donde trabajaste o ante entidades bajo tu jurisdicción (art. 49 inc. a)", siguiente: "paso_un_ano_gestiones" },
      { valor: "juicios_ciudad", texto: "Participar en juicios contra la Ciudad de Buenos Aires como abogado, perito o de cualquier otra forma (art. 49 inc. b)", resultado: "NO HAY LIMITACIÓN/INCOMPATIBILIDAD" },
      { valor: "concesiones", texto: "Vender bienes o servicios, obtener concesiones o adjudicaciones en el organismo donde trabajaste, ya sea directamente o a través de terceros (art. 49 inc. c)", resultado: "NO HAY LIMITACIÓN/INCOMPATIBILIDAD" },
      { valor: "relaciones_contractuales", texto: "Mantener relaciones contractuales con entidades directamente fiscalizadas por el organismo en que trabajaste (art. 49 inc. d)", siguiente: "paso_un_ano_contractual" }
    ]
  },

  paso_un_ano_gestiones: {
    pregunta: "¿Pasó un año desde que se desempeñó en la función pública? (art. 51)",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "SÍ", resultado: "NO HAY LIMITACIÓN/INCOMPATIBILIDAD" },
      { valor: "no", texto: "NO", siguiente: "tipo_actividad_limitada" }
    ]
  },

  paso_un_ano_contractual: {
    pregunta: "¿Pasó un año desde que se desempeñó en la función pública? (art. 51)",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "SÍ", resultado: "NO HAY LIMITACIÓN/INCOMPATIBILIDAD" },
      { valor: "no", texto: "NO", siguiente: "tipo_actividad_limitada" }
    ]
  },

  tipo_actividad_limitada: {
    tipo: "resultado",
    mensaje: "Podrías estar realizando una actividad privada sobre la cual es factible que se configure una incompatiblidad. Te recomendamos consultar tu situación en la OFIP."
  },

  // === RAMA 3: VOY A SER DESIGNADO ===
  jerarquia_futura: {
    pregunta: "¿Cuál será tu jerarquía?",
    tipo: "multiple_choice",
    opciones: [
      { 
        valor: "director_general_superior", 
        texto: "Mi jerarquía será EQUIVALENTE o SUPERIOR a Director/a General del Poder Ejecutivo de la Ciudad, o seré MÁXIMA AUTORIDAD de Ente Descentralizado", 
        siguiente: "actividad_privada_futura" 
      },
      { 
        valor: "agente_publico", 
        texto: "Seré funcionario/a - agente público", 
        siguiente: "actividad_privada_futura_basico" 
      }
    ]
  },

  actividad_privada_futura: {
    pregunta: "¿Vas a desarrollar una actividad de carácter privada?",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "Voy a desarrollar una actividad de carácter privada", siguiente: "paso_un_ano" },
      { valor: "no", texto: "No", siguiente: "nuevo_cargo_publico" }
    ]
  },

  actividad_privada_futura_basico: {
    pregunta: "¿Vas a desarrollar una actividad de carácter privada?",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "Voy a desarrollar una actividad de carácter privada", siguiente: "paso_un_ano" },
      { valor: "no", texto: "No", siguiente: "nuevo_cargo_publico" }
    ]
  },

  paso_un_ano: {
    pregunta: "¿Pasó un año desde que se desempeñó en la función pública? (art. 49)",
    tipo: "yes_no",
    opciones: [
      { valor: "si", texto: "SÍ", resultado: "NO HAY INCOMPATIBILIDAD" },
      { valor: "no", texto: "NO", siguiente: "tipo_actividad_limitada" }
    ]
  },

  nuevo_cargo_publico: {
    resultado: "NO HAY LIMITACIÓN/INCOMPATIBILIDAD"
  }
};

// Variables de estado
let pasoActual = null;
let temporizador = null;
let segundos = 0;
let nombreUsuario = "";
let respuestas = {};
let tokenUsuario = "";

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

// Generar token único (8 caracteres)
function generarToken() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Formatear tiempo: segundos → mm:ss
function formatearTiempo(seg) {
  const mins = Math.floor(seg / 60);
  const secs = seg % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Iniciar simulador
btnInicio.addEventListener("click", () => {
  if (btnInicio.textContent.includes("Iniciar") || btnInicio.textContent.includes("Volver")) {
    pasoActual = "nombre_usuario";
    segundos = 0;
    respuestas = {};
    tokenUsuario = generarToken();

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

  if (id === "nombre_usuario") {
    preguntaContainer.innerHTML = `
      <p><strong>${nodo.pregunta}</strong></p>
      <input type="text" id="input-nombre" class="input-nombre" placeholder="Ej: María González" autofocus>
      <button onclick="guardarNombre()" class="btn-continuar">Continuar</button>
    `;
    return;
  }

  if (nodo.resultado) {
    clearInterval(temporizador);
    mostrarResultado(nodo.resultado);
    return;
  }

  if (nodo.tipo === "resultado") {
    clearInterval(temporizador);
    mostrarResultado(nodo.mensaje);
    return;
  }

  const preguntaTexto = nodo.pregunta;

  const opcionesHTML = nodo.opciones.map(op => 
    `<button onclick="irA('${op.siguiente || ''}', '${op.valor}', '${preguntaTexto}', '${op.texto}')">${op.texto}</button>`
  ).join('');

  preguntaContainer.innerHTML = `
    <p><strong>${nodo.pregunta}</strong></p>
    <div class="opciones">
      ${opcionesHTML}
    </div>
  `;
}

// Guardar nombre
function guardarNombre() {
  const input = document.getElementById("input-nombre");
  nombreUsuario = input.value.trim();
  if (!nombreUsuario) {
    alert("Por favor, ingrese su nombre.");
    return;
  }
  pasoActual = "inicio";
  mostrarPregunta(pasoActual);
}

// Ir a siguiente paso
function irA(proximo, valor = null, preguntaTexto = "", respuestaTexto = "") {
  if (preguntaTexto && respuestaTexto) {
    respuestas[preguntaTexto] = respuestaTexto;
  }

  if (proximo) {
    pasoActual = proximo;
    mostrarPregunta(proximo);
  } else {
    clearInterval(temporizador);
    mostrarResultado("Respuesta registrada. Gracias.");
  }
}

// Mostrar resultado final
function mostrarResultado(mensaje) {
  let respuestasHTML = "<h3>Respuestas:</h3><ul>";
  for (let preg in respuestas) {
    respuestasHTML += `<li><strong>${preg}</strong>: ${respuestas[preg]}</li>`;
  }
  respuestasHTML += "</ul>";

  const tiempoTotal = formatearTiempo(segundos);

  preguntaContainer.innerHTML = "";
  resultadoDiv.innerHTML = `
    <h3>Resultado para: ${nombreUsuario}</h3>
    <p><strong>Token de sesión:</strong> ${tokenUsuario}</p>
    <p><strong>Conclusión:</strong> ${mensaje}</p>
    ${respuestasHTML}
    <p><strong>Tiempo total: ${tiempoTotal}</strong></p>
    <button onclick="descargarPDF()" class="btn-csv">📄 Descargar como PDF</button>
  `;
  resultadoDiv.classList.remove("oculto");

  btnInicio.textContent = "Volver a empezar";
  btnInicio.classList.remove("oculto");
}

// Descargar resultado en PDF
function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Simulador de Conflictos de Interés", 20, 20);
  doc.setFontSize(12);
  doc.text(`Nombre: ${nombreUsuario}`, 20, 30);
  doc.text(`Token: ${tokenUsuario}`, 20, 40);
  doc.text(`Tiempo total: ${formatearTiempo(segundos)}`, 20, 50);

  let y = 60;
  doc.text("Resultado:", 20, y);
  y += 10;
  doc.setFont("helvetica", "italic");
  const mensaje = resultadoDiv.querySelector("p:nth-child(2)").textContent.replace("Conclusión: ", "");
  doc.text(mensaje, 20, y, { maxWidth: 170 });
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.text("Respuestas:", 20, y);
  y += 10;

  for (let preg in respuestas) {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(`${preg}: ${respuestas[preg]}`, 20, y);
    y += 8;
  }

  doc.save(`simulador_${tokenUsuario}.pdf`);
}