//Constantes utilizadas.
const urlTurnos = "http://localhost:3000/turns";

// const closeSesion= ()=>{
//   localStorage.removeItem("patientLog");
//   window.location="../../index.html";
// }

//agregar cita con el Medico
const addCita = async () => {

  //Cargos la data para pasar al Fetch
  const fecha = "2023-02-20";
  const hora = "10:00";
  const medico = 12;
  const paciente = "ALEJANDRO VILLARREAL";
  const asunto = "Asuntos varios. jajajaj";
  const status = false;
  //creo la estructura de datos que pasare al Json
  const cita = { fecha, hora, medico, paciente, asunto, status };
  try {
    //Agrego datos de la cita
    const postResponse = await fetch(urlTurnos, {
      method: 'POST',
      body: JSON.stringify(cita),
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

//Obtener datos de las citas por paciente
const getTurnosByIdPatient = async (id) => {
  try {
    const response = await fetch(urlTurnos);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de citas');
    }
    const turnos = await response.json();
    const turnosPorPaciente = turnos.filter(cita => cita.paciente.id === id && cita.status === false);

    mostrarTurnos(turnosPorPaciente);

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
//Mostrar las citas en el form.
const mostrarTurnos = (datos) => {
  const contenido = document.querySelector('#tabPendiente');
  contenido.innerHTML = '';

  datos.forEach(cita => {
    contenido.innerHTML += `
    <tr>
      <th scope="row" class="text-center">${cita.id}</th>
      <td class="text-center">${cita.fecha}</td>
      <td class="text-center">${cita.hora}</td>
      <td class="text-center">${cita.medico.fullname}</td>
      <td class="text-center">${cita.asunto}</td>
      <td scope="col" class="text-center">
        <button type="button" class="btn btn-danger">Eliminar Cita</button>
      </td>
    </tr>
     `
  });
}

//Obtener horarios disponibles por medico y fecha
//Eliminar cita

//Inicio
//trear datos del localstorage
var datoPaciente = JSON.parse(localStorage.getItem('patientLog'));

const result = (datoPaciente === null ? true : false);
//Si no existen datos manda al Login
if (!result) {

  const idMedico = datoPaciente.id;
  const contenido = document.querySelector('#patientName');
  contenido.innerHTML = `Bienvenido Sr. ${datoPaciente.name}`;
  getTurnosByIdPatient(datoPaciente.id);

} else {

  alert("Debe realizar el login anted de ingresar.");
  location = ("../../pages/patients/loginPatients.html");

}
