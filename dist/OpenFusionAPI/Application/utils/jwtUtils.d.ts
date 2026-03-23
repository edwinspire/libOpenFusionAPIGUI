/**
 * Decodifica el payload de un JWT (sin verificar firma) y calcula
 * cuántos minutos faltan para que expire.
 *
 * @param {string} token
 * @returns {number} Minutos restantes hasta expiración (negativo si ya expiró)
 */
export function getJwtExpiresInMinutes(token: string): number;
/**
 * Retorna true si el token está a `thresholdMinutes` minutos o menos de expirar.
 *
 * @param {string} token
 * @param {number} thresholdMinutes - Default: 5 minutos
 * @returns {boolean}
 */
export function isJwtExpiringSoon(token: string, thresholdMinutes?: number): boolean;
