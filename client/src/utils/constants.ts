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
