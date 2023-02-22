const urlEmployees = "http://localhost:3000/employees";


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
  medicos.innerHTML=`<thead>
  <tr>
    <th scope="col" class="text-center">Nombre y Apellido</th>
    <th scope="col" class="text-center">Especialidad</th>
    <th scope="col" class="text-center">Acción</th>
  </tr>
</thead> ` ;
  dataBase.map((medico)=>{
    if (medico.id===1) {
        // excluye al administrador
    } else {
      medicos.innerHTML+=`            
      <tr>
      <td class="text-center">${medico.name} ${medico.lastName}</td>
      <td class="text-center">${medico.specialty}</td>
      <th scope="col" class="text-center">
        
        </div>
        <a href="/pages/patients/perfilPatients.html" type="button" class="btn btn-success my-1" >Turnos</a>
      </th>
    </tr>
    `
    }
})
}
imprimirStaff()

const queSelecciono = async () => {
  const specialty = document.getElementById("busquedaUser").value;
  try {
    const urlEdit = `${urlEmployees}/?specialty=${specialty}`;
    const postResponse = await fetch(urlEdit);
    if (!postResponse.ok) {
      throw new Error('Error al solicitar los datos de medicos.');
    }
    const listMedic = await postResponse.json();
    mostrarMedicosForm(listMedic);
    console.log('Lista resuelta exitosamente.');
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

//Mostrar lista de medicos por especialidad en el form.
const mostrarMedicosForm = (datos) => {
  const contenido = document.getElementById('tabMedicos');
  contenido.innerHTML = `        
  <thead>
  <tr>
    <th scope="col" class="text-center">Nombre y Apellido</th>
    <th scope="col" class="text-center">Especialidad</th>
    <th scope="col" class="text-center">Acción</th>
  </tr>
</thead> ` ;
  datos.map((medico)=>{
      contenido.innerHTML+=`            
      <tr>
      <td class="text-center">${medico.name} ${medico.lastName}</td>
      <td class="text-center">${medico.specialty}</td>
      <th scope="col" class="text-center">
        
        </div>
        <a href="/pages/patients/perfilPatients.html" type="button" class="btn btn-success my-1" >Turnos</a>
      </th>
    </tr>
    `
})
}
