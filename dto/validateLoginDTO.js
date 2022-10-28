import { Type } from '@sinclair/typebox';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import Ajv from 'ajv';
const loginDTOSchema = Type.Object(
	{
		email: Type.String({
			format: 'email',
			errorMessage: {
				type: 'El tipo de email debe de ser de tipo string',
				fromat: 'Deve de ser un formato de emal valido ',
			},
		}),
		password: Type.String({
			errorMessage: {
				type: 'El tipo de password debe de ser de tipo string',
			},
		}),
	},
	{
		additionalProperties: false,
		errorMessage: {
			additionalProperties: 'El formato debe de ser de tipo object',
		},
	}
);
const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);
const validate = ajv.compile(loginDTOSchema);
const validateLoginDTO = (req, res, next) => {
	const isDTOValid = validate(req.body);
	if (!isDTOValid)
		return res
			.status(400)
			.send(ajv.errorsText(validate.errors, { separator: '\n' }));
	next();
};
export default validateLoginDTO;

// esto es parte de la validacion manual
// const DTOPropertyName = ['email', 'password'];
// ==============================================================
// ===== esto es un schema para validar la informacion q viene en el DTO
// se valida q sea un objeto que tenga las propiedades, el tipo de propiedades, si se requieren y si viene otras propiedades más
// const loginDTOSchema = {
// 	type: 'object',
// 	properties: {
// 		email: {
// 			type: 'string',
// 			format: 'email',
// 		},
// 		password: {
// 			type: 'string',
// 		},
// 		required: ['email', 'passwoed'],
// 		additionalProperties: false,
// 	},
// };
// const validateLoginDTO = (req, res, next) => {
// ====== esto es de manera manual de jando q el desarrollador haga todas alas valodaciones
// const loginDTO = req.body;
// if (typeof loginDTO !== 'object')
// 	return res.status(400).send('el body tiene que estar en formato json');
// const bodyPropertyName = Object.keys(loginDTO);
// const checkProperties =
// 	bodyPropertyName.length === DTOPropertyName.length &&
// 	bodyPropertyName.every(bodyPropertyName =>
// 		DTOPropertyName.includes(bodyPropertyName)
// 	);
//   if(!checkProperties)return res.status(400).send('el body debe de contener email y password')
// ==============================================================
// };
// export default validateLoginDTO;
