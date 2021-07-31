import mongoose from 'mongoose';


const contactSchema = new mongoose.Schema({

    name:String,
    lastName:String,
    email: String,
    city:  String,
    country: String
})

const ContactSchema =  mongoose.model("ContactSchema", contactSchema);

export default ContactSchema;