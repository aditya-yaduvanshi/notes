import React from 'react';
import {Col} from 'react-bootstrap';
import {INote, useNotes} from '../contexts/notes';
import NoteCard from './NoteCard';

type NoteListProps = {
	notes: INote[];
	onEdit: (note: INote) => void;
};

const NoteList: React.FC<NoteListProps> = ({notes, onEdit}) => {
	const {deleteNote} = useNotes();
	return (
		<>
			{notes.length ? (
				notes.map((note, index) => (
					<Col xs={12} sm={6} md={4} lg={3} key={`${note.id}-${index}-${note.title}`} className='p-2'>
						<NoteCard note={note} onEdit={onEdit} onDelete={deleteNote} />
					</Col>
				))
			) : (
				<h3>No Notes Found.</h3>
			)}
		</>
	);
};

export default React.memo(NoteList);
