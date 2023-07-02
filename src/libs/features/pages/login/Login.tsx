import {
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LoginValidationSchema } from '@/libs/validations/login';
import { PrimaryButton } from '@/libs/ui/button/PrimaryButton';
import { supabase } from '@/libs/data-access/supabase';

const LoginPage = () => {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ email, password }, { setErrors }) => {
			return supabase.auth
				.signInWithPassword({ email, password })
				.then((res) => {
					if (res.data) {
						navigate('/');
						return;
					}
					setErrors({
						email: res.error?.message,
						password: res.error?.message,
					});
				});
		},
		validationSchema: LoginValidationSchema,
	});

	return (
		<Box
			p="4"
			shadow="md"
			rounded="md"
			minH="100vh"
			w="md"
			maxW="100%"
			bgColor="white"
			mx="auto"
		>
			<Heading>Login</Heading>
			<Box h="10" />
			<Box bg="white" rounded="md">
				<form onSubmit={formik.handleSubmit}>
					<VStack spacing={4} align="flex-start">
						<FormControl
							isInvalid={!!formik.errors.email && formik.touched.email}
						>
							<FormLabel htmlFor="email">Email Address</FormLabel>
							<Input
								id="email"
								name="email"
								type="email"
								variant="filled"
								placeholder="Ex: email@email.com"
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
						</FormControl>
						<FormControl
							isInvalid={!!formik.errors.password && formik.touched.password}
						>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								id="password"
								name="password"
								type="password"
								variant="filled"
								placeholder="Input your password"
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
							<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
						</FormControl>
						<Box h="2" />
						<PrimaryButton
							type="submit"
							width="full"
							isDisabled={formik.isSubmitting}
						>
							Login
						</PrimaryButton>
					</VStack>
				</form>
			</Box>
		</Box>
	);
};

export default LoginPage;
