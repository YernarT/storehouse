// React router
import { BrowserRouter } from 'react-router-dom';

// Antd Component
import { ConfigProvider as AntdConfigProvider, App as AntdApp } from 'antd';
// Component
import { SafeArea } from '@/components/common';

// Locale
import kkKZ from 'antd/lib/locale/kk_KZ';

export default function App() {
	return (
		// 路由管理
		<BrowserRouter>
			{/* Antd UI */}

			<AntdConfigProvider
				theme={{
					token: {
						colorPrimary: '#2176ff',
						borderRadius: 4,
					},
				}}
				locale={kkKZ}>
				<AntdApp>
					<SafeArea />
				</AntdApp>
			</AntdConfigProvider>
		</BrowserRouter>
	);
}
