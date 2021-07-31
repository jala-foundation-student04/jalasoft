import express from 'express';
// importamos los controladores 
import { getContacts, createContact,updateContact,deleteContact} from '../controllers/contactControllers.js';
const router = express.Router();

// rutas establecidas
router.get ('/',getContacts);
router.post('/',createContact );
router.patch('/:id',updateContact);
router.delete('/:id',deleteContact );

export default router;