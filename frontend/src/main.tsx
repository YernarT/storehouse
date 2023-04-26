// React
import React from 'react';
import ReactDOM from 'react-dom';

// 全局状态
import { RecoilRoot } from 'recoil';

// React App
import App from '@/components/App';

// Global CSS Files
import '@/assets/style/variable.css';
import '@/assets/style/reset.css';

// Render v-dom to read-dom
ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>,
	// container
	document.getElementById('root'),
);
