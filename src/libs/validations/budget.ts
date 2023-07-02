import * as Yup from 'yup';

export const AddBudgetValidationSchema = Yup.object().shape({
	name: Yup.string().required('Nama budget harus di isi').label('Nama'),
});
