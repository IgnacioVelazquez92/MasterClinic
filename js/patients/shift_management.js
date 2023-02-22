//Constantes utilizadas.
const urlTurnos = "http://localhost:3000/turns";
const urlEmployees = "http://localhost:3000/employees";

// Obtener horarios disponibles por medico
// Retorna un array con los turnos disponibles de la fecha
const getTurnosDisponibles = async (idMedico, fecha) => {

  const id = idMedico;
  const cfecha = fecha;

  const urlTurnosDisp = `${urlTurnos}/?medico.id=${id}&fecha=${cfecha}`;
  const horariosParaTurnos = ["08:00", "09:00", "10:00", "11:00", "16:00", "17:00", "18:00", "19:00"];
  let cHora = "";
  let turnosDisponibles = "";

  try {
    const response = await fetch(urlTurnosDisp);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de citas');
    }
    const turnos = await response.json();
    let tDisp = [];

    for (let i = 0; i < horariosParaTurnos.length; i++) {
      const ccHora = turnos.find(t => t.hora === horariosParaTurnos[i]);
      if (ccHora === undefined) {
        tDisp.push(horariosParaTurnos[i]);
      }
    }
    return tDisp;
  }
  catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

//
const ver = () => {
  registrarCitaMedica();
}
// Preparar los datos para dar de alta la cita medica 
const registrarCitaMedica = async () => {

  //Datos de la cita 
  //reemplazar por el valores del form
  const fecha = document.getElementById('inputFecha').value; //cFechaHoy;
  const hora = document.getElementById('turnoSelect').value; //"10:00";
  const asunto = document.getElementById('asunto').value;//"Dolor de cabeza"
  //document.getElementById('asunto')
  //campo asignado ver de cambiar porque no lo utilizariamos
  const asignado = true; //true: el horario fue asigando a un paciente. false: Horario Sin asignar.
  const status = false; //false: Cita sin realizarse. true: cita realizada por el medico.

  //Datos del medico

  let id = document.getElementById('medicoSelect').value; //id del Medico
  let fullname = document.getElementById(id).getAttribute("fullname");
  const medico = { id, fullname };

  //Datos del paciente paciente
  id = datoPaciente.id; //idpaciente
  fullname = datoPaciente.name + " " + datoPaciente.lastName; //Nombre completo paciente
  const paciente = { id, fullname };
  const DataCita = { fecha, hora, asunto, medico, paciente, status, asignado };
  //console.log(DataCita)
  addDataCita(DataCita);
}

//Grabo la cita en Turns
const addDataCita = async (data) => {
  try {
    //Agrego la cita en turnos
    const postResponse = await fetch(urlTurnos, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!postResponse.ok) {
      throw new Error('Error al guardar los datos de la cita medica.');
    }
    alert('La cita ha sido registrada exitosamente.');
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

//Obtener Lista Medicos por especialidad
const queSelecciono = async () => {
  const specialty = document.getElementById("especialidad").value;
  try {
    const urlEdit = `${urlEmployees}/?specialty=${specialty}`;
    const postResponse = await fetch(urlEdit);
    if (!postResponse.ok) {
      throw new Error('Error al solicitar los datos de medicos.');
    }
    const listMedic = await postResponse.json();
    mostrarMedicosForm(listMedic);
    //    console.log('Lista resuelta exitosamente.');

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }

}

//Mostrar lista de medicos por especialidad en el form.
const mostrarMedicosForm = (datos) => {
  const contenido = document.getElementById('medicoSelect');
  contenido.innerHTML = '<option selected disabled value="">Seleccione el Médico</option>'
  datos.forEach(dataMedic => {
    contenido.innerHTML += `
      <option id="${dataMedic.id}" value="${dataMedic.id}" fullName="${dataMedic.name} ${dataMedic.lastName}">${dataMedic.name} ${dataMedic.lastName}</option>
     `
  });
}

const verTurnosDisp = async () => {

  //tomar la fecha y buscar los turnos disponibles
  const idMed = document.getElementById('medicoSelect').value;
  const dFecha = document.getElementById('inputFecha').value;;
  const tDisp = await getTurnosDisponibles(idMed, dFecha);
  // Mostrar los turnos en un select
  const contTDisp = document.getElementById('turnoSelect');
  contTDisp.innerHTML = '<option selected disabled value="">Seleccione el turno</option>'
  tDisp.forEach(td => {
    contTDisp.innerHTML += `
      <option>${td}</option>
     `
  });
}

//Inicio
//trear datos del localstorage
const datoPaciente = JSON.parse(localStorage.getItem('patientLog'));

const fechaHoy = new Date();
const año = fechaHoy.getFullYear();
const mes = (fechaHoy.getMonth() + 1);
const dia = fechaHoy.getDate()

//inserto funcionamiento en al input date
const contFecha = document.getElementById('inputFecha');

//paso la fecha de hoy a al input formato "yyyy-mm-dd"
contFecha.innerHTML = ` 
  <input type="date" 
  class="form-control" required
  id="inputFecha" 
  onchange="verTurnosDisp()" 
  value="${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}">
`

const result = (datoPaciente === null ? true : false);
//Si no existen datos manda al Login
if (!result) {

  const contenido = document.querySelector('#patientName');
  contenido.innerHTML = `Bienvenido Sr. ${datoPaciente.name}`;
  (datoPaciente.id);

} else {

  alert("Debe realizar el login anted de ingresar.");
  window.location = ("../../pages/patients/loginPatients.html");

}