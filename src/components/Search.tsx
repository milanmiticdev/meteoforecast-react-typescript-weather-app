import { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext.js';
import styles from './Search.module.css';

const Search = (): JSX.Element => {
	const { dispatch, input } = useContext(AppContext);

	useEffect((): void => {
		if (input.length > 0) {
			dispatch({ type: 'city_name_entered', payload: input });
			dispatch({ type: 'typing_check', payload: true });
		} else {
			dispatch({ type: 'city_name_entered', payload: '' });
			dispatch({ type: 'typing_check', payload: false });
		}
	}, [dispatch, input]);

	return (
		<div className={styles.wrapper}>
			<input
				id="search-city"
				className={styles.search}
				name="search-city"
				autoFocus
				type="text"
				placeholder="Search a city..."
				value={input}
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					dispatch({ type: 'user_input', payload: e.target.value });
					dispatch({ type: 'typing_check', payload: true });
				}}
			/>
		</div>
	);
};

export default Search;
