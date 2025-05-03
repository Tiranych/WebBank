import { TClient } from 'types';
import { getMonthsBetweenDates } from './getMonthsBetweenDates';

export const getClientDebts = (client: TClient) => {
	let debtSummary = 0;
	let debtRemain = 0;
	let periodTotal = 0;
	let periodToPay = 0;
	let hasCurrentOverdueDebt = 0;
	let hasRepaidOverdueDebt = 0;
	let hasRestructuring = 0;

	client.debts.forEach((debt) => {
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
		periodToPay += getMonthsBetweenDates(new Date(), endDate);

		debtSummary += Number(debt.summary);
		debtRemain += Number(debt.remain);
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
