// Router
import { useHistory, useLocation } from 'react-router-dom';
// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { A_User, A_Page } from '@/store';

// Hooks
import { useCreation, useMemoizedFn } from 'ahooks';

// Antd component
import { Button } from 'antd';
// Custom component
import { RouteGuard } from '@/components/common';
// Icons
import { BiUser } from 'react-icons/bi';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';

// Scoped style
import classes from './style.module.scss';

// Routes
import routes from '@/routes';

export default function SafeArea() {
	const user = useRecoilValue(A_User);
	const setPage = useSetRecoilState(A_Page);
	const history = useHistory();
	const location = useLocation();

	const showFloatBtn = useCreation(() => {
		const disabledPages = ['/', '/login'];
		return !disabledPages.includes(location.pathname);
	}, [location.pathname]);

	const floatBtnIcon = useCreation(() => {
		if (user.isStaff) {
			return <MdOutlineQrCodeScanner />;
		}

		if (location.pathname === '/profile') {
			return <IoMdArrowRoundBack />;
		}

		return <BiUser />;
	}, [user.isStaff, location.pathname]);

	const handleFloatBtn = useMemoizedFn(() => {
		if (user.isStaff) {
			setPage(prevPage => ({ scannerIsVisible: !prevPage.scannerIsVisible }));
			return;
		}

		if (location.pathname === '/profile') {
			history.goBack();
			return;
		}

		history.push('/profile');
	});

	return (
		<div className={classes.safeArea}>
			<RouteGuard routes={routes} />
			{showFloatBtn && (
				<Button
					className="float-btn"
					type="primary"
					icon={floatBtnIcon}
					onClick={handleFloatBtn}
				/>
			)}
		</div>
	);
}
