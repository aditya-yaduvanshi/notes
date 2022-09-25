import React, {useEffect, useState} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import {INote, useNotes} from '../contexts/notes';

type NoteFormProps = {
	mode: {
		edit: boolean;
		note: INote | null;
	};
	open: boolean;
	onClose: () => void;
};

const NoteForm: React.FC<NoteFormProps> = ({mode, open, onClose}) => {
	const {addNote, updateNote} = useNotes();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (!mode.edit || !mode.note) return;
		setTitle(mode.note.title);
		setDescription(mode.note.description);
	}, [mode.edit, mode.note]);

	const handleSubmit = () => {
		let done;
		if (mode.edit && mode.note) {
			done = updateNote({title, description, id: mode.note.id});
		} else done = addNote({title, description, id: new Date().getTime()});

		if (!done) return;

		setTitle('');
		setDescription('');
		onClose();
	};

	return (
		<>
			<Modal show={open} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{mode.edit && mode.note ? 'Edit' : 'Create'} Note
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={(e) => e.preventDefault()}>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control
								placeholder='Note Title'
								value={title}
								onChange={({target: {value}}) => setTitle(value)}
							/>
						</Form.Group>
						<Form.Group style={{margin: '20px 0'}}>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								placeholder='Note Description'
								value={description}
								onChange={({target: {value}}) => setDescription(value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={onClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleSubmit}>
						{mode.edit && mode.note ? 'Save' : 'Create'} Note
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default React.memo(NoteForm);
