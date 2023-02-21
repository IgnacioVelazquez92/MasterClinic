//Constantes utilizadas.
const urlTurnos = "http://localhost:3000/turns";

//Obtener horarios disponibles por medico
const getllaibles = async (id) => {

  const urlTurnsDisp = `${urlTurnos}/?medico.id=${id}&asigando=false`

  try {
    const response = await fetch(urlTurnos);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de citas');
    }
    const turnos = await response.json();
    //const turnosPorPaciente = turnos.filter(cita => cita.paciente.id === id && cita.status === false);

    mostrarTurnos(turnosDisponiblesPorMedico);

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
      <td scope="col" class="text-center">
        <button type="button" class="btn btn-success  my-1" onclick="addCita(${cita.id})">Solicitar turnoS</button>
      </td>
    </tr>
     `
  });
}

//Inicio
//trear datos del localstorage
const datoPaciente = JSON.parse(localStorage.getItem('patientLog'));

const result = (datoPaciente === null ? true : false);
//Si no existen datos manda al Login
if (!result) {

  const contenido = document.querySelector('#patientName');
  contenido.innerHTML = `Bienvenido Sr. ${datoPaciente.name}`;
  (datoPaciente.id);

} else {

  alert("Debe realizar el login anted de ingresar.");
  location = ("../../pages/patients/loginPatients.html");

}