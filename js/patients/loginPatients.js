//Constantes utilizadas
const urlPatients = "http://localhost:3000/patients";

const logPatients = () => {

  //Cargos la data de form a las variables
  const mail = document.getElementById("correo").value.toUpperCase();
  const pass = document.getElementById("password").value;
  //creo la estructura de datos que validare y se la paso a la función
  const logPatient = { mail, pass };
  loginPaciente(logPatient);
}

const loginPaciente = async (logPatient) => {
  try {
    const response = await fetch(urlPatients);
    if (!response.ok) {
      alert('Error al obtener la lista de médicos')
      throw new Error('Error al obtener la lista de médicos');
    }
    const patients = await response.json();

    let resultado = patients.filter((paciente => paciente.mail === logPatient.mail && paciente.pass === logPatient.pass))
    if (resultado.length > 0) {
      if (resultado[0].estado) {
        let logPatient = resultado[0]
        delete logPatient.pass;
        window.localStorage.setItem("patientLog", JSON.stringify(logPatient));
        //redirige de a Perfil Paciente
        window.location = ("../../pages/patients/perfilPatients.html")
      } else {
        alert("Su usuario esta siendo evaluado por el administrador")
      }
    } else {
      alert("Usuario o contraseña incorrectos")
    }
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
      event.preventDefault()
      if (!form.checkValidity()) {
        event.stopPropagation()
      } else {
        logPatients();
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
