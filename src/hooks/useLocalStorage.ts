// Hooks
import { useState, useEffect } from 'react';
import type { UseLocalStorageType } from '../types/types.ts';

const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageType<T> => {
	const [value, setValue] = useState<T>((): T => {
		const storedValue: string | null = window.localStorage.getItem(key);
		if (storedValue) {
			const parsedValue: T = JSON.parse(storedValue);
			return parsedValue;
		} else {
			return initialValue;
		}
	});

	useEffect((): void => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
