
// Funcion para buscar en la cartilla
const buscador=()=>{
  fetch('http://localhost:3000/employees',{
    method:"GET"
  })
  .then((r)=>r.json())
  .then((r=>console.log(r)))
  .catch((error)=>console.error(error))
}

