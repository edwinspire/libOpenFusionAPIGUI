/**
 * Decodifica el payload de un JWT (sin verificar firma) y calcula
 * cuántos minutos faltan para que expire.
 *
 * @param {string} token
 * @returns {number} Minutos restantes hasta expiración (negativo si ya expiró)
 */
export function getJwtExpiresInMinutes(token) {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) return -1;

		const payload = JSON.parse(atob(parts[1]));
		if (!payload.exp) return Infinity; // Sin campo exp: no expira

		const nowSeconds = Date.now() / 1000;
		return (payload.exp - nowSeconds) / 60;
	} catch {
		return -1;
	}
}

/**
 * Retorna true si el token está a `thresholdMinutes` minutos o menos de expirar.
 *
 * @param {string} token
 * @param {number} thresholdMinutes - Default: 5 minutos
 * @returns {boolean}
 */
export function isJwtExpiringSoon(token, thresholdMinutes = 5) {
	const minutesLeft = getJwtExpiresInMinutes(token);
	return minutesLeft >= 0 && minutesLeft <= thresholdMinutes;
}
