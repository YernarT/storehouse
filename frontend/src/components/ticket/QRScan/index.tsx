// Types
import type { Ref } from 'react';

// React
import { forwardRef } from 'react';

// Scoped style
import classes from './style.module.scss';

export default forwardRef<HTMLVideoElement, {}>(function QRScan(
	_,
	ref: Ref<HTMLVideoElement>,
) {
	return (
		<div>
			<p>Scanner open</p>
		</div>
	);
});
