import express from 'express';
import { createUsuario, efetuaLogin } from "../controllers/usuarios.js";
import { validateUsuario } from "../middleware/validation.js";

const router = express.Router();
//Cria novo usuário
router.post('/', validateUsuario, createUsuario);
//Validar o Login
router.post('/login', efetuaLogin);

export default router;