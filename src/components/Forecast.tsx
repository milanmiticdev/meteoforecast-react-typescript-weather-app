import { useContext } from 'react';
import AppContext from '../contexts/AppContext.js';
import WeatherCard from './WeatherCard.js';
import styles from './Forecast.module.css';
import type { ForecastProps } from '../types/props.ts';
import type { DateType } from '../types/types.ts';

const Forecast = ({ storedCity }: ForecastProps): JSX.Element => {
	const { weather } = useContext(AppContext);

	// Max Temperatures for the next 6 days
	const maxTemperatures: number[] = weather.daily.temperature_2m_max.slice(
		1,
		weather.daily.temperature_2m_max.length
	);

	// Min Temperatures for the next 6 days
	const minTemperatures: number[] = weather.daily.temperature_2m_min.slice(
		1,
		weather.daily.temperature_2m_min.length
	);

	// Dates for the next 6 days
	const dates: DateType[] = weather.daily.time.slice(1, weather.daily.time.length).map((date: string): DateType => {
		return {
			day: new Date(date).getDate(),
			month: new Date(date).getMonth() + 1,
			year: new Date(date).getFullYear(),
		};
	});

	// UV Indexes for the next 6 days
	const uvIndexes: number[] = weather.daily.uv_index_max.slice(1, weather.daily.uv_index_max.length);

	// Weathercodes for the next 6 days
	const weathercodes: number[] = weather.daily.weathercode.slice(1, weather.daily.weathercode.length);

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
