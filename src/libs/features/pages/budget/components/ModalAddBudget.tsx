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
import { postBudget } from '@/libs/data-access/api/budget';
import { getCurrentMonthYear } from '@/libs/utils/getCurrentMonthYear';
import { PrimaryButton } from '@/libs/ui/button/PrimaryButton';

export type ModalAddBudgetProps = {
	roomId: string;
	onSuccess: () => void;
};

export function ModalAddBudget({ roomId, onSuccess }: ModalAddBudgetProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);

	const formik = useFormik({
		initialValues: {
			name: '',
			amount: undefined,
		},
		onSubmit: async ({ name, amount }, { setErrors, resetForm }) => {
			const monthYear = getCurrentMonthYear();
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
				onClose();
				resetForm();
			});
		},
		validationSchema: AddBudgetValidationSchema,
	});

	const closeModal = () => {
		formik.resetForm();
		onClose();
	};

	const onClickSubmit = () => {
		formik.handleSubmit();
	};

	return (
		<>
			<Button onClick={onOpen} variant="ghost">
				Tambah
			</Button>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={closeModal}>
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
		</>
	);
}
