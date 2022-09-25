import {useState, useEffect, useCallback} from 'react';

const useLocalStorage = <T>(
	key: string,
	initialValue: T
): [value: T, setValue: React.Dispatch<React.SetStateAction<T>>] => {
	const getStoredValue = useCallback(() => {
		let item = localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	}, [key, initialValue]);

	const [value, setValue] = useState<T>(getStoredValue);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

export default useLocalStorage;
