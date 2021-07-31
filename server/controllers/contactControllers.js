import mongoose from 'mongoose';
// importamos el modal
import ContactSchema from '../model/contactSchema.js';


// ruta get
export const getContacts = async (req, res)  =>{
    
    try {
        const contact = await ContactSchema.find();
        res.json (contact);
          
    } catch (error) {
        console.log(error);
    }
}

// ruta post 
export const createContact = async (req,res)=>{
    // requerimos los valores necesarios
    const name = req.body.name;
    const lastName = req.body.lasName;
    const email = req.body.email;
    const city = req.body.city;
    const country = req.body.country;
    

    const newContact =  new ContactSchema ({
        name : name, lastName: lastName ,email : email, 
        country: country, city: city })
    try {
        await newContact.save();
        res.json(newContact);
        
    } catch (error) {
        console.log(error);
    } 
}
 // ruta Patch 
export const updateContact = async (req,res)=>{
    // requerimos valores necesarios
    const name = req.body.name;
    const lastName = req.body.lasName;
    const email = req.body.email;
    const city = req.body.city;
    // traemos el id por medio de la url
    const {id} = req.params;

    const country = req.body.country;const updateContact =  new ContactSchema ({
        name : name, lastName: lastName ,email : email, 
         country: country, city: city  , _id: id })
    try {

        await ContactSchema.findByIdAndUpdate(id, updateContact, { new: true });
        console.log('updated', updateContact);
        
    } catch (error) {
        console.log(error);
        console.log (updateContact);
    }
}
// ruta delete
export const  deleteContact = async (req, res) =>{
    // traemos el id por el url
    const {id} = req.params;
    
    // condicional para validar si existe el id 
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`not valid id ${id}`);

    await ContactSchema.findByIdAndRemove(id);

    res.json({ message : "deleted successfully"})

}