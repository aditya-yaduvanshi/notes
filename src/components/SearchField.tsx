import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

type SearchFieldProps = {
	onSearch: (query: string) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({onSearch}) => {
	const [query, setQuery] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<>
			<Form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 10,
				}}
			>
				<Form.Group className='w-100'>
					<Form.Control
						placeholder='Search...'
						value={query}
						onChange={({target: {value}}) => setQuery(value)}
					/>
				</Form.Group>
				{query && (
					<Button
						type='reset'
						onClick={() => {
							setQuery('');
							onSearch('');
						}}
					>
						Clear
					</Button>
				)}
				<Button type='submit'>Search</Button>
			</Form>
		</>
	);
};

export default React.memo(SearchField);
