import * as Yup from "yup";

export const emailValidation = Yup.string()
   .email("Email harus email yang valid")
   .required("Email harus di isi")
   .label("Email");

export const LoginValidationSchema = Yup.object().shape({
   email: emailValidation,
   password: Yup.string().required("Password harus di isi").label("Password"),
});
