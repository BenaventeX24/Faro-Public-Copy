¿Que es ....?
añadir desc de que es el proyecto coso

## ---- GIT FLOW ----

`develop` es la rama principal, siempre hay que traer los cambios que se pushean en develop.

`master` es la rama que sale a produccion, solo se suben cosas cuando hacemos una release (se planean)

siempre hacer lo siguiente antes de empezar a trabajar:

`$ git checkout develop`

`$ git pull origin develop --rebase`

para crear otra rama hacemos esto, siempre parados en develop:

`$ git checkout -b my-feature`

## Subir archivos a GitHub

para añadir archivos hacemos:

`$ git add "nombre archivo"`

para hacer un commit:

`$ git commit -m "nombre de la feature a subir"`

para subir lo que acabamos de commitear:

`$ git push origin "nombre branch en la que estamos parados"`

Despues vamos a github y hacemos el pr de la branch que acabamos de crear a `develop` y asignamos como reviewers a todos los del equipo y esperamos a que alguien nos de el ok para mergear esa branch a `develop`

## Tecnologias

Front end `React` https://es.reactjs.org/docs/getting-started.html

Back end `Node.js` https://nodejs.org/es/docs/

## Libraries

-- Web --

`Create React App` https://create-react-app.dev/docs/getting-started

`React router` https://reactrouter.com/docs/en/v6/getting-started/tutorial