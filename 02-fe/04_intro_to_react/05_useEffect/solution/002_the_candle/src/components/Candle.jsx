import { useState, useEffect } from 'react';

const Candle = () => {
	const [height, setHeight] = useState(85);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setHeight((prev) => prev - 10);
		}, 2000);

		if (height <= 10) setHeight(85);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [height]);

	return (
		<div className='exercise'>
			<div className='candleContainer'>
				<div className='candle' style={{ height: `${height}%` }}>
					<div className='flame'>
						<div className='shadows' />
						<div className='top' />
						<div className='middle' />
						<div className='bottom' />
					</div>
					<div className='wick' />
					<div className='wax' />
				</div>
			</div>
		</div>
	);
};

export default Candle;
