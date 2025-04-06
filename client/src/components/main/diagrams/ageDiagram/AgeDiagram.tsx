import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { TClients } from 'types';

import { Subtitle, Wrapper } from './AgeDiagram.styled';

type AgeDiagramProps = {
	clients: TClients;
};

const ageDiagramColors = [
	'rgb(255, 99, 132)',
	'rgb(54, 162, 235)',
	'rgb(255, 205, 86)',
	'rgb(25, 205, 86)',
	'rgb(25, 25, 56)',
];

ChartJS.register(ArcElement, Tooltip, Legend);

export const AgeDiagram = ({ clients }: AgeDiagramProps) => {
	let res = [0, 0, 0, 0, 0];

	const groupByAge = () => {
		clients.forEach((client) => {
			const age = client.age;

			if (age >= 18 && age < 25) {
				res[0]++;
			} else if (age >= 25 && age < 31) {
				res[1]++;
			} else if (age >= 31 && age < 37) {
				res[2]++;
			} else if (age >= 25 && age < 45) {
				res[3]++;
			} else {
				res[4]++;
			}
		});

		return res;
	};

	return (
		<Wrapper>
			<Subtitle>Диаграмма по возрасту</Subtitle>
			<Pie
				data={{
					labels: ['18-24 лет', '25-30 лет', ' 31-36 лет', '37-45 лет', '45+ лет'],
					datasets: [
						{
							data: groupByAge(),
							backgroundColor: ageDiagramColors,
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
