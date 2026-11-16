# Preguntas de reflexión

_Escribe tus respuestas debajo de cada pregunta._

**Alumno:**
Yasseni de Jesús López Chamé
---

## Paso 1 · Explorando la API

| Pregunta | Mi respuesta |
|---|---|
| ¿Cuántos personajes trae cada página? | 20 personajes |
| ¿Qué campo me dice si existe una página siguiente? | info.next |
| ¿Qué valor tiene ese campo en la última página? | null |
| ¿Qué código HTTP devuelve una búsqueda sin resultados? | "error": "There is nothing here"|
| ¿Qué campos del personaje usa `CharacterCard`? | id, name, image, status y species (campos habituales para mostrar una tarjeta) |

## Paso 2 · Petición HTTP

**¿Qué diferencia hay entre que `fetch` "falle" y que el servidor responda con un error? ¿Qué debo revisar en la respuesta?**
> `fetch` solo rechaza su promesa cuando **no hubo respuesta**: fallo de red, DNS, timeout, CORS, modo avión. Si el servidor respondió (aunque sea con 4xx o 5xx), la promesa se **resuelve** normalmente y el error está "escondido" en la respuesta. Por eso, después de `await fetch`, debo revisar `response.ok` (que es `true` para 200–299) o `response.status` para decidir si es un error HTTP y lanzar mi propio `Error`. En esta práctica, además, el 404 por búsqueda sin resultados se trata como caso válido ("lista vacía"), no como error.

## Paso 3 · Estado

**¿Por qué guardo los personajes en estado y no en una variable normal?**
> Porque React solo vuelve a renderizar cuando cambia un **estado** (o una prop). Si guardara los personajes en una variable normal (`let characters = ...`), la asignación se perdería en el siguiente render y la UI nunca se actualizaría. `useState` conserva el valor entre renders y, al llamar al setter, React sabe que debe redibujar el componente con los nuevos datos.

## Paso 4 · useEffect

1. **¿Qué pasa si omito por completo el arreglo de dependencias?**
> El efecto se ejecuta **después de cada render** (incluido el primer montaje). Si dentro del efecto llamo a un setter de estado, provoco un nuevo render → nuevo efecto → bucle infinito de peticiones y renders.

2. **¿Qué significa dejar el arreglo vacío?**
> Que el efecto se ejecuta **una sola vez al montar** el componente (y su limpieza al desmontarlo). Es lo que quería para la carga inicial: pedir la primera página solo cuando la pantalla aparece.

3. **¿Por qué la función que recibe `useEffect` no debe ser `async` directamente?**
> Porque `useEffect` espera que la función devuelva **una función de limpieza** (o `undefined`). Una función `async` siempre devuelve una **Promise**, y React no sabría qué hacer con ella (no puede usarla como cleanup y avisa con advertencia). La solución es declarar dentro una función `async` (`load()`) y llamarla, o usar una IIFE `(async () => { ... })()`, devolviendo la limpieza de forma síncrona.

## Paso 5 · FlatList

1. **¿Para qué sirve la prop que extrae la llave de cada elemento?**
> `keyExtractor` devuelve un identificador **único y estable** por elemento. React lo usa para reconciliar la lista: saber qué filas se mantienen, cuáles se agregan o eliminan, y evitar re-renderizados innecesarios. Sin él (o con llaves duplicadas) aparece la advertencia de *keys* y puede haber comportamientos raros al paginar o filtrar. Debe devolver un **string**.

2. **¿Por qué usar `FlatList` en lugar de un `ScrollView` con `.map()`?**
> `ScrollView` renderiza **todos** los hijos a la vez, aunque no se vean; con muchos elementos consume mucha memoria y va lento. `FlatList` es **virtualizada**: solo monta las filas visibles (y un pequeño margen), recicla las que salen de pantalla y ofrece props listas para paginación (`onEndReached`), pull to refresh (`refreshing`/`onRefresh`), separadores y lista vacía. Es la opción correcta para listas largas o potencialmente infinitas.

## Paso 6 · Carga y error

**¿Por qué es mejor mostrar un mensaje con un botón "Reintentar" que dejar la pantalla vacía?**

> 

## Paso 8 · Paginación

**¿Qué problema aparece si la función de "cargar más" se dispara varias veces seguidas? ¿Cómo lo evité?**

> 

## Paso 9 · Pull to refresh

**¿Por qué usé un estado distinto (`refreshing`) y no el mismo de la carga inicial?**

> 

## Paso 10 · Búsqueda

1. **¿Qué es el debounce y qué problema resuelve?**

> 

2. **¿Para qué sirve la función de limpieza (cleanup) que se devuelve en un `useEffect`? Da un ejemplo de esta práctica.**

> 

3. **Si el usuario escribe rápido y las respuestas llegan en desorden, ¿qué podría salir mal?**

> 

## Cierre

**Menciona dos mejoras que le harías a la app si tuvieras una hora más:**

> 
