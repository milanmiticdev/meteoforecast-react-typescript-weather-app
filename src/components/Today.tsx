import { useContext } from 'react';
import AppContext from '../contexts/AppContext.ts';
import WeatherCard from './WeatherCard.tsx';
import styles from './Today.module.css';
import type { TodayProps } from '../types/props.ts';
import type { DateType } from '../types/types.ts';

const Today = ({ storedCity }: TodayProps): JSX.Element => {
	const { weather } = useContext(AppContext);

	const date: DateType = {
		day: new Date(weather.daily.time[0]).getDate(),
		month: new Date(weather.daily.time[0]).getMonth() + 1,
		year: new Date(weather.daily.time[0]).getFullYear(),
	};

	return (
		<section className={styles.today}>
			<WeatherCard
				storedCity={storedCity}
				date={date}
				maxTemperature={weather.daily.temperature_2m_max[0]}
				minTemperature={weather.daily.temperature_2m_min[0]}
				uvIndex={weather.daily.uv_index_max[0]}
				weathercode={weather.daily.weathercode[0]}
				addedStyles={styles}
			/>
		</section>
	);
};

export default Today;
