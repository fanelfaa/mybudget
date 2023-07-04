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
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { AddBudgetValidationSchema } from '@/libs/validations/budget';
import { putBudget } from '@/libs/data-access/api/budget';
import { PrimaryButton } from '@/libs/ui/button/PrimaryButton';
import { FormBudgetValue } from './type';

export type ModalEditBudgetProps = {
	id: string;
	initialValues: FormBudgetValue;
	onSuccess: () => void;

	disclosureProps: ReturnType<typeof useDisclosure>;
};

export function ModalEditBudget({
	id,
	onSuccess,
	initialValues,
	disclosureProps,
}: ModalEditBudgetProps) {
	// const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);

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
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Tambah Budget</ModalHeader>
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
								variant="filled"
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
								variant="filled"
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
}
