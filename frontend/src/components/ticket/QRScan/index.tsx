// Types
import type { Ref } from 'react';
import type { OnResultFunction } from 'react-qr-reader';

// React
import { forwardRef, useRef, useEffect } from 'react';

// QR lib
import { QrReader } from 'react-qr-reader';

// Antd components
import { Button } from 'antd';

// Scoped style
import classes from './style.module.scss';

interface QRScanProps {
	onResolve: (result: string) => void;
}

// TODO: add timeout detection
export default forwardRef<HTMLVideoElement, QRScanProps>(function QRScan(
	{ onResolve },
	ref: Ref<HTMLVideoElement>,
) {
	const handleScan: OnResultFunction = (result, _) => {
		if (result) {
			onResolve(result.getText());
		}
	}

	return (
		<div className={classes.scanner}>
			<video id="video" />
			<QrReader
				scanDelay={300}
				constraints={{ facingMode: 'environment' }}
				onResult={handleScan} />
		</div>
	);
});
