

// Funcion para buscar en la cartilla
const dataBase = async () => {
  let dataBase;
  await fetch('http://localhost:3000/employees', {
    method: "GET"
  })
    .then((r) => r.json())
    .then((resp) => dataBase = resp)
    .catch((error) => console.error(error))

  return dataBase.then(resp => resp)
}


///////////
//Constsntes utilizadas



const registrarMedicos = () => {
  //Cargos la data de form a las variables
  const name = document.getElementById("nombre").value;
  const lastName = document.getElementById("apellido").value;
  const specialty = document.getElementById("especialidad").value;
  const mail = document.getElementById("correo").value;
  const pass = document.getElementById("password").value;
  const authorized = false;

  //falta chequear mail si ya se encuentra registrado


  //creo la esttuctura de datos que pasare al Json
  const medico = { name, lastName, specialty, mail, pass, authorized };

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
      // console.log(medicosFiltrados);
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
      //console.log(medicosFiltrados);
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
};


const testMail = () => {

  let dirMail = "JORGE.SUAREZ@GMAIL.COM";
  //let dirMail = "";
  buscarMedicoByMail(dirMail)
    .then(encontrado => {
      if (encontrado) {
        console.log('El médico fue encontrado');
      } else {
        console.log('El médico no fue encontrado');
      }
    });
};


// Cargar el archivo JSON con los turnos
const getTurnos = () => {
  // Definir la fecha deseada (en este ejemplo, buscamos los turnos del 1 de marzo de 2023)
  let fechaBuscada = "2023-03-01";

  // Filtrar los turnos por fecha
  let turnosFiltrados = _turnos.filter(function (turno) {
    return turno.fecha === fechaBuscada;
  });

  // Mostrar los turnos filtrados
  console.log(turnosFiltrados);
}

// Busqueda en Employees por mail
//Usar como testMail()
const buscarMedicoByMail = async (mail) => {
  try {
    const response = await fetch(urlEmployees);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de médicos');
    }
    const medicos = await response.json();
    console.log(medicos)
    const encontrado = medicos.some(medico => medico.mail === mail);

    return encontrado;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};

const buscarMedicoByMail2 = (mail) => {
  fetch(urlEmployees)
    .then((response) => {
      response.json();
    })
    .then((data) => {
      const medicos = data.employees;
      const encontrado = medicos.some(medico => medico.mail === mail);
      console.log(encontrado);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function buscarMedicoPorMail(mail) {
  fetch(urlEmployees)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener la lista de médicos');
      }
      return response.json();
    })
    .then(medicos => {
      const encontrado = medicos.some(medico => medico.mail === mail);
      return encontrado;
      // if (encontrado) {
      //   console.log('El médico fue encontrado');
      // } else {
      //   console.log('El médico no fue encontrado');
      // }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
}
// funcion para busacar por patrametros
function buscarPorValor(url, NameProp, findValue) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener la lista de médicos');
      }
      return response.json();
    })
    .then(data => {

      const encontrado = data.some(res => `res.${NameProp}` === findValue);
      //return encontrado;
      if (encontrado) {
        console.log('El valor indicado fue encontrado',);
      } else {
        console.warn('El valor indicado no fue encontrado');
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
}

const test2 = () => {
  //buscarPorValor(urlEmployees, "mail", "");
  //buscarPorValor(urlEmployees, "mail", "YOLANDA.RODRIGUEZ@GMAIL.COM");
  buscarPorValor(urlEmployees, "name", "YOLANDA");
}
//Ejemplo de busqueda
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

