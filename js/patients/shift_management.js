//Constantes utilizadas.
const urlTurnos = "http://localhost:3000/turns";



//agregar cita con el Medico
const addCita = async () => {

  //Data medico
  let id = 4; //idMedico
  let fullname = "DANIELA LIONETTI"; //Nombre completo medico
  const medico = { id, fullname };

  //Data paciente
  id = 3; //idpaciente
  fullname = "AGUIRRE MARIO"; //Nombre completo paciente
  const paciente = { id, fullname };

  const fecha = "2023-02-20";
  const hora = "10:00";
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


//Genear turno por medico para el dia de hoy
const addTurnosPorMedicoYFecha = async () => {

  let fechaHoy = new Date();
  let cFechaHoy;
  cFechaHoy = fechaHoy.getFullYear() + "-";
  cFechaHoy += (fechaHoy.getMonth() + 1) + "-";
  cFechaHoy += fechaHoy.getDate()

  //Data medico
  let id = 4; //idMedico
  let fullname = "DANIELA LIONETTI"; //Nombre completo medico
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
  horariosParaTurnos.map((hturnos) => {
    let hora = hturnos;
    DataParaRegistrar = { fecha, hora, medico, asignado };
    addData(DataParaRegistrar);
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

//Obtener horarios disponibles por medico y fecha
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
        <button type="button" class="btn btn-danger my-1" onclick="eliminarCita(${cita.id})">Eliminar</button>
      </td>
    </tr>
     `
  });
}