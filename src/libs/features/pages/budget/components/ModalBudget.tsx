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
	UseDisclosureReturn,
} from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React from 'react';
import { AddBudgetValidationSchema } from '@/libs/validations/budget';
import { postBudget, putBudget } from '@/libs/data-access/api/budget';
import { PrimaryButton } from '@/libs/ui/button/PrimaryButton';
import { FormBudgetValue } from './type';
import {
	useMonthYear,
	useMonthYearStore,
} from '@/libs/data-access/store/monthYearStore';
import { formatDate } from '@/libs/utils/formatDateId';

type ModalFormBudgetProps = {
	formik: FormikProps<FormBudgetValue>;
	disclosureProps: UseDisclosureReturn;
	modalTitle: string;
};

const ModalFormBudget = ({
	disclosureProps,
	formik,
	modalTitle,
}: ModalFormBudgetProps) => {
	const initialRef = React.useRef(null);
	const closeModal = () => {
		formik.resetForm();
		disclosureProps.onClose();
	};

	const onClickSubmit = () => {
		formik.handleSubmit();
	};
	return (
		<Modal
			initialFocusRef={initialRef}
			isOpen={disclosureProps.isOpen}
			onClose={closeModal}
			motionPreset="slideInBottom"
			scrollBehavior="outside"
		>
			<ModalOverlay backdropFilter="blur(3px)" />
			<ModalContent
				style={{
					position: 'absolute',
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
							isInvalid={!!formik.errors.name && formik.touched.name}
						>
							<FormLabel htmlFor="name">Nama</FormLabel>
							<Input
								id="name"
								name="name"
								onChange={formik.handleChange}
								value={formik.values.name}
								ref={initialRef}
							/>
							<FormErrorMessage>{formik.errors.name}</FormErrorMessage>
						</FormControl>
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
							/>
							<FormErrorMessage>{formik.errors.amount}</FormErrorMessage>
						</FormControl>
					</VStack>
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
};

export type ModalEditBudgetProps = {
	id: string;
	initialValues: FormBudgetValue;
	onSuccess: () => void;

	disclosureProps: UseDisclosureReturn;
};

export function ModalEditBudget({
	id,
	onSuccess,
	initialValues,
	disclosureProps,
}: ModalEditBudgetProps) {
	const formik = useFormik<FormBudgetValue>({
		initialValues,
		onSubmit: async ({ name, amount }, { setErrors, resetForm }) => {
			return putBudget({
				id,
				name,
				amount: amount ?? 0,
			}).then((res) => {
				if (res.error) {
					setErrors({ name: res.error.message, amount: res.error.message });
					return;
				}
				onSuccess();
				disclosureProps.onClose();
				resetForm();
			});
		},
		validationSchema: AddBudgetValidationSchema,
	});

	return (
		<ModalFormBudget
			disclosureProps={disclosureProps}
			formik={formik}
			modalTitle="Edit Budget"
		/>
	);
}

export type ModalAddBudgetProps = {
	roomId: string;
	onSuccess: () => void;

	disclosureProps: UseDisclosureReturn;
};

export function ModalAddBudget({
	roomId,
	onSuccess,
	disclosureProps,
}: ModalAddBudgetProps) {
	const monthYear = useMonthYear();
	const date = useMonthYearStore((s) => s.date);

	const formik = useFormik<FormBudgetValue>({
		initialValues: {
			name: '',
			amount: undefined,
		},
		onSubmit: async ({ name, amount }, { setErrors, resetForm }) => {
			return postBudget({
				roomId,
				name,
				amount: amount ?? 0,
				...monthYear,
			}).then((res) => {
				if (res.error) {
					setErrors({ name: res.error.message, amount: res.error.message });
					return;
				}
				onSuccess();
				disclosureProps.onClose();
				resetForm();
			});
		},
		validationSchema: AddBudgetValidationSchema,
	});

	return (
		<ModalFormBudget
			disclosureProps={disclosureProps}
			formik={formik}
			modalTitle={`Tambah Budget untuk ${formatDate(date, 'MMMM, yyyy')}`}
		/>
	);
}
