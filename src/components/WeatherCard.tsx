import { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon.tsx';
import styles from './WeatherCard.module.css';
import type { WeatherCardProps } from '../types/props.ts';

const WeatherCard = ({
	storedCity,
	date,
	maxTemperature,
	minTemperature,
	uvIndex,
	weathercode,
	addedStyles,
}: WeatherCardProps): JSX.Element => {
	const [uvDesc, setUvDesc] = useState<string>('');

	useEffect(() => {
		const changeUvDesc = (uvIndex: number): void => {
			if (Math.round(uvIndex) >= 0 && Math.round(uvIndex) <= 2) {
				setUvDesc('low');
			} else if (Math.round(uvIndex) >= 3 && Math.round(uvIndex) <= 5) {
				setUvDesc('moderate');
			} else if (Math.round(uvIndex) >= 6 && Math.round(uvIndex) <= 7) {
				setUvDesc('high');
			} else if (Math.round(uvIndex) >= 8 && Math.round(uvIndex) <= 10) {
				setUvDesc('veryHigh');
			} else {
				setUvDesc('extreme');
			}
		};
		changeUvDesc(uvIndex);
	}, [uvIndex]);

	return (
		<div className={`${styles.card} ${addedStyles.card}`}>
			<p>{`${date.day}.${date.month}.${date.year}`}</p>
			<div className={styles.header}>
				<h2
					className={`${styles.heading} ${addedStyles.heading}`}
				>{`${storedCity.name.toUpperCase()}`}</h2>
				<p>{`${storedCity.country}`}</p>
			</div>
			<div className={`${styles.main} ${addedStyles.main}`}>
				<WeatherIcon weathercode={weathercode} iconStyles={addedStyles} />
				<p className={`${styles.temperature} ${addedStyles.temperature}`}>{`${Math.round(
					maxTemperature
				)} °C / ${Math.round(minTemperature)} °C`}</p>
				<div className={`${styles.uv} ${styles[`${uvDesc}`]}`}>
					<p>{`UV Index: ${Math.round(uvIndex)}`}</p>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
