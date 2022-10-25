import { Router } from 'express';
import { nanoid } from 'nanoid';
import { User_bd } from '../db.js';
import authByEmailPwd from '../helpers/authByEmailPwd.js';
const authSessionRouter = Router();
const sessions = [];
// login con email y contraseña
authSessionRouter.post('/login', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.sendStatus(400);
	try {
		const { guid } = authByEmailPwd({ email, password });
		const sessionId = nanoid();
		sessions.push({ sessionId, guid });
		res.cookie('sessionId', sessionId, {
			httpOnly: true,
		});
		return res.send();
	} catch (error) {
		console.log(error);
		return res.sendStatus(401);
	}
});
authSessionRouter.get('/profile', (req, res) => {
	const { cookies } = req;
	if (!cookies) return res.sendStatus(401);
	const userSession = sessions.find(
		session => session.sessionId === cookies.sessionId
	);
	if (!userSession) return res.sendStatus(401);
	const user = User_bd.find(user => user.guid === userSession.guid);
	if (!user) return res.sendStatus(401);
	delete user.password;
	return res.send(user);
});
export default authSessionRouter;
