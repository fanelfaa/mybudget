import {
	extendTheme,
	withDefaultColorScheme,
	withDefaultVariant,
} from '@chakra-ui/react';

export const theme = extendTheme(
	withDefaultColorScheme({ colorScheme: 'blue' }),
	withDefaultVariant({ variant: 'ghost', components: ['Button'] })
);
