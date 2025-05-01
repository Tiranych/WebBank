import { mainColor, majorBlue } from './variables';

type MaritalKeys = 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW' | 'CIVIL';
type EducationKeys =
	| 'INCOMPLETE_SECONDARY'
	| 'INCOMPLETE_HIGHER'
	| 'ACADEMIC_DEGREE'
	| 'MEDIUM'
	| 'HIGHER';
type WorkStatusKeys =
	| 'SELF_EMPLOYED'
	| 'WORK_FOR_HIRE'
	| 'IE'
	| 'PRIVATE_PRACTICE'
	| 'MILITARY'
	| 'RETIRED'
	| 'UN_EMPLOYED';
type EstateKeys = 'FLAT' | 'HOUSE' | 'OFFICE' | 'LAND_PLOT' | 'GARAGE';
type ScheduleKeys = 'ANNUITIES' | 'DIFFERENTIATED';
type PurposeKeys = 'CAR_PURCHASE' | 'ESTATE_PURCHASE' | 'CONSUMER_PURPOSE';
type ProvisionKeys = 'ESTATE' | 'TRANSPORT' | 'GUARANTEE' | 'BILL' | 'NO_PROVISION';

export const MaritalStatuses: Record<MaritalKeys, string> = {
	MARRIED: 'Женат (замужем)',
	DIVORCED: 'Разведен(а)',
	SINGLE: 'Холост (не замужем)',
	WIDOW: 'Вдовец (вдова)',
	CIVIL: 'Гражданский брак',
};

export const EducationTypes: Record<EducationKeys, string> = {
	INCOMPLETE_SECONDARY: 'Незаконченное среднее',
	INCOMPLETE_HIGHER: 'Неполное высшее',
	ACADEMIC_DEGREE: 'Ученая степень',
	MEDIUM: 'Среднее (включая специальное)',
	HIGHER: 'Высшее',
};

export const WorkStatuses: Record<WorkStatusKeys, string> = {
	SELF_EMPLOYED: 'Самозанятый',
	WORK_FOR_HIRE: 'Работа по найму',
	IE: 'ИП',
	PRIVATE_PRACTICE: 'Частная практика',
	MILITARY: 'Военнослужащий',
	RETIRED: 'Пенсионер',
	UN_EMPLOYED: 'Безработный',
};

export const EstateTypes: Record<EstateKeys, string> = {
	FLAT: 'Квартира',
	HOUSE: 'Дом',
	OFFICE: 'Офис',
	LAND_PLOT: 'Земельный участок',
	GARAGE: 'Гараж',
};

export const ScheduleTypes: Record<ScheduleKeys, string> = {
	ANNUITIES: 'Аннуитетные платежи',
	DIFFERENTIATED: 'Дифференцированные платежи',
};

export const PurposeTypes: Record<PurposeKeys, string> = {
	CONSUMER_PURPOSE: 'Потребительские цели',
	CAR_PURCHASE: 'Покупка транспорта',
	ESTATE_PURCHASE: 'Покупка недвижимости',
};

export const ProvisionTypes: Record<ProvisionKeys, string> = {
	ESTATE: 'Недвижмость',
	TRANSPORT: 'Движимое имущество',
	GUARANTEE: 'Поручительство',
	BILL: 'Вексель',
	NO_PROVISION: 'Без обеспечения',
};

export const sizeMap = {
	xsmall: {
		r: 6,
		strokeWidth: 3,
	},
	small: {
		r: 10,
		strokeWidth: 4,
	},
	medium: {
		r: 17,
		strokeWidth: 6,
	},
	large: {
		r: 32,
		strokeWidth: 8,
	},
};

export const colorMap = {
	blue: majorBlue,
	white: mainColor,
};
