import { User_bd } from '../db.js';

const authByEmailPwd = ({ email, password }) => {
	const user = User_bd.find(item => item.email === email)
	if (!user) throw new Error();
	if (user.password !== password) throw new Error();
	return user;
};
export default authByEmailPwd
