interface ChromeStorage {
	sync: {
		set: (items: Record<string, unknown>, callback?: () => void) => void;
		get: (
			keys: string | string[] | Record<string, unknown> | null,
			callback: (items: Record<string, unknown>) => void
		) => void;
	};
}

declare global {
	interface Window {
		chrome?: {
			storage?: ChromeStorage;
		};
	}
}

export {};
