import { Router } from 'express';
import userModel from '../schemas/userSchemas.js';
const accountRouters = Router();
// =====================
// midelware q se ejecuta antes y debuelve la ip
// routers.use((req, res, next) => {
// 	res.send(req.ip);
// 	next();
// });
// Obtener los detalles de una cuenta apartir de id
accountRouters.get('/:guid', async (req, res) => {
	const { guid } = req.params;
	const user = await userModel.findById(guid).exec();
	if (!user) return res.status(404).send('not found this user');
	return res.send(user);
});
// obtener una nueva cuenta
accountRouters.post('/', async (req, res) => {
	const { guid, name } = req.body;
	if (!(guid, name)) return res.status(409).send('id and name not undefined');
	const user = await userModel.findById(guid).exec();
	if (user) return res.status(409).send('this users already exists');
	const newUser = new userModel({ _id: guid, name });
	await newUser.save();
	return res.send('usuario registrado');
});
// actualizar una cuenta el nombre de una cuenta
accountRouters.patch('/:guid', async (req, res) => {
	const { guid } = req.params;
	const { name } = req.body;
	if (!name) return res.status(400).send('the name this  users undefined');
	const userUpdate = await userModel.findById(guid).exec();
	if (!userUpdate) return res.status(404).send('not found this user');
	userUpdate.name = name;
	await userUpdate.save()
	return res.send(userUpdate);
});
// eliminar una cueta
accountRouters.delete('/:guid', async (req, res) => {
	const { guid } = req.params;
	const userIndex = await userModel.findById(guid).exec();
	if (!userIndex) return res.status(404).send('not found this user');
	userIndex.remove()
	return res.send('usuario eliminado');
});
// ===================
export default accountRouters;
