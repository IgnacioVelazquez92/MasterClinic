//Constantes utilizadas
const urlEmployees = "http://localhost:3000/employees";

const logEmployees = () => {

  //Cargos la data de form a las variables
  const mail = document.getElementById("correo").value.toUpperCase();
  const pass = document.getElementById("password").value;
  //creo la estructura de datos que validare y se la paso a la función
  const logMedico = { mail, pass};
  loginMedico(logMedico);
}

const loginMedico = async (logMedico) => {
  try {
    const response = await fetch(urlEmployees);
    if (!response.ok) {
      alert('Error al obtener la lista de médicos')
      throw new Error('Error al obtener la lista de médicos');
    }
    const medicos = await response.json();

    let resultado= medicos.filter((medico => medico.mail === logMedico.mail && medico.pass === logMedico.pass))
    if (resultado.length>0) {
      if (resultado[0].authorized) {
        let logStaff=resultado[0]
        delete logStaff.pass;
        window.localStorage.setItem("staffLog",JSON.stringify(logStaff));
        //redirige de acuerdo si es medico o administrador
        if (resultado[0].isAdmin) {
          window.location=("../../pages/staff/perfilAdmin.html")
        } else {
          window.location=("../../pages/staff/perfilStaff.html")
        }
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
        logEmployees();
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
