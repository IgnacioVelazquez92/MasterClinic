//Constantes utilizadas.
const urlPacientes = "http://localhost:3000/patients";
const urlTurnos = "http://localhost:3000/turns";
const urlMedicos = "http://localhost:3000/employees";

//Obtengo la lista de los mmedicos para luego utilizar
try {
  const response = await fetch(urlEmployees);
  if (!response.ok) {
    throw new Error('Error al obtener la lista de medicos.');
  }
  const ListaMedicos = await response.json();
} catch (error) {
  console.error('Error al realizar la solicitud:', error);
}


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
const getTurnosByIdPatients = async (id) => {
  try {
    const response = await fetch(urlTurnos);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de citas');
    }
    const turnos = await response.json();
    const turnosPorPaciente = turnos.filter(cita => cita.patientid === id && cita.status === false);

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
      <td class="text-center">${cita.paciente}</td>
      <td class="text-center">${cita.asunto}</td>
      <td scope="col" class="text-center">
        <button type="button" class="btn btn-success" onclick="citaRealizada(${cita.id})">Realizada</button>
      </td>
    </tr>
     `
  });
}

//Obtener listas de Especialidades
//Obtener lista de Medicos por Especialidad

//Obtener lista de medicos
const getEmployees = async () => {
  try {
    const response = await fetch(urlEmployees);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de medicos.');
    }
    const ListaMedicos = await response.json();
    return ListaMedicos;

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
const list =
  getEmployees()
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error("Error:", error);
    })

  // then((response) => response.json())
  //     .then((data) => {
  //       alert("Solicitud de Registro enviada! por favor aguarde la autorización");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     })

//Obtener horarios disponibles por medico y fecha
//Eliminar cita

