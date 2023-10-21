// Types
import type { WeatherIconProps } from '../types/props.ts';

// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faSmog } from '@fortawesome/free-solid-svg-icons';
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';

const WeatherIcon = ({ weathercode, iconStyles }: WeatherIconProps): JSX.Element => {
	return (
		<>
			{weathercode === 0 && <FontAwesomeIcon icon={faSun} className={iconStyles.icon} />}

			{(weathercode === 1 || weathercode === 2) && (
				<FontAwesomeIcon icon={faCloudSun} className={iconStyles.icon} />
			)}

			{weathercode === 3 && <FontAwesomeIcon icon={faCloud} className={iconStyles.icon} />}

			{(weathercode === 45 || weathercode === 48) && (
				<FontAwesomeIcon icon={faSmog} className={iconStyles.icon} />
			)}

			{(weathercode === 51 || weathercode === 56 || weathercode === 61) && (
				<FontAwesomeIcon icon={faCloudSunRain} className={iconStyles.icon} />
			)}

			{(weathercode === 53 ||
				weathercode === 55 ||
				weathercode === 57 ||
				weathercode === 63 ||
				weathercode === 65 ||
				weathercode === 66 ||
				weathercode === 67) && <FontAwesomeIcon icon={faCloudRain} className={iconStyles.icon} />}

			{(weathercode === 71 || weathercode === 73 || weathercode === 75 || weathercode === 77) && (
				<FontAwesomeIcon icon={faSnowflake} className={iconStyles.icon} />
			)}

			{(weathercode === 80 ||
				weathercode === 81 ||
				weathercode === 82 ||
				weathercode === 85 ||
				weathercode === 86) && <FontAwesomeIcon icon={faCloudShowersHeavy} className={iconStyles.icon} />}

			{(weathercode === 95 || weathercode === 96 || weathercode === 99) && (
				<FontAwesomeIcon icon={faCloudBolt} className={iconStyles.icon} />
			)}
		</>
	);
};

export default WeatherIcon;
