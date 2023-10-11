import { useContext } from 'react';
import AppContext from '../contexts/AppContext.js';
import WeatherCard from './WeatherCard.js';
import styles from './Forecast.module.css';
import type { ForecastProps } from '../types/props.ts';
import type { DateType } from '../types/types.ts';

const Forecast = ({ storedCity }: ForecastProps): JSX.Element => {
	const { weather } = useContext(AppContext);

	// Max Temperatures for the next 6 days
	const maxTemperatures: number[] = weather.daily.temperature_2m_max.filter(
		(temperature: number, index: number): boolean =>
			typeof temperature === 'number' && index !== 0
	);

	// Min Temperatures for the next 6 days
	const minTemperatures: number[] = weather.daily.temperature_2m_min.filter(
		(temperature: number, index: number): boolean =>
			typeof temperature === 'number' && index !== 0
	);

	// Dates for the next 6 days
	const dates: DateType[] = weather.daily.time
		.filter((date: string, index: number): boolean => typeof date === 'string' && index !== 0)
		.map((date: string): DateType => {
			return {
				day: new Date(date).getDate(),
				month: new Date(date).getMonth() + 1,
				year: new Date(date).getFullYear(),
			};
		});

	// UV Indexes for the next 6 days
	const uvIndexes: number[] = weather.daily.uv_index_max.filter(
		(uvIndex: number, index: number): boolean => typeof uvIndex === 'number' && index !== 0
	);

	// Weathercodes for the next 6 days
	const weathercodes: number[] = weather.daily.weathercode.filter(
		(weathercode: number, index: number): boolean =>
			typeof weathercode === 'number' && index !== 0
	);

	return (
		<section className={styles.forecast}>
			{dates.map((date: DateType, index: number): JSX.Element => {
				return (
					<WeatherCard
						key={date.day}
						storedCity={storedCity}
						date={date}
						maxTemperature={maxTemperatures[index]}
						minTemperature={minTemperatures[index]}
						uvIndex={uvIndexes[index]}
						weathercode={weathercodes[index]}
						addedStyles={styles}
					/>
				);
			})}
		</section>
	);
};

export default Forecast;
