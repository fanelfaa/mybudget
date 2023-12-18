import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import debounce from "lodash/debounce";
import { FiSearch } from "react-icons/fi";

export type SearchProps = {
	onSearch: (text: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
	const debounceSearch = debounce(onSearch, 200);

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const text = e.target.value || "";
		debounceSearch(text.toLowerCase());
	};

	return (
		<InputGroup size="sm">
			<Input
				fontSize="1rem"
				variant="filled"
				rounded="md"
				placeholder="Cari..."
				onChange={onChange}
				borderColor="MBorder"
				borderWidth={1}
			/>
			<InputRightElement>
				<FiSearch />
			</InputRightElement>
		</InputGroup>
	);
};
