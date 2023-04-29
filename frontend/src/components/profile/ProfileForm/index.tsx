// Types
import type { API_UpdateProfileData } from '@/service/user-api';

// Recoil
import { useRecoilState } from 'recoil';
import { A_User } from '@/store';

// Hook
import { useRequest } from 'ahooks';
// API
import { API_UpdateProfile } from '@/service/user-api';
// Utils
import { localStorage } from '@/utils';

// Antd component
import { Button, Form, Input, App } from 'antd';

export default function ProfileForm() {
	const { message: AntdMessage } = App.useApp();
	const [user, setUser] = useRecoilState(A_User);
	const { runAsync, loading } = useRequest(API_UpdateProfile, { manual: true });

	const onFinish = (values: API_UpdateProfileData) => {
		runAsync(user.id, values)
			.then(data => {
				AntdMessage.success('Өзгерістер сәтті сақталды');
				localStorage.set('user', data);
				setUser(prevUser => ({ ...prevUser, ...data }));
			})
			.catch(error => {
				AntdMessage.error(error.message);
			});
	};

	return (
		<Form
			layout="vertical"
			initialValues={{
				fullname: user.fullname,
				phone: user.phone,
			}}
			onFinish={onFinish}
			autoComplete="off">
			<Form.Item
				label="Аты-жөн"
				name="fullname"
				rules={[
					{ required: true, message: 'Аты-жөн бос болмауы керек' },
					{ max: 40, message: 'Аты-жөн 40 таңбадан аспауы керек' },
				]}>
				<Input />
			</Form.Item>

			<Form.Item
				label="Телефон нөмер"
				name="phone"
				rules={[
					{ required: true, message: 'Телефон нөмер бос болмауы керек' },
					{ min: 11, message: 'Телефон нөмер 11 саннан құралу керек' },
					{ max: 11, message: 'Телефон нөмер 11 саннан құралу керек' },
				]}>
				<Input />
			</Form.Item>

			{/* <Form.Item
		label="Құпиясөз"
		name="password"
		rules={[{ max: 254, message: 'Құпиясөз 254 таңбадан аспауы керек' }]}>
		<Input.Password />
	</Form.Item> */}

			<Form.Item>
				<Button
					block
					size="large"
					type="primary"
					htmlType="submit"
					loading={loading}
					style={{ marginTop: 16 }}>
					Сақтау
				</Button>
			</Form.Item>
		</Form>
	);
}
