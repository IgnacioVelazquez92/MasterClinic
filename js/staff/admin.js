// if (!localStorage.getItem("staffLog")) {
//   window.location= "../../pages/staff/loginStaff.html";
// }


// const closeSesion= ()=>{
//   localStorage.removeItem("staffLog");
//   window.location="../../index.html";
// }

const urlEmployees = "http://localhost:3000/employees";
const urlPatients="http://localhost:3000/patients";

// Funcion para obtener las solicitudes de alta
const postulantes= async()=>{
  
  await fetch("http://localhost:3000/employees?authorized_ne=true",{
    method:"GET"
  })
  .then((r)=>r.json())
  .then((resp)=>dBase=resp)
  .catch((error)=>console.error(error))
  return dBase
}


//imprimir en pantalla los pendientes
const imprimirPostulantes =async ()=>{
  let pendientes = document.getElementById("tabPendiente");
  dataBase = await postulantes();
  if (!(Object.entries(dataBase).length === 0)) {
    dataBase.map((solicitante)=>{
      pendientes.innerHTML+=`            
      <tr>
      <th scope="row">${solicitante.id}</th>
      <td class="text-center">${solicitante.name}</td>
      <td class="text-center">${solicitante.lastName}</td>
      <td class="text-center">${solicitante.specialty}</td>
      <td class="text-center">${solicitante.mail}</td>
      <th scope="col" class="text-center">
        <button type="button" class="btn btn-success my-1" onclick="validar(${solicitante.id})">Autorizar</button>
        <button type="button" class="btn btn-danger my-1" onclick="eliminarStaff(${solicitante.id})">Denegar</button>
      </th>
    </tr>
    `
  })
    
  } else {
    document.getElementById("divPendientes").innerHTML=`<h4 class="text-center m-2 ">Estas al día, no hay solicitudes por procesar.. ✅</h4>`
  }
}
imprimirPostulantes()

const staffActivo= async()=>{
  
  await fetch("http://localhost:3000/employees?authorized_ne=false",{
    method:"GET"
  })
  .then((r)=>r.json())
  .then((resp)=>dBase=resp)
  .catch((error)=>console.error(error))
  return dBase
}


//imprimir en pantalla los pendientes
const imprimirStaff =async ()=>{
  let medicos = document.getElementById("tabMedicos");
  dataBase = await staffActivo();
  dataBase.map((medico)=>{
    medicos.innerHTML+=`            
    <tr>
    <th scope="row">${medico.id}</th>
    <td class="text-center">${medico.name}</td>
    <td class="text-center">${medico.lastName}</td>
    <td class="text-center">${medico.specialty}</td>
    <td class="text-center">${medico.mail}</td>
    <th scope="col" class="text-center">
      <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEdicion${medico.id}">
        Editar
      </button>
      
      <div class="modal fade" id="modalEdicion${medico.id}" tabindex="-1" aria-labelledby="modalEdicion${medico.id}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edición de usuario</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            <form id="formEdicion">
              <div class="row mb-3">
              <label for="inputEmail${medico.id}" class="col-sm-2 col-form-label">Mail</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail${medico.id}" value="${medico.mail}" pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$" name="mail no valido"required>
              </div>
              </div>
              <div class="row mb-3">
                <label for="inputPassword${medico.id}" class="col-sm-2 col-form-label">Pass</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="inputPassword${medico.id}" value="${medico.pass}">
                </div>
              </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-success" form="formEdicion">Guardar</button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-danger my-1" onclick="eliminarStaff(${medico.id})">Eliminar</button>
    </th>
  </tr>
  `
})
}
imprimirStaff()

const validar = (id)=>{
  const urlEdit= `http://localhost:3000/employees/${id}`
  const authorized=true;
  const data={authorized};
  fetch(urlEdit, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err)=>console.error(err));
}


const modificarStaff = async(id)=>{
  const urlEdit= `http://localhost:3000/employees/${id}`


  await fetch(urlEdit, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err)=>console.error(err));
}

// const eliminarStaff = (id)=>{
//   const urlEdit= `http://localhost:3000/employees/${id}`
//   fetch(urlEdit, {
//     method: "DELETE",
//   })
// }