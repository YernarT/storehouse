interface localStorageProperties {
	// Read
	get<T>(
		key: string,
		// Default value
		defaultValue: T,
		// Deserialization method
		deserializer?: (value: string) => T,
	): T;
	// Write
	set<T>(
		key: string,
		// Value
		value: T,
		// Serialization method
		serializer?: (value: T) => string,
	): void;

	// Data prefix, used to distinguish it from other data (suggestion: project name)
	_DATA_PREFIX: string;
	// Version
	_DATA_VERSION: string;
	// Version mark
	_VERSION_MARK_STRING: string;
	// Check version
	_checkDataVersion: (data: string) => boolean;
}

export const localStorage: localStorageProperties = {
	get(key, defaultValue, deserializer?) {
		let data = window.localStorage.getItem(key);

		// key exist
		if (data) {
			// check version
			if (this._checkDataVersion(data)) {
				// remove version info
				data = data.replace(this._VERSION_MARK_STRING, '');

				let deserializedData;
				// do deserialization
				try {
					deserializedData = deserializer?.(data) ?? JSON.parse(data);
				} catch (error) {
					console.error(
						`localStorage.get deserialization exception: \n${error}`,
					);
					deserializedData = defaultValue;
				}

				return deserializedData;
			}
		}

		return defaultValue;
	},

	set(key, value, serializer?) {
		// do serialization
		let serializedValue = serializer?.(value) ?? JSON.stringify(value);
		// mark verison
		let serializedData = `${this._DATA_PREFIX}=${this._DATA_VERSION};${serializedValue}`;

		window.localStorage.setItem(key, serializedData);
	},

	_DATA_PREFIX: 'QR_Ticket',
	_DATA_VERSION: '1.0.0',

	get _VERSION_MARK_STRING() {
		return `${this._DATA_PREFIX}=${this._DATA_VERSION};`;
	},

	_checkDataVersion(data) {
		return data.startsWith(this._VERSION_MARK_STRING);
	},
};
