import {
	ThemeConfig,
	extendTheme,
	withDefaultColorScheme,
	withDefaultVariant,
} from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
};

export const theme = extendTheme(
	withDefaultColorScheme({ colorScheme: 'blue' }),
	withDefaultVariant({ variant: 'ghost', components: ['Button'] }),
	{
		config,
		semanticTokens: {
			colors: {
				MBorder: { _light: 'gray.100', _dark: 'gray.900' },
			},
		},
		styles: {
			global: () => ({
				'#root': {
					background: 'MBorder',
				},
			}),
		},
	}
);
