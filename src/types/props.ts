import type { CityType } from './types.ts';

export interface ForecastProps {
	storedCity: CityType;
}

export interface TodayProps {
	storedCity: CityType;
}

export interface WeatherCardProps {
	storedCity: CityType;
	date: {
		day: number;
		month: number;
		year: number;
	};
	maxTemperature: number;
	minTemperature: number;
	uvIndex: number;
	weathercode: number;
	addedStyles: CSSModuleClasses;
}

export interface WeatherIconProps {
	weathercode: number;
	iconStyles: CSSModuleClasses;
}

export interface WrapperProps {
	children: React.ReactNode;
}
