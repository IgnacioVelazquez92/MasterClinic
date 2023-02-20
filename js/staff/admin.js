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

  dataBase.map((solicitante)=>{
  solicitante.authorized===false;
  console.log("solicitante");
    pendientes.innerHTML+=`            
    <tr>
    <th scope="row">${solicitante.id}</th>
    <td class="text-center">${solicitante.name}</td>
    <td class="text-center">${solicitante.lastName}</td>
    <td class="text-center">${solicitante.specialty}</td>
    <td class="text-center">${solicitante.mail}</td>
    <th scope="col" class="text-center">
      <button type="button" class="btn btn-success" onclick="validar(${solicitante.id})">Autorizar</button>
      <button type="button" class="btn btn-danger" >Denegar</button>
    </th>
  </tr>
  `
})
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
      <button type="button" class="btn btn-dark" >Editar</button>
      <button type="button" class="btn btn-danger">Eliminar</button>
    </th>
  </tr>
  `
})
}
imprimirStaff()

const validar = (id)=>{
  const urlEdit= `http://localhost:3000/employees/${id}`
  console.log(urlEdit)
  const authorized=true;
  const data={authorized};
  console.log(data);
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