//Constantes utilizadas.
const urlTurnos = "http://localhost:3000/turns";


// const closeSesion= ()=>{
//   localStorage.removeItem("patientLog");
//   window.location="../../index.html";
// }

//Obtener datos de las citas por paciente
const getTurnosByIdPatient = async (id) => {
  try {
    const urlEdit = `${urlTurnos}/?asignado=true`;
    const response = await fetch(urlEdit);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de citas');
    }
    const turnos = await response.json();
    //console.log(turnos)
    const turnosPorPaciente = turnos.filter((cita) => cita.paciente.id === id);

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
        <button type="button" class="btn btn-danger my-1" onclick="eliminarCita(${cita.id})">Eliminar</button>
      </td>
    </tr>
     `
  });
}

//Eliminar cita por Id
const eliminarCita = async (id) => {
  try {
    const urlEdit = `${urlTurnos}/${id}`
    const response = await fetch(urlEdit, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la cita.');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

//Inicio
//trear datos del localstorage
const datoPaciente = JSON.parse(localStorage.getItem('patientLog'));

const result = (datoPaciente === null ? true : false);
//Si no existen datos manda al Login
if (!result) {

  const contenido = document.querySelector('#patientName');
  contenido.innerHTML = `Bienvenido Sr. ${datoPaciente.name}`;
  getTurnosByIdPatient(datoPaciente.id);

} else {

  alert("Debe realizar el login anted de ingresar.");
  location = ("../../pages/patients/loginPatients.html");

}