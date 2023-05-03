// Types
import type { Ref } from 'react';

// React
import { forwardRef, useRef, useEffect } from 'react';

// QR lib
import jsQR from 'jsqr';
// Hooks
import { useInterval, useSetState } from 'ahooks';

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
	const videoRef = useRef<HTMLVideoElement>(null);
	const [state, setState] = useSetState<{
		cameraList: MediaDeviceInfo[];
		currentCameraIdx: number;
	}>({
		cameraList: [],
		currentCameraIdx: -1,
	});

	// 获取用户摄像头
	useEffect(() => {
		navigator.mediaDevices
			.enumerateDevices()
			.then(devices => {
				setState({
					cameraList: devices.filter(device => device.kind === 'videoinput'),
				});
			})
			.catch(() => {});
	}, []);

	// 获取用户设备视频流
	useEffect(() => {
		if (state.currentCameraIdx < 0) {
			return;
		}

		navigator.mediaDevices
			.getUserMedia({
				video: {
					width: {
						exact: screen.width * 0.85,
					},
					height: {
						exact: 285,
					},
					// 选择摄像头
					facingMode: state.cameraList[state.currentCameraIdx].deviceId,
				},
			})
			.then(stream => {
				videoRef.current!.srcObject = stream;
				videoRef.current!.play();
			})
			.catch(() => {});
	}, [state.currentCameraIdx, state.cameraList]);

	// 每隔一段时间检测一次视频流中是否有 QR 码
	useInterval(() => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);

		// 从 canvas 上获取图像数据
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		// 使用 jsQR 库来解析 QR 码
		const code = jsQR(imageData.data, imageData.width, imageData.height, {
			inversionAttempts: 'dontInvert',
		});

		// 如果找到了 QR 码，将其输出到控制台
		if (code) {
			onResolve(code.data);
		}
	}, 240);

	return (
		<div className={classes.scanner}>
			<video ref={videoRef}></video>
			<div className="camera-list">
				{state.cameraList.map((camera, idx) => (
					<Button
						key={camera.deviceId + idx}
						className="camera"
						type={state.currentCameraIdx === idx ? 'primary' : 'default'}
						onClick={() => {
							setState({ currentCameraIdx: idx });
						}}>
						{camera.label} Камера 1
					</Button>
				))}
			</div>
		</div>
	);
});
