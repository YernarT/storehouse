// React router
import { useHistory } from 'react-router-dom';

// Hooks
import { useMemoizedFn } from 'ahooks';

// Antd component
import { Button } from 'antd';

// Scoped style
import classes from './style.module.scss';

export default function IntroPage() {
	const history = useHistory();

	const toLogin = useMemoizedFn((role: 'user' | 'staff') => {
		history.push('/login', { for: role });
	});

	return (
		<main className={classes.introPage}>
			<h1 className="title">
				<span>QR</span> Билет
			</h1>
			<h3 className="subtitle">QR кодға негізделген билет жүйесі</h3>

			<div className="action-group">
				<Button
					block
					type="primary"
					size="large"
					onClick={() => toLogin('user')}>
					Пайдаланушы ретінде кіру
				</Button>
				<Button
					block
					type="primary"
					size="large"
					onClick={() => toLogin('staff')}>
					Қызметші ретінде кіру
				</Button>
			</div>
		</main>
	);
}
