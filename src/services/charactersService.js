import { API_BASE_URL } from '../config/constants';

/**
 * Obtiene personajes de la API de Rick and Morty.
 *
 * @param {Object}  opts
 * @param {number}  [opts.page=1]   Página a pedir (empieza en 1).
 * @param {string}  [opts.name='']  Texto de búsqueda por nombre (opcional).
 * @returns {Promise<{ results: Array, hasNextPage: boolean }>}
 */
export async function getCharacters({ page = 1, name = '' } = {}) {
  const params = new URLSearchParams();
  params.append('page', String(page));

  const trimmedName = name.trim();
  if (trimmedName) {
    params.append('name', trimmedName);
  }

  const url = `${API_BASE_URL}/character?${params.toString()}`;

  const response = await fetch(url);

  if (response.status === 404) {
    return { results: [], hasNextPage: false };
  }

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al obtener personajes`);
  }

  const data = await response.json();
  return {
    results: data.results,
    hasNextPage: data.info.next !== null,
  };
}
