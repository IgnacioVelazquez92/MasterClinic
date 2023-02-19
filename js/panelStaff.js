//Constantes utilizadas
const urlTurnos = "http://localhost:3000/turnos";

const idMedico = 4;
const traer = () => {

  getTurnosByIdEmployees(idMedico);

}

const getTurnosByIdEmployees = async (id) => {
  try {
    const response = await fetch(urlTurnos);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de médicos');
    }
    const turnos = await response.json();
    const turnosPorMedico = turnos.filter(m => m.medico === id);

    mostrarTurnos(turnosPorMedico);

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

const mostrarTurnos = (datos) => {
  const contenido = document.querySelector('#contenido');
  contenido.innerHTML = '';

  datos.forEach(element => {
    contenido.innerHTML += `
    <tr>
      <th scope="row">${element.id}</th>
      <td>${element.fecha}</td>
      <td>${element.hora}</td>
      <td>${element.paciente}</td>
    </tr>
    `
  });
}