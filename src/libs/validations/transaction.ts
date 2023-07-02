import * as Yup from 'yup';

export const AddExpenseValidationSchema = Yup.object().shape({
	amount: Yup.number()
		.required('Jumlah pengeluaran harus di isi')
		.label('Jumlah pengeluaran'),
	note: Yup.string()
		.required('Keterangan transaksi harus di isi')
		.label('Keterangan'),
});
