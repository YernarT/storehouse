// Types
import type { TabsProps } from 'antd';

// Antd component
import { Tabs } from 'antd';
// Custom component
import { ProfileForm, MyTicket } from '@/components/profile';

// Scoped style
import classes from './style.module.scss';

const items: TabsProps['items'] = [
	{
		key: 'profileForm',
		label: 'Профиль',
		children: <ProfileForm />,
	},
	{
		key: 'MyTicket',
		label: 'Билеттерім',
		children: <MyTicket />,
	},
];

export default function ProfilePage() {
	return (
		<main className={classes.profilePage}>
			<Tabs defaultActiveKey="profileForm" items={items} />
		</main>
	);
}
