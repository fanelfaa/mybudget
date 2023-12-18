import {
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
	UseDisclosureReturn,
} from "@chakra-ui/react";
import { FormikProps, useFormik } from "formik";
import React, { useState } from "react";
import { format } from "date-fns";
import { PrimaryButton } from "@/libs/ui/button/PrimaryButton";
import { FormExpenseValue } from "./type";
import { postExpense, putExpense } from "@/libs/data-access/api/transaction";
import { AddExpenseValidationSchema } from "@/libs/validations/transaction";

export type ModalFormExpenseProps = {
	formik: FormikProps<FormExpenseValue>;
	disclosureProps: UseDisclosureReturn;
	modalTitle: string;
	errorSubmit?: string;
};

export function ModalFormExpense({
	formik,
	modalTitle,
	disclosureProps,
	errorSubmit,
}: ModalFormExpenseProps) {
	const { isOpen, onClose } = disclosureProps;

	const initialRef = React.useRef(null);

	const closeModal = () => {
		formik.resetForm();
		onClose();
	};

	const onClickSubmit = () => {
		formik.handleSubmit();
	};

	// const { minDate, maxDate } = useMemo(() => {
	// 	const [year, month, day] = formik.values.date.split('-').map((it) => +it);
	// 	const selectedDate = new Date(year, month - 1, day);
	// 	const startDate = startOfMonth(selectedDate);
	// 	const endDate = endOfMonth(selectedDate);
	// 	return {
	// 		minDate: format(startDate, 'yyyy-MM-dd'),
	// 		maxDate: format(endDate, 'yyyy-MM-dd'),
	// 	};
	// }, [formik.values.date]);

	return (
		<Modal
			initialFocusRef={initialRef}
			isOpen={isOpen}
			onClose={closeModal}
			motionPreset="slideInBottom"
		>
			<ModalOverlay backdropFilter="blur(3px)" />
			<ModalContent
				style={{
					position: "absolute",
					bottom: 0,
					paddingBottom: 20,
					margin: 0,
				}}
				roundedTop="2xl"
			>
				<ModalHeader>{modalTitle}</ModalHeader>
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
								onChange={formik.handleChange}
								value={formik.values.date}
								// min={minDate}
								// max={maxDate}
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
								placeholder="ex: Beli kuda"
								onChange={formik.handleChange}
								value={formik.values.note}
							/>
							<FormErrorMessage>{formik.errors.note}</FormErrorMessage>
						</FormControl>
					</VStack>
					{errorSubmit ? (
						<Alert status="error">
							<AlertIcon />
							<AlertTitle>{errorSubmit}</AlertTitle>
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

export type ModalAddExpenseProps = {
	roomId: string;
	budgetId: string;
	currentTotalExpense?: number;
	onSuccess: () => void;
	disclosureProps: UseDisclosureReturn;
};

export function ModalAddExpense({
	roomId,
	budgetId,
	onSuccess,
	currentTotalExpense,
	disclosureProps,
}: ModalAddExpenseProps) {
	const { onClose } = disclosureProps;
	const [error, setError] = useState<string | undefined>(undefined);

	const formik = useFormik<FormExpenseValue>({
		initialValues: {
			amount: undefined,
			date: format(new Date(), "yyyy-MM-dd"),
			note: "",
		},
		onSubmit: async ({ amount, date: inputDate, note }, { resetForm }) => {
			const [year, month, date] = inputDate.split("-").map((it) => +it);
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

	return (
		<ModalFormExpense
			formik={formik}
			disclosureProps={disclosureProps}
			errorSubmit={error}
			modalTitle="Tambah Pengeluaran"
		/>
	);
}

export type ModalEditExpenseProps = {
	id: string;
	budgetId: string;
	initialValues: FormExpenseValue;
	onSuccess: () => void;

	disclosureProps: UseDisclosureReturn;
	currentTotalExpense?: number;
};

export function ModalEditExpense({
	id,
	budgetId,
	onSuccess,
	initialValues,
	disclosureProps,
	currentTotalExpense,
}: ModalEditExpenseProps) {
	const { onClose } = disclosureProps;
	const [error, setError] = useState<string | undefined>(undefined);

	const formik = useFormik<FormExpenseValue>({
		initialValues,
		onSubmit: async ({ amount, date: inputDate, note }, { resetForm }) => {
			const [year, month, date] = inputDate.split("-").map((it) => +it);
			return putExpense({
				id,
				budgetId,
				note,
				amount: amount ?? 0,
				year,
				month,
				date,
				prevAmount: initialValues.amount ?? 0,
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
		enableReinitialize: true,
	});

	return (
		<ModalFormExpense
			formik={formik}
			disclosureProps={disclosureProps}
			errorSubmit={error}
			modalTitle="Tambah Pengeluaran"
		/>
	);
}
