#### Installing Third-Party Packages with npm 10/24
To install a third-party package with npm, you can specify whether the package is needed for production or development:

For Production
Use the --save flag to install the package and add it to the dependencies in your package.json file. These packages are necessary for the app to run in production.

npm install [package-name] --save

For Development
Use the --save-dev flag to install the package and add it to the devDependencies in your package.json. These packages are only needed during development (e.g., testing, linting, or building).

npm install [package-name] --save-dev