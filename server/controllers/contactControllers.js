import mongoose  from 'mongoose';
import contactSchema from '../model/contactSchema.js'

// funciones crud 
export const getContacts = async (req, res)  =>{
    
    try {
        const contact = await contactSchema.find();
        
          
    } catch (error) {
        console.log(error);
    }
}

export const createContact = async (req,res)=>{
    const name = req.body.name;
    const lasName = req.body.lasName;
    const email = req.body.email;
    const city = req.body.city;
    const country = req.body.country;
    

    const newContact =  new contactSchema ({
        name : name, lastName: lastName ,email : email, 
        country: country, city: city })
    try {
        await newContact.save();
        res.json(newContact);
        
    } catch (error) {
        console.log(error);
    } 
}

export const updateContact = async (req,res)=>{
    const name = req.body.name;
    const lasName = req.body.lasName;
    const email = req.body.email;
    const city = req.body.city;
    const country = req.body.country;
    const {id} = req.params;

    const updateContact =  new contactSchema ({
        name : name, lastName: lastName ,email : email, 
         country: country, city: city  , _id: id })
    try {
        await contactSchema.findByIdAndUpdate(id, updateContact, { new: true });
        console.log('updated', updateContact);
        
    } catch (error) {
        console.log(error);
        console.log (updateContact);
    }
}

export const  deleteContact = async (req, res) =>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`not valid id ${id}`);

    await contactSchema.findByIdAndRemove(id);

    res.json({ message : "deleted successfully"})

}