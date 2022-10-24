import {Router} from 'express';
import { User_bd } from '../db.js';
const routers = Router();
// =====================
// midelware q se ejecuta antes y debuelve la ip
// routers.use((req, res, next) => {
// 	res.send(req.ip);
// 	next();
// });
// Obtener los detalles de una cuenta apartir de id
routers.get('/:id', (req, res) => {
	const { id } = req.params;
	const user = User_bd.find(item => item._id === id);
	if (!user) return res.status(404).send('not found this user');
	return res.send(user);
});
// obtener una nueva cuenta
routers.post('/', (req, res) => {
	const { _id, name } = req.body;
	if (!(_id, name)) return res.status(409).send('id and name not undefined');
	const user = User_bd.find(item => item._id === _id);
	if (user) return res.status(409).send('this users already exists');
	User_bd.push({
		_id,
		name,
	});
	return res.send(User_bd);
});
// actualizar una cuenta el nombre de una cuenta
routers.patch('/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	if (!name) return res.status(400).send('the name this  users undefined');
	const userUpdate = User_bd.find(item => item._id === id);
	if (!userUpdate) return res.status(404).send('not found this user');
	userUpdate.name = name;
	return res.send(userUpdate);
});
// eliminar una cueta
routers.delete('/:id', (req, res) => {
	const { id } = req.params;
	const userIndex = User_bd.findIndex(item => item._id === id);
	if (userIndex === -1) return res.status(404).send('not found this user');
	User_bd.splice(userIndex, 1);
	return res.send(User_bd);
});
// ===================
export default routers;
