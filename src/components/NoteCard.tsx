import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {INote} from '../contexts/notes';

type NoteCardProps = {
	note: INote;
	onEdit: (note: INote) => void;
	onDelete: (noteId: INote['id']) => void;
};

const NoteCard: React.FC<NoteCardProps> = ({note, onEdit, onDelete}) => {
	return (
		<>
			<Card>
				<Card.Header>
					<Card.Title>{note.title}</Card.Title>
				</Card.Header>
				<Card.Body>
					<Card.Text>{note.description}</Card.Text>
				</Card.Body>
				<Card.Footer style={{display: 'flex', justifyContent: 'space-between'}}>
					<Button variant='primary' onClick={() => onEdit(note)}>
						Edit
					</Button>
					<Button variant='danger' onClick={() => onDelete(note.id)}>
						Delete
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default React.memo(NoteCard);
