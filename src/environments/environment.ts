// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBx2yRimYMDZabHtCKmwNw5WGwEzFIphvY',
    authDomain: 'judge-me-d068e.firebaseapp.com',
    databaseURL: 'https://judge-me-d068e.firebaseio.com',
    projectId: 'judge-me-d068e',
    storageBucket: 'judge-me-d068e.appspot.com',
    messagingSenderId: '1078711129140'
  }
};
