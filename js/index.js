

// Funcion para buscar en la cartilla
const dataBase= async()=>{
  let dataBase;
  await fetch('http://localhost:3000/employees',{
    method:"GET"
  })
  .then((r)=>r.json())
  .then((resp)=>dataBase=resp)
  .catch((error)=>console.error(error))

  return dataBase.then(resp=>resp)
}


///////////
//Constsntes utilizadas
const urlEmployees = "http://localhost:3000/employees";
const urlPacientes = "http://localhost:3000/patients";
const urlTurnos = "http://localhost:3000/turns";




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
        // registrarMedicos()
        
      }else {
        registrarMedicos();
        alert("registro exitoso")
        
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


const registrarMedicos = () => {
  //Cargos la data de form a las variables
  const name = document.getElementById("nombre").value;
  const lastName = document.getElementById("apellido").value;
  const specialty = document.getElementById("especialidad").value;
  const mail = document.getElementById("correo").value;
  const pass = document.getElementById("password").value;
  const authorized=false;
  
  //falta chequear mail si ya se encuentra registrado


  //creo la esttuctura de datos que pasare al Json
  const medico = { name, lastName, specialty, mail, pass , authorized};

  fetch(urlEmployees, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medico),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Usuario registrado exitosamente");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

//Data Medicos por especialidad
const obtenerMedicosPorEspecialidad = (Especialidad) => { };

//Data del medico
const obtenerDataMedicoPorId = (id) => {
  fetch(urlEmployees)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error al obtener la lista de médicos");
      }
    })
    .then((data) => {
      // Código para procesar la lista de médicos obtenida

      const medicosFiltrados = data.filter(medico => medico.id === id);
      console.log(medicosFiltrados);
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
};
const obtenerDataMedicoPorEspecialidad = (especialidad) => {
  fetch(urlEmployees)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error al obtener la lista de médicos");
      }
    })
    .then((data) => {
      // Código para procesar la lista de médicos obtenida

      const medicosFiltrados = data.filter(medico => medico.specialty === especialidad);
      console.log(medicosFiltrados);
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
};

const busquedaMail = (mail) => {
  fetch(urlEmployees)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error al obtener la lista de médicos");
      }
    })
    .then((data) => {
      // Código para procesar la lista de médicos obtenida

      const medicosFiltrados = data.find(medico => medico.mail === mail);
      if(medicosFiltrados){
        
        //retorna true por que encontro coincidencia del mail en la base de datos
        return true
      }else{
        return false
      }
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
};

const getUsuarios = () => {
  fetch("usuarios.json")
    .then((response) => response.json())
    .then((data) => {
      const usuarios = data.usuarios;
      console.log(usuarios);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Obtener db

const getUser = () => {
  const urlUsers = "http://localhost:3000/medicos";

  fetch(urlUsers)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datoss de los usuarios");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  //fetch(dbUrl)
  // .then((Response) =>  {
  //   return Response.json();
  // })
  // .then((json) => {
  //   return json;
  // })
};

// Cargar el archivo JSON con los turnos

function getTurnos() {
  // Definir la fecha deseada (en este ejemplo, buscamos los turnos del 1 de marzo de 2023)
  let fechaBuscada = "2023-03-01";

  // Filtrar los turnos por fecha
  let turnosFiltrados = _turnos.filter(function (turno) {
    return turno.fecha === fechaBuscada;
  });

  // Mostrar los turnos filtrados
  console.log(turnosFiltrados);
}

