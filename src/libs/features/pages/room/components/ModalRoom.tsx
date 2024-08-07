import { putRoom } from "@/libs/data-access/api/room";
import { PrimaryButton } from "@/libs/ui/button/PrimaryButton";
import { AddRoomValidationSchema } from "@/libs/validations/room";
import {
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   UseDisclosureReturn,
} from "@chakra-ui/react";
import { FormikProps, useFormik } from "formik";
import React from "react";
import { FormRoomValue } from "../type";

type ModalFormRoomProps = {
   formik: FormikProps<FormRoomValue>;
   disclosureProps: UseDisclosureReturn;
   modalTitle: string;
};

export const ModalFormRoom = ({
   disclosureProps,
   formik,
   modalTitle,
}: ModalFormRoomProps) => {
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
               <FormControl
                  isInvalid={!!formik.errors.name && formik.touched.name}
               >
                  <FormLabel htmlFor="name">Nama</FormLabel>
                  <Input
                     id="name"
                     name="name"
                     onChange={formik.handleChange}
                     value={formik.values.name}
                     placeholder="ex: Juli 2023"
                     ref={initialRef}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
               </FormControl>
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

export type ModalEditRoomProps = {
   id: string;
   initialValues: FormRoomValue;
   onSuccess: () => void;

   disclosureProps: UseDisclosureReturn;
};

export function ModalEditRoom({
   id,
   onSuccess,
   initialValues,
   disclosureProps,
}: ModalEditRoomProps) {
   const formik = useFormik<FormRoomValue>({
      initialValues,
      onSubmit: async ({ name }, { setErrors, resetForm }) => {
         return putRoom({
            id,
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
         modalTitle="Edit Room"
      />
   );
}
