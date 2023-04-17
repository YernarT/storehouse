import _ from 'lodash';

export function convertKeysCase(
	object: object,
	case_: 'camel' | 'snake',
): object {
	if (Array.isArray(object)) {
		return object.map(item => convertKeysCase(item, case_));
	}

	const newObj = {};

	_.forEach(object, (value, key) => {
		if (_.isObject(value)) {
			// @ts-ignore
			newObj[_[`${case_}Case`](key)] = convertKeysCase(value, case_);
		} else {
			// @ts-ignore
			newObj[_[`${case_}Case`](key)] = value;
		}
	});

	return newObj;
}
