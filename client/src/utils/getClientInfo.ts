import { TAssetCar, TAssetEstate, TCreditHistories } from 'types';

import { getMonthsBetweenDates } from './getMonthsBetweenDates';

export const getClientDebts = (debts: TCreditHistories) => {
	let debtSummary = 0;
	let debtRemain = 0;
	let periodTotal = 0;
	let periodToPay = 0;
	let hasCurrentOverdueDebt = 0;
	let hasRepaidOverdueDebt = 0;
	let hasRestructuring = 0;

	debts.length > 0 &&
		debts.forEach((debt) => {
			const startDate = new Date(
				Number(debt.startDate.split('.')[2]),
				Number(debt.startDate.split('.')[1]) - 1,
				Number(debt.startDate.split('.')[0])
			);

			const endDate = new Date(
				Number(debt.endDate.split('.')[2]),
				Number(debt.endDate.split('.')[1]) - 1,
				Number(debt.endDate.split('.')[0])
			);

			periodTotal += getMonthsBetweenDates(startDate, endDate);
			periodToPay += Math.abs(getMonthsBetweenDates(endDate, new Date()));
			debtSummary += debt.creditSummary;
			debtRemain += debt.creditRemain;
			hasCurrentOverdueDebt = debt.hasCurrentOverdueDebt ? 1 : 0;
			hasRepaidOverdueDebt = debt.hasRepaidOverdueDebt ? 1 : 0;
			hasRestructuring = debt.hasRestructuring ? 1 : 0;
		});

	return {
		debtSummary,
		debtRemain,
		periodTotal,
		periodToPay,
		hasCurrentOverdueDebt,
		hasRepaidOverdueDebt,
		hasRestructuring,
	};
};

export const getClientCars = (cars: TAssetCar[]) => {
	let totalCarPrice = 0;

	cars.length > 0 &&
		cars.forEach((car) => {
			totalCarPrice += car.price;
		});
	return totalCarPrice;
};

export const getClientEstates = (estates: TAssetEstate[]) => {
	let totalEstatePrice = 0;

	estates.length > 0 &&
		estates.forEach((estate) => {
			totalEstatePrice += estate.price;
		});
	return totalEstatePrice;
};

export const getClientAge = (date: string) => {
	let birthDate = new Date(date);
	let today = new Date();

	let age = today.getFullYear() - birthDate.getFullYear();

	const monthDiff = today.getMonth() - birthDate.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	return age;
};
