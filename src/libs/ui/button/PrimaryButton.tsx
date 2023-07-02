import { Button, ButtonProps } from '@chakra-ui/react';

export const PrimaryButton = (props: ButtonProps) => {
	return <Button colorScheme="blue" width="full" {...props} />;
};
