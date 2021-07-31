import MaterialTable from 'material-table';
import {React, useEffect, useState} from 'react';
import axios from 'axios';

import {tableIcons} from './icons.js'

import './App.css';


const columns= [
  { title: "name", field: "name" },
  { title: "lastName", field: "lastName" },
  { title: "email", field: "email" },
  { title: "city", field: "city" },
  { title: "country", field: "country" }

]

const api = 'http://localhost:5000'
function App() {

  const [data,setData]= useState([]);

const  getData = ()=>{
  axios.get(api).then(response=>{
    setData(response.data);
  }
    )
}
useEffect(() => {
  getData(); 
}, [])

  return (
    <MaterialTable
      icons= {tableIcons}
      columns= {columns}
      title = "Contact Page Jalasoft Dev Tes"
      data = {data}
    />

  );
}

export default App;
