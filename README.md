# AccountOwnerNgMaterialClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deployment to IIS

When deploying to IIS ensure the following
## set the base href in index.html to:-

<base href="./">

## this will make sure the base ref is relative to where your website lives in IIS

## You also need to use hash location strategy otherwise, IIS will intercept your ng router URL changes and try to find a       controller/action for the URL

RouterModule.forRoot(routerConfig, { useHash: true })

## Alternatively
================

## In app.module.ts, add the below
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

## in NgMoudle under providers, add
providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]

## Lastly do
ng build --prod




