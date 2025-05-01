import React, { FC } from 'react';

import { colorMap, sizeMap } from '@utils/constants';

import { SpinSvg, SpinWrapper } from './Spin.styled';

export type TSpinSizes = 'xsmall' | 'small' | 'medium' | 'large';
export type TSpinColor = 'white' | 'blue';

export interface ISpinProps {
	isLoading: boolean;
	size: TSpinSizes;
	color?: TSpinColor;
}

const percentOfFill = 70;
const c = (2 * 3.14 * percentOfFill) / 100;

export const Spin: FC<ISpinProps> = ({ isLoading, size, color = 'blue' }) => {
	const { r, strokeWidth } = sizeMap[size];
	const strokeDashSize = r * c;
	const mainSize = r * 2 + strokeWidth;
	const cx = mainSize / 2;
	const cy = cx;
	const strokeColor = colorMap[color];

	return (
		<>
			<SpinWrapper>
				<SpinSvg
					xmlns='http://www.w3.org/2000/svg'
					viewBox={`0 0 ${mainSize} ${mainSize}`}
					width={mainSize}
					height={mainSize}
				>
					<circle
						strokeWidth={strokeWidth}
						cx={cx}
						cy={cy}
						r={r}
						strokeLinecap='round'
						strokeDasharray={strokeDashSize}
						strokeDashoffset='0'
						fill='transparent'
						stroke={strokeColor}
					/>
				</SpinSvg>
			</SpinWrapper>
		</>
	);
};
