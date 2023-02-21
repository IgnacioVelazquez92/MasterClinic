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

//Generar turno por medico para el dia de hoy
const addTurnosPorMedicoYFecha = async () => {

  let fechaHoy = new Date();
  let cFechaHoy;
  cFechaHoy = fechaHoy.getFullYear() + "-";
  cFechaHoy += (fechaHoy.getMonth() + 1) + "-";
  cFechaHoy += fechaHoy.getDate()

  //Data medico
  let id = datoMedico.id; //id del Medico
  let fullname = datoMedico.name + " " + datoMedico.lastName; //Nombre completo medico
  const medico = { id, fullname };

  //Data paciente
  // id = 3; //idpaciente
  // fullname = "AGUIRRE MARIO"; //Nombre completo paciente
  // const paciente = { id, fullname };

  const fecha = cFechaHoy
  //  const asunto = "Asuntos varios. jajajaj";
  const asignado = false;
  const status = false;

  const horariosParaTurnos = ["08:00", "09:00", "10:00", "11:00", "16:00", "17:00", "18:00", "19:00"];
  let DataParaRegistrar = "";
  // horariosParaTurnos.forEach((hturnos) => {
  //   let hora = hturnos;
  //   DataParaRegistrar = { fecha, hora, medico, asignado, status };
  //   addData(DataParaRegistrar);
  // });
  horariosParaTurnos.map(async (hturnos) => {
    let hora = hturnos;
    DataParaRegistrar = { fecha, hora, medico, asignado, status };
    const resul = await addData(DataParaRegistrar);
  });
}

const addData = async (data) => {
  try {
    //Agrego datos de la cita
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
    console.log('La cita ha sido registrada exitosamente.');
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
  contenido.innerHTML = `Bienvenido Dr. ${datoMedico.name}`;
  getTurnosByIdEmployees(datoMedico.id);

} else {

  alert("Debe realizar el login anted de ingresar.");
  location = ("../../pages/staff/loginStaff.html");

}