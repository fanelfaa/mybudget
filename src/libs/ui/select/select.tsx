import ReactSelect, { Props } from 'react-select';

type Option = { value: string; label: string };
export const Select = (props: Props<Option, false>) => {
	return (
		<ReactSelect<Option> isClearable={false} menuPlacement="top" {...props} />
	);
};
