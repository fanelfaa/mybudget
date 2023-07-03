import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	Input,
	ModalFooter,
	FormErrorMessage,
	VStack,
	Alert,
	AlertIcon,
	AlertTitle,
	Textarea,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { PrimaryButton } from '@/libs/ui/button/PrimaryButton';
import { postExpense } from '@/libs/data-access/api/transaction';
import { AddExpenseValidationSchema } from '@/libs/validations/transaction';

export type ModalAddExpenseProps = {
	roomId: string;
	budgetId: string;
	currentTotalExpense?: number;
	onSuccess: () => void;
	disclosureProps: ReturnType<typeof useDisclosure>;
};

export function ModalAddExpense({
	roomId,
	budgetId,
	onSuccess,
	currentTotalExpense,
	disclosureProps,
}: ModalAddExpenseProps) {
	const { isOpen, onClose } = disclosureProps;

	const [error, setError] = useState<string | null>(null);

	const initialRef = React.useRef(null);

	const formik = useFormik({
		initialValues: {
			amount: undefined,
			date: format(new Date(), 'yyyy-MM-dd'),
			note: '',
		},
		onSubmit: async ({ amount, date: inputDate, note }, { resetForm }) => {
			const [year, month, date] = inputDate.split('-').map((it) => +it);
			return postExpense({
				roomId,
				budgetId,
				note,
				amount: amount ?? 0,
				year,
				month,
				date,
				currentBudgetExpense: currentTotalExpense ?? 0,
			}).then((res) => {
				if (res.error) {
					setError(res.error.message);
					return;
				}
				onSuccess();
				onClose();
				resetForm();
			});
		},
		validationSchema: AddExpenseValidationSchema,
	});

	const closeModal = () => {
		formik.resetForm();
		onClose();
	};

	const onClickSubmit = () => {
		formik.handleSubmit();
	};

	return (
		<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Tambah Pengeluaran</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<VStack spacing={4} align="flex-start">
						<FormControl
							isInvalid={!!formik.errors.amount && formik.touched.amount}
						>
							<FormLabel htmlFor="amount">Amount</FormLabel>
							<Input
								id="amount"
								name="amount"
								type="number"
								variant="filled"
								onChange={formik.handleChange}
								value={formik.values.amount}
								ref={initialRef}
							/>
							<FormErrorMessage>{formik.errors.amount}</FormErrorMessage>
						</FormControl>
						<FormControl
							isInvalid={!!formik.errors.date && formik.touched.date}
						>
							<FormLabel htmlFor="date">Tanggal</FormLabel>
							<Input
								id="date"
								name="date"
								type="date"
								required
								variant="filled"
								onChange={formik.handleChange}
								value={formik.values.date}
							/>
							<FormErrorMessage>{formik.errors.date}</FormErrorMessage>
						</FormControl>
						<FormControl
							isInvalid={!!formik.errors.note && formik.touched.note}
						>
							<FormLabel htmlFor="note">Keterangan</FormLabel>
							<Textarea
								id="note"
								name="note"
								variant="filled"
								placeholder="ex: Beli kuda"
								onChange={formik.handleChange}
								value={formik.values.note}
							/>
							<FormErrorMessage>{formik.errors.note}</FormErrorMessage>
						</FormControl>
					</VStack>
					{error ? (
						<Alert status="error">
							<AlertIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					) : null}
				</ModalBody>

				<ModalFooter>
					<Button mr={3} onClick={closeModal}>
						Batal
					</Button>
					<PrimaryButton
						onClick={onClickSubmit}
						isDisabled={formik.isSubmitting}
					>
						Simpan
					</PrimaryButton>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
