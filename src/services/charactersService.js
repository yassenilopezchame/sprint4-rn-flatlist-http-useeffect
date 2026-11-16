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
  // 1) Construir la URL: base + ruta + query params.
  //    URLSearchParams se encarga de codificar (espacios, acentos, etc.).
  const params = new URLSearchParams();
  params.append('page', String(page));

  const trimmedName = name.trim();
  if (trimmedName) {
    params.append('name', trimmedName);
  }

  const url = `${API_BASE_URL}/character?${params.toString()}`;

  // 2) Petición HTTP. Si falla la RED, fetch lanza y NO lo capturamos aquí:
  //    dejamos que el error suba para que la pantalla lo maneje.
  const response = await fetch(url);

  // 3) Caso especial: búsqueda sin resultados → la API responde 404.
  //    NO es un error de la app: significa "lista vacía".
  if (response.status === 404) {
    return { results: [], hasNextPage: false };
  }

  // 4) Cualquier otra respuesta no exitosa (4xx/5xx) sí es error.
  if (!response.ok) {
    throw new Error(
      `Error HTTP ${response.status} al obtener personajes`
    );
  }

  // 5) Respuesta exitosa: extraer datos y deducir si hay página siguiente.
  const data = await response.json();
  return {
    results: data.results,
    hasNextPage: data.info.next !== null,
  };
}

export async function getCharacters({ page = 1, name = '' } = {}) {
  // TODO Paso 2: implementa la petición HTTP y devuelve el objeto del contrato.
  throw new Error('getCharacters todavía no está implementada (Paso 2)');
}
