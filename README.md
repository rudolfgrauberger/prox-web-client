# PTB Web Client
This web application acts as a frontend to the "Projekt- und Themenbörse (PTB)" of the TH Köln.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Installation
```
docker build -t ptb.archi-lab.io/web-client .
```
Builds a Docker image based on the source code and the dependencies in the `package.json` and `package-lock.json`.

## Usage
```
docker-compose -f docker-compose-web-client.yml up
```
Starts a Docker container based on the compose file and the image. A Docker network named `ptb` is required for the communication between services:
```
docker network create ptb
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Documentation
You can view the full documentation under the following [GitHub Wiki](https://github.com/Archi-Lab/ptb-documentation/wiki).

## Contributing

## About the Team
This service is currently developed by the PTB Team composed of students from [TH Köln](https://www.th-koeln.de/):

- Julian Lengelsen ([@jlengelsen](https://github.com/jlengelsen))
- Mansoor Rahmati ([@ManSoorSour](https://github.com/ManSoorSour))
- Jan Seidler ([@janseidler](https://github.com/janseidler))
