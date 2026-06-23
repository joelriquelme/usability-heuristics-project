
# Juego de Heurísticas de Usabilidad

Este proyecto es un juego interactivo diseñado para apoyar el aprendizaje de las heurísticas de usabilidad, en el contexto del curso CC4101 Ingeniería de Software de la Universidad de Chile.

## Prerrequisitos

Antes de comenzar, necesitarás tener Node.js y npm (Node Package Manager) instalados en tu máquina. Si no los tienes, puedes descargarlos e instalarlos desde el sitio web oficial:

[https://nodejs.org/](https://nodejs.org/)

La instalación de Node.js también instalará npm.

## Instalación

1.  Clona el repositorio o descarga el código fuente en tu máquina.
2.  Abre una terminal o línea de comandos y navega hasta el directorio raíz del proyecto (`usability-heuristics-game`).
3.  Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

    ```bash
    npm install
    ```

## Ejecución del Proyecto

Una vez que la instalación se haya completado, puedes iniciar el servidor de desarrollo local con el siguiente comando:

```bash
npm run dev
```

Este comando iniciará un servidor de desarrollo y abrirá el juego en tu navegador web predeterminado. Si no se abre automáticamente, puedes acceder a él en la URL que se muestra en la terminal (generalmente `http://localhost:5173`).

## Scripts Disponibles

En el archivo `package.json`, puedes encontrar otros scripts útiles:

*   `npm run build`: Compila el proyecto para producción. Los archivos resultantes se guardarán en el directorio `dist`.
*   `npm run lint`: Ejecuta el linter para analizar el código en busca de errores y problemas de estilo.
*   `npm run preview`: Inicia un servidor local para previsualizar la compilación de producción.

