import React, {useCallback, useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchField from './components/SearchField';
import {INote, useNotes} from './contexts/notes';

const App = () => {
	const [modal, setModal] = useState(false);
	const {notes} = useNotes();
	const [formMode, setFormMode] = useState<{edit: boolean; note: INote | null}>(
		{edit: false, note: null}
	);
	const [searchedNotes, setSearchedNotes] = useState<INote[] | null>(null);

	const toggleModal = useCallback(() => {
		setModal((prev) => {
			if (prev) setFormMode({edit: false, note: null});
			return !prev;
		});
	}, []);

	const handleEdit = useCallback(
		(note: INote) => {
			setFormMode({edit: true, note});
			toggleModal();
		},
		[toggleModal]
	);

	const handleSearch = useCallback((query: string) => {
		if (!query) {
			setSearchedNotes(null);
		} else {
			let filtered = notes.filter(
				(note) => note.title.includes(query) || note.description.includes(query)
			);
			setSearchedNotes(filtered);
		}
	}, []);

	return (
		<>
			<Container fluid>
				<Row className='bg-light'>
					<Col
						style={{
							margin: '2.5%',
						}}
					>
						<Button variant='primary' onClick={toggleModal}>
							Create New Note
						</Button>
					</Col>
					<Col
						style={{
							margin: '2.5%',
						}}
					>
						<SearchField onSearch={handleSearch} />
					</Col>
				</Row>
				<Row className='py-5 px-4'>
					<NoteList
						notes={searchedNotes ? searchedNotes : notes}
						onEdit={handleEdit}
					/>
				</Row>
				<NoteForm open={modal} onClose={toggleModal} mode={formMode} />
			</Container>
		</>
	);
};

export default React.memo(App);
