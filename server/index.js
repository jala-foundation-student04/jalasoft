import express  from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import contactSchema from './model/contactSchema.js'
// importar rutas 

import getRoutes  from './routes/routes.js'

const app = express();

app.use(express.json({ limit: "30mb", extended : true}));
app.use(express.urlencoded({limit: "30mb", extended: true  }));
app.use(cors());

app.use("/", getRoutes);
app.get("/test", (req,res)=>{
    
    const newContact =  new contactSchema ({
    name : "leoric", lastName: "asrad" ,email : "asy@gmail.com", 
    country: "quito", city: "ecuador"  })
try {
     newContact.save();
    res.json(newContact);
    
} catch (error) {
    console.log(error);
} 


});
// variables de conecccion 
const CONNECTION_URL = 'mongodb+srv://Lordcreos:Lordcreos123@cluster0.yjnjz.mongodb.net/jalasoft?retryWrites=true&w=majority';
const PORT = '5000';

// cadena de conecccion 
mongoose.connect(CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology:true})
.then(()=> app.listen(PORT, ()=>console.log(`Server online on  port: ${PORT}` )))
.catch((error)=> console.log(error));

mongoose.set('useFindAndModify', false);