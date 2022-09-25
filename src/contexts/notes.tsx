import React, {
	PropsWithChildren,
	useCallback,
	useContext,
	createContext,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export interface INote {
	id: number;
	title: string;
	description: string;
}

export interface INotesContext {
	notes: INote[];
	addNote: (note: INote) => boolean;
	updateNote: (note: INote) => boolean;
	deleteNote: (noteId: INote['id']) => boolean;
}

const NotesContext = createContext<INotesContext | null>(null);

export const useNotes = () => {
	return useContext(NotesContext) as INotesContext;
};

const NotesProvider: React.FC<PropsWithChildren> = ({children}) => {
	const [notes, setNotes] = useLocalStorage<INote[]>('notes', []);

	const addNote = useCallback((note: INote) => {
		setNotes((prev) => [note, ...prev]);
		return true;
	}, []);

	const deleteNote = useCallback((noteId: INote['id']) => {
		setNotes((prev) => prev.filter((note) => note.id !== noteId));
		return true;
	}, []);

	const updateNote = useCallback((note: Partial<INote>) => {
		let success = false;
		setNotes((prev) => {
			let index = prev.findIndex((n) => note.id === n.id);
			if (index > -1) {
				prev[index].title = note.title ?? prev[index].title;
				prev[index].description = note.description ?? prev[index].description;
				success = true;
			} else success = false;
			return [...prev];
		});
		return success;
	}, []);

	return (
		<>
			<NotesContext.Provider value={{notes, addNote, updateNote, deleteNote}}>
				{children}
			</NotesContext.Provider>
		</>
	);
};

export default React.memo(NotesProvider);
