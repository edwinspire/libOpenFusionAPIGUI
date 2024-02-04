export class SessionStorageManager extends EventTarget {
	constructor() {
		super();
	}

	// Método para guardar un elemento en SessionStorage
	save(key, value) {
		const jsonValue = JSON.stringify(value);
		sessionStorage.setItem(key, jsonValue);
		this.dispatchEvent(new CustomEvent('change', { detail: { key, value } }));
	}

	// Método para obtener un elemento de SessionStorage
	get(key) {
		const jsonValue = sessionStorage.getItem(key);
		return jsonValue ? JSON.parse(jsonValue) : null;
	}

	// Método para eliminar un elemento de SessionStorage
	remove(key) {
		sessionStorage.removeItem(key);
		this.dispatchEvent(new CustomEvent('change', { detail: { key, value: null } }));
	}

	clear(key) {
		sessionStorage.clear(key);
		this.dispatchEvent(new CustomEvent('clear', { detail: {} }));
	}
}


export class LocalStorageManager extends EventTarget {
	constructor() {
		super();
	}

	// Método para guardar un elemento en localStorage
	save(key, value) {
		const jsonValue = JSON.stringify(value);
		localStorage.setItem(key, jsonValue);
		this.dispatchEvent(new CustomEvent('change', { detail: { key, value } }));
	}

	// Método para obtener un elemento de localStorage
	get(key) {
		const jsonValue = localStorage.getItem(key);
		return jsonValue ? JSON.parse(jsonValue) : null;
	}

	// Método para eliminar un elemento de localStorage
	remove(key) {
		localStorage.removeItem(key);
		this.dispatchEvent(new CustomEvent('change', { detail: { key, value: null } }));
	}

	clear(key) {
		localStorage.clear(key);
		this.dispatchEvent(new CustomEvent('clear', { detail: {} }));
	}
}
