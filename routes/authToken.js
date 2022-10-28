import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import { User_bd } from '../db.js';
import validateLoginDTO from '../dto/validateLoginDTO.js';
import authByEmailPwd from '../helpers/authByEmailPwd.js';
const authTokenRouter = Router();
// login con email y contraseña
authTokenRouter.post('/login', validateLoginDTO, async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.sendStatus(400);
	try {
		const { guid } = authByEmailPwd({ email, password });
		const encoder = new TextEncoder();
		const jwtConstructor = new SignJWT({ guid });
		const jwt = await jwtConstructor
			.setProtectedHeader({ alg: 'HS256', type: 'jwt' })
			.setIssuedAt()
			.setExpirationTime('1h')
			.sign(encoder.encode(process.env.JWT_PrivateKey));
		return res.send({ jwt });
	} catch (error) {
		console.log(error);
		return res.sendStatus(401);
	}
});
authTokenRouter.get('/profile', async (req, res) => {
	const { authorization } = req.headers;
	if (!authorization) return res.sendStatus(401);
	try {
		const encoder = new TextEncoder();
		const { payload } = await jwtVerify(
			authorization,
			encoder.encode(process.env.JWT_PrivateKey)
		);
		const user = User_bd.find(user => user.guid === payload.guid);
		if (!user) return res.sendStatus(401);
		delete user.password;
		return res.send(user);
	} catch (error) {
		console.log(error);
		return res.sendStatus(401);
	}
});
export default authTokenRouter;
