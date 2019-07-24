# Expe-logement
Project on housing to discover artificial intelligence.

## Front-End development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  


## Deploy on github pages

Run & push to github to deploy on github pages. We need to had a base href to this build. This is specific to gh-pages. (This version won't deploy properly on Google cloud).

```sh
ng build --prod --output-path ../docs --base-href /expe_logement/
```

## Deploy on Google App Engine

First check you access to the GCP project.

```sh
ng build --prod --output-path ../gc
gcloud app deploy app.yml
```
