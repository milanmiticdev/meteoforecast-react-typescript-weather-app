// Hooks
import { useContext } from 'react';

// Context
import AppContext from '../contexts/AppContext.js';

// Types
import type { CityType } from '../types/types.ts';

// Styles
import styles from './Dropdown.module.css';

const Dropdown = (): JSX.Element => {
	const { dispatch, cities, onCitySelect } = useContext(AppContext);

	return (
		<div className={styles.dropdown}>
			{cities.map((city: CityType): JSX.Element => {
				return (
					<div
						key={city.id}
						className={styles.dropdownItem}
						onClick={(): void => {
							onCitySelect(city.id);
							dispatch({ type: 'user_input', payload: '' });
							dispatch({ type: 'typing_check', payload: false });
						}}
					>
						<p>{`${city.name}, ${city.country}`}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Dropdown;
