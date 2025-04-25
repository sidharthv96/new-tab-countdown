type StorageCallback<T> = (items: T) => void;

interface StorageInterface {
	get: <T>(key: string, defaultValue: T, callback: StorageCallback<T>) => void;
	set: <T>(key: string, value: T, callback?: () => void) => void;
}

class ChromeStorage implements StorageInterface {
	get<T>(key: string, defaultValue: T, callback: StorageCallback<T>) {
		if (window.chrome?.storage?.sync) {
			window.chrome.storage.sync.get({ [key]: defaultValue }, (items: Record<string, unknown>) => {
				callback(items[key] as T);
			});
		} else {
			callback(defaultValue);
		}
	}

	set<T>(key: string, value: T, callback?: () => void) {
		if (window.chrome?.storage?.sync) {
			window.chrome.storage.sync.set({ [key]: value }, callback);
		} else {
			if (callback) callback();
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
