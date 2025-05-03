export function getMonthsBetweenDates(startDate: Date, endDate: Date) {
	// Получаем разницу в месяцах
	const yearDiff = endDate.getFullYear() - startDate.getFullYear();
	const monthDiff = endDate.getMonth() - startDate.getMonth();

	// Общее количество месяцев
	const totalMonths = yearDiff * 12 + monthDiff;

	// Учитываем, если конечный день месяца меньше начального (например, 31 марта - 28 февраля)
	// В этом случае можно вычесть 1 месяц, если требуется точный подсчёт
	if (endDate.getDate() < startDate.getDate()) {
		return totalMonths - 1;
	}

	return totalMonths;
}
