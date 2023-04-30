import { atom } from 'recoil';

export interface pageStateProperties {
	scannerIsVisible: boolean;
}

export const defaultPageState: pageStateProperties = {
	scannerIsVisible: false,
};

export const A_Page = atom({
	key: 'A_Page',
	default: defaultPageState,
});
