type StorageCallback<T> = (items: T) => void;

interface StorageInterface {
	get: <T>(key: string, defaultValue: T, callback: StorageCallback<T>) => void;
	set: <T>(key: string, value: T, callback?: () => void) => void;
}

class ChromeStorage implements StorageInterface {
	get<T>(key: string, defaultValue: T, callback: StorageCallback<T>) {
		if (window.chrome?.storage?.sync) {
			window.chrome.storage.sync.get(key, (items: Record<string, unknown>) => {
				const value = items[key];
				if (value !== undefined) {
					callback(value as T);
					return;
				}
				this.set(key, defaultValue, () => {
					callback(defaultValue);
				});
			});
		} else {
			callback(defaultValue);
		}
	}

	set<T>(key: string, value: T, callback: () => void = () => {}) {
		if (window.chrome?.storage?.sync) {
			// Need to do this to avoid issues when storing arrays wrapped in proxies
			const storageValue = Array.isArray(value) ? [...value] : value;
			window.chrome.storage.sync.set({ [key]: storageValue }, callback);
		} else {
			callback();
		}
	}
}

class LocalStorage implements StorageInterface {
	get<T>(key: string, defaultValue: T, callback: StorageCallback<T>) {
		try {
			const item = localStorage.getItem(key);
			callback(item ? JSON.parse(item) : defaultValue);
		} catch {
			callback(defaultValue);
		}
	}

	set<T>(key: string, value: T, callback?: () => void) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			if (callback) callback();
		} catch {
			if (callback) callback();
		}
	}
}

export const storage: StorageInterface = window.chrome?.storage?.sync
	? new ChromeStorage()
	: new LocalStorage();
