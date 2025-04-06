import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { TClients } from 'types';

import { Subtitle, Wrapper } from './IncomeDiagram.styled';

type IncomeDiagramProps = {
	clients: TClients;
};

const incomeDiagramColors = [
	'rgb(255, 99, 132)',
	'rgb(54, 162, 235)',
	'rgb(255, 205, 86)',
	'rgb(25, 205, 86)',
	'rgb(25, 25, 56)',
];

ChartJS.register(ArcElement, Tooltip, Legend);

export const IncomeDiagram = ({ clients }: IncomeDiagramProps) => {
	let res = [0, 0, 0, 0, 0];

	const groupByIncome = () => {
		clients.forEach((client) => {
			const income = client.income;

			if (income >= 10000 && income < 30000) {
				res[0]++;
			} else if (income >= 30000 && income < 50000) {
				res[1]++;
			} else if (income >= 50000 && income < 80000) {
				res[2]++;
			} else if (income >= 80000 && income < 100000) {
				res[3]++;
			} else {
				res[4]++;
			}
		});

		return res;
	};

	return (
		<Wrapper>
			<Subtitle>Диаграмма по доходу</Subtitle>
			<Pie
				data={{
					labels: [
						'10тыс. - 30тыс. рублей',
						'30тыс. - 50тыс. рублей',
						'50тыс. - 80тыс. рублей',
						'80тыс. - 110тыс. рублей',
						'110тыс.+ рублей',
					],
					datasets: [
						{
							label: 'Возраст',
							data: groupByIncome(),
							backgroundColor: incomeDiagramColors,
							hoverOffset: 4,
						},
					],
				}}
				options={{
					plugins: {
						tooltip: {
							callbacks: {
								label: (data) => {
									let value = data.dataset.data[data.dataIndex];
									return ((value / clients.length) * 100).toFixed(1) + '%';
								},
							},
						},
					},
				}}
				style={{ maxHeight: '400px', maxWidth: '400px' }}
			/>
		</Wrapper>
	);
};
