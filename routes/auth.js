import { Router } from 'express';
import { User_bd } from '../db.js';
import authByEmailPwd from '../helpers/authByEmailPwd.js';
const authRouter = Router();

// emdpoint público (no autenticado y no autorizado)
authRouter.get('/publico', (req, res) => res.send('emdpoint público'));
// emdpoint autenticado para todo usuario autenticado
authRouter.post('/autenticado', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.sendStatus(400)
	try {
		const user = authByEmailPwd({ email, password });
		return res.send(`Usuario ${user.name} autenticado`);
	} catch (error) {
		return res.sendStatus(401)
	}
});
// emdpoint autorizado para usuarios con el rol de administrador
authRouter.post('/autorizado', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.sendStatus(400)
	try {
		const user = authByEmailPwd({ email, password });
		if (user.role !== 'administador') return res.sendStatus(403)
		return res.send(`Usuario ${user.name} autorizado`);
	} catch (error) {
		return res.sendStatus(401)
	}
});
export default authRouter;
