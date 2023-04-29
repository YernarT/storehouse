// Type
import type { API_LoginData } from '@/service/user-api';

// Router
import { useHistory, useLocation } from 'react-router-dom';
// Recoil
import { useSetRecoilState } from 'recoil';
import { A_User } from '@/store';

// Hooks
import { useCreation, useRequest } from 'ahooks';
// API
import { API_Login } from '@/service/user-api';
// Utils
import { localStorage } from '@/utils';

// Antd component
import { Button, Form, Input, App } from 'antd';

// Scoped style
import classes from './style.module.scss';

export default function LoginPage() {
	const { message: AntdMessage } = App.useApp();
	const history = useHistory();
	const { state: locationState } = useLocation();
	const setUser = useSetRecoilState(A_User);

	const loginAsStaff = useCreation(() => {
		// @ts-ignore
		return (locationState?.for && locationState.for) === 'staff';
	}, [locationState]);

	const loginLabel = useCreation(() => {
		// @ts-ignore
		if (loginAsStaff) {
			return 'Қызметші ID немесе телефон нөмер';
		}

		return 'Телефон нөмер';
	}, [loginAsStaff]);

	// Login API
	const { runAsync, loading } = useRequest(API_Login, { manual: true });
	// Login logic
	const onFinish = async (values: Omit<API_LoginData, 'isStaff'>) => {
		const res = await runAsync({ ...values, isStaff: loginAsStaff }).catch(
			error => {
				AntdMessage.error(error.message);
			},
		);

		if (res) {
			AntdMessage.success('Кіру сәтті');
			localStorage.set('user', res);
			setUser(res);
			history.push('/ticket');
		}
	};

	return (
		<main className={classes.loginPage}>
			<h3 className="title">Жүйеге кіру</h3>

			<Form
				className="form"
				layout="vertical"
				autoComplete="off"
				onFinish={onFinish}>
				<Form.Item
					label={loginLabel}
					name="login"
					rules={[
						{ required: true, message: 'Міндетті өріс' },
						{ max: 11, message: '11 таңбадан аспауы керек' },
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Құпия сөз"
					name="password"
					rules={[{ required: true, message: 'Құпия сөз енгізіңіз' }]}>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						size="large"
						className="primary-btn"
						loading={loading}>
						Кіру
					</Button>
				</Form.Item>
			</Form>
		</main>
	);
}
