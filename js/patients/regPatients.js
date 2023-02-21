const urlPatients = "http://localhost:3000/patients";
let dBase;

// Funcion para obtener en la cartilla
const dataBase = async () => {

  await fetch(urlPatients, {
    method: "GET"
  })
    .then((r) => r.json())
    .then((resp) => dBase = resp)
    .catch((error) => console.error(error))
  return dBase
}
dBase = dataBase();

//JavaScript de inicio para deshabilitar el envío de formularios si hay campos no válidos
(() => {
  'use strict'

  // Obtener todos los forms a los que queremos aplicar estilos de validación de Bootstrap personalizados
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation()
      } else {
        let logueado = registrarPatients();
        if (logueado) {
          window.location = ("../../pages/patients/loginPatients.html");
        }
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

const registrarPatients = () => {
  //Cargos la data de form a las variables
  const name = document.getElementById("nombre").value.toUpperCase();
  const lastName = document.getElementById("apellido").value.toUpperCase();
  const mail = document.getElementById("correo").value.toUpperCase();
  const pass = document.getElementById("password").value;
  const estado = true;
  let patient;
  //chequear mail si ya se encuentra registrado
  const coincidencia = dBase.some(x => x.mail === mail)
  if (coincidencia) {
    alert("El mail se encuentra registrado")
    return
  } else {
    patient = { name, lastName, mail, pass, estado };

    fetch(urlPatients, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Solicitud de Registro enviada! por favor aguarde la autorización");
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  }
  return patient
};