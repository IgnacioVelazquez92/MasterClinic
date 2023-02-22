//Constantes utilizadas
const urlTurnos = "http://localhost:3000/turns";

//Obtener datos de las citas por medico
const getTurnosByIdEmployees = async (id) => {
  try {
    const response = await fetch(urlTurnos);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de citas');
    }
    const turnos = await response.json();
    //const turnosPorMedico = turnos.filter(cita => cita.medico === id && cita.status === false);
    const turnosPorMedico = turnos.filter(cita => cita.medico.id === id && cita.status === false);

    mostrarTurnos(turnosPorMedico);

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
//Mostrar los datos de las citas en el form.
const mostrarTurnos = (datos) => {
  const contAsignados = document.querySelector('#tabPendiente');
  const contSinAsignar = document.querySelector('#tabSinAsignar');
  contAsignados.innerHTML = '';
  contSinAsignar.innerHTML = '';

  datos.forEach(cita => {
    if (cita.asignado) {
      contAsignados.innerHTML += `
      <tr>
        <th scope="row" class="text-center">${cita.id}</th>
        <td class="text-center">${cita.fecha}</td>
        <td class="text-center">${cita.hora}</td>
        <td class="text-center">${cita.paciente.fullname}</td>
        <td class="text-center">${cita.asunto}</td>
        <td scope="col" class="text-center">
          <button type="button" class="btn btn-success" onclick="citaRealizada(${cita.id})">Realizada</button>
        </td>
      </tr>
       `

    } else {
      contSinAsignar.innerHTML += `
      <tr>
        <th scope="row" class="text-center">${cita.id}</th>
        <td class="text-center">${cita.fecha}</td>
        <td class="text-center">${cita.hora}</td>
      </tr>
       `

    }
  });
}
//Funcion que graba la cita que fue concretada.
const citaRealizada = async (id) => {
  try {
    const urlEdit = `${urlTurnos}/${id}`

    const status = true; //Turno realizado
    const data = { status };

    const postResponse = await fetch(urlEdit, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!postResponse.ok) {
      throw new Error('Error al guardar los datos del médico');
    }

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}



//********* Inicio ****************
//*********************************
//trear datos del localstorage
var datoMedico = JSON.parse(localStorage.getItem('staffLog'));

const result = (datoMedico === null ? true : false);
//Si no existen datos manda al Login
if (!result) {

  const contenido = document.querySelector('#staffName');
  contenido.innerHTML = `Bienvenido Dr./Dra.  ${datoMedico.name} ${datoMedico.lastName}`;
  getTurnosByIdEmployees(datoMedico.id);

} else {
  location = ("../../pages/staff/loginStaff.html");

}