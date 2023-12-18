import { postRoom } from "@/libs/data-access/api/room";
import { AddRoomValidationSchema } from "@/libs/validations/room";
import { UseDisclosureReturn } from "@chakra-ui/react";
import { useFormik } from "formik";
import { FormRoomValue } from "../type";
import { ModalFormRoom } from "./ModalRoom";

export type ModalAddRoomProps = {
	onSuccess: () => void;

	disclosureProps: UseDisclosureReturn;
};

export function ModalAddRoom({
	onSuccess,
	disclosureProps,
}: ModalAddRoomProps) {
	const formik = useFormik<FormRoomValue>({
		initialValues: {
			name: "",
		},
		onSubmit: async ({ name }, { setErrors, resetForm }) => {
			return postRoom({
				name,
			}).then((res) => {
				if (res.error) {
					setErrors({ name: res.error.message });
					return;
				}
				onSuccess();
				disclosureProps.onClose();
				resetForm();
			});
		},
		validationSchema: AddRoomValidationSchema,
	});

	return (
		<ModalFormRoom
			disclosureProps={disclosureProps}
			formik={formik}
			modalTitle={"Tambah Periode"}
		/>
	);
}

export default ModalAddRoom;
