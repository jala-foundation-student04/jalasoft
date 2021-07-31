
import './App.css';
import MaterialTable from 'material-table';
import { React, useEffect, useState,  } from 'react';
import {tableIcons} from './components/icons.js';
import axios from 'axios';


const api = 'http://localhost:5000'





const columns= [
  { title: "name", field: "name" },
  { title: "lastName", field: "lastName" },
  { title: "email", field: "email" },
  { title: "city", field: "city" },
  { title: "country", field: "country" }

]

function App() {
const [data,setData] = useState([]);




 useEffect(() => {
 
    getContact();
    
 },[]);

 const getContact = async () => {
  await axios.get(api).then(response =>{
    setData(response.data);
    
  })
}  

 const create = async (newData)=>{
   try {
     await axios.post(api, newData);
    console.log(newData);
      
   } catch (error) {
     console.log(error);
   }
   
 }

 const deleted = async (deleteData)=>{
   try {
    axios.delete(`${api}/${deleteData._id}`)
     console.log(deleteData._id);
     
   } catch (error) {
     console.log (error);
   }
 } 

 const update = async (updatedData) =>{
   try {
      axios.patch(`${api}/${updatedData._id}`, updatedData);
      console.log(updatedData._id);
   } catch (error) {
     console.log(error)
   }

 }




  return (
    <MaterialTable
      columns = {columns}
      data= {data}
      title= "covid contact app"
      icons={tableIcons}
      localization={{ header:{  actions: "Acciones"    }, body: { editRow: { deleteText: '¿Estas seguro de querer eliminar?' }} }}
      editable =  {{
        onRowAdd : (newRow)=>  new Promise((resolve,reject)=>{
          const newData =  newRow
           create(newData);
           window.location.reload();
           resolve();
        }),
        onRowDelete: (selectedRow) => new Promise ((resolve,reject )=>{
          const deleteData = selectedRow;
          deleted(deleteData);
          
          window.location.reload();
          resolve();
        }),
        onRowUpdate: (updatedRow, oldrow )=> new Promise((reject,resolve)=>{
          const updatedData = updatedRow;
          const oldData= oldrow;
          update(updatedData);
          window.location.reload();
          resolve();
        })
      }}

      options={{
        actionsColumnIndex: -1 
      }}

    />
    
  );
}

export default App;
