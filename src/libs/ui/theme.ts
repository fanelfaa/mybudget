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
				MBorder: { _light: 'gray.200', _dark: 'gray.800' },
				MBackground: { _light: 'white', _dark: '#121212' },
				MAppBarShow: { _light: 'white.700', _dark: '#12121299' },
				MGrayText: { _light: 'gray.700', _dark: 'gray.100' },
				MTitleText: { _light: 'gray.900', _dark: 'gray.50' },
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
