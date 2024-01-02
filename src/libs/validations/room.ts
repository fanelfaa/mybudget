import * as Yup from "yup";

export const AddRoomValidationSchema = Yup.object().shape({
   name: Yup.string().required("Nama room harus di isi").label("Nama"),
});
