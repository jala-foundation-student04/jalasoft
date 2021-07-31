
import './App.css';
import MaterialTable from 'material-table';
import { React, useEffect, useState,  } from 'react';
// traemos los iconos para la tabla
import {tableIcons} from './components/icons.js';
import axios from 'axios';

// ruta de comunicación 
const api = 'http://localhost:5000'




// array para el titulo de la tabla (documentacio de material table)
const columns= [
  { title: "name", field: "name" },
  { title: "lastName", field: "lastName" },
  { title: "email", field: "email" },
  { title: "country", field: "country" },
  { title: "city", field: "city" }
  

]

function App() {
const [data,setData] = useState([]);


//pintamos los datos 
 useEffect(() => {
 
    getContact();
    
 },[]);

 // traemos la data
 const getContact = async () => {
  await axios.get(api).then(response =>{
    setData(response.data);
    
  })
}  
// creamos un nuevo dato 
 const create = async (newData)=>{
   try {
     await axios.post(api, newData);
    console.log(newData);
      
   } catch (error) {
     console.log(error);
   }
   
 }

 // borramos el dato
 const deleted = async (deleteData)=>{
   try {
    axios.delete(`${api}/${deleteData._id}`)
     console.log(deleteData._id);
     
   } catch (error) {
     console.log (error);
   }
 } 
// actualizamos dato
 const update = async (updatedData) =>{
   try {
      axios.patch(`${api}/${updatedData._id}`, updatedData);
      console.log(updatedData._id);
   } catch (error) {
     console.log(error)
   }

 }



  return (
    // componente que me permite crear una table data
    <MaterialTable
      columns = {columns}
      data= {data}
      title= "covid contact app"
      icons={tableIcons}
      //  customizamos parametros  de la tabla como el titulo de acciones y el mensaje desplegado en el delete
      localization={{ header:{  actions: "Acciones"    }, body: { editRow: { deleteText: '¿Estas seguro de querer eliminar?' }} }}
      editable =  {{
        // agregamos funcion para agregar datos  (documentacion material table)
        onRowAdd : (newRow)=>  new Promise((resolve,reject)=>{
          const newData =  newRow
          //pasamos la data ya que el valor de newRow esta encapsulado
           create(newData);
           // hacemos refresh a la pagina para  ver los cambios (problemas con modulo material table)
           window.location.reload();
           // resolvemos la promesa
           resolve();
        }),
        // agregamos funcion para eliminar datos  (documentacion material table)
        onRowDelete: (selectedRow) => new Promise ((resolve,reject )=>{
          const deleteData = selectedRow;
          //pasamos la data ya que el valor de selectedRow esta encapsulado
          deleted(deleteData);
          // hacemos refresh a la pagina para  ver los cambios (problemas con modulo material table)
          window.location.reload();
          // resolvemos la promesa
          resolve();
        }),
        // agregamos funcion para actualizar datos datos  (documentacion material table)
        onRowUpdate: (updatedRow, oldrow )=> new Promise((reject,resolve)=>{
          const updatedData = updatedRow;
          const oldData= oldrow;
          //pasamos la data ya que el valor de updatedRow esta encapsulado
          update(updatedData);

          // hacemos refresh a la pagina para  ver los cambios (problemas con modulo material table)
          window.location.reload();
          // resolvemos la promesa
          resolve();
        })
      }}
        // cambiamos  el orden de la tabla para que acciones salga al ultimo 
      options={{
        actionsColumnIndex: -1 
      }}

    />
    
  );
}

export default App;
