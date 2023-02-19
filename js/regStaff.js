//Constantes utilizadas
const urlEmployees = "http://localhost:3000/employees";

const addEmployees = () => {

  //Cargos la data de form a las variables
  const name = document.getElementById("nombre").value;
  const lastName = document.getElementById("apellido").value;
  const specialty = document.getElementById("especialidad").value;
  const mail = document.getElementById("correo").value;
  const pass = document.getElementById("password").value;
  const authorized = false;

  //creo la estructura de datos que pasare al Json
  const nuevoMedico = { name, lastName, specialty, mail, pass, authorized };

  registrarMedico(nuevoMedico);
}


const registrarMedico = async (medico) => {
  try {
    const response = await fetch(urlEmployees);
    if (!response.ok) {
      alert('Error al obtener la lista de médicos')
      throw new Error('Error al obtener la lista de médicos');
    }
    const medicos = await response.json();
    if (medicos.some(m => m.mail === medico.mail)) {
      alert('Error: el médico ya existe en la base de datos', medico.name, medico.mail);
      return;
    }
    //Grabo los datos en la base de datos
    const postResponse = await fetch(urlEmployees, {
      method: 'POST',
      body: JSON.stringify(medico),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!postResponse.ok) {
      throw new Error('Error al guardar los datos del médico');
    }
    alert('El médico ha sido registrado exitosamente. Espere a la autorizacion del Administrador.', medico.name, medico.mail);
    //redirigir al login medico.
    window.location = ("https://www.lagaceta.com.ar/")
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        event.preventDefault();
        addEmployees();
      }

      form.classList.add('was-validated')
    }, false)
  })
})()




// en construccion
const buscarMedico = async (mail, nombre) => {
  try {
    const response = await fetch(urlEmployees);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de médicos');
    }
    const medicos = await response.json();
    return medicos.some(medico => medico.mail === mail && medico.name === nombre);
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};

const buscarYMostrarMedico = async (mail, nombre) => {
  try {
    const encontrado = await buscarMedico(mail, nombre);
    if (encontrado) {
      console.log('El médico fue encontrado ', nombre, mail);
    } else {
      console.log('El médico no fue encontrado', nombre, mail);
    }
  } catch (error) {
    console.error('Error al buscar el médico:', error);
  }
};

// const nMedico = {
//   nombre: 'Alejandro',
//   mail: 'ale@ale.com'
// };
// const nMedico2 = {
//   nombre: 'EDUARDO',
//   mail: 'EDUARDO.COMOTTI@GMAIL.COM'
// };

//registrarMedico(nuevoMedico);
//buscarYMostrarMedico(nMedico.mail, nMedico.nombre);
//buscarYMostrarMedico(nMedico2.mail, nMedico2.nombre);


