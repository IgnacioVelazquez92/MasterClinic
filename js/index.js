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
    if (medico.id===1) {

    } else {
      medicos.innerHTML+=`            
      <tr>
      <td class="text-center">${medico.name} ${medico.lastName}</td>
      <td class="text-center">${medico.specialty}</td>
      <th scope="col" class="text-center">
        
        </div>
        <button type="button" class="btn btn-success my-1" >Turnos</button>
      </th>
    </tr>
    `
    }
})
}
imprimirStaff()

