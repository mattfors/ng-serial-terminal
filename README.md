# Ng Serial Terminal
[![CI](https://github.com/mattfors/ng-serial-terminal/actions/workflows/main.yml/badge.svg)](https://github.com/mattfors/ng-serial-terminal/actions/workflows/main.yml)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)

Web based serial terminal using Serial Web API, Angular and RxJS.

For a working demo: 

https://mattfors.github.io/ng-serial-terminal/


![Showcase](src/assets/showcase.gif)

For an Arduino Sketch for testing:

https://github.com/mattfors/demo-serial-device

If you do not have a serial device you can test the terminal with a mocked version of the above sketch. Sent ``?`` for a list of commands:

https://mattfors.github.io/ng-serial-terminal/mock


## Checking out the project and serving locally

To check out the project and serve it locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/mattfors/ng-serial-terminal.git
    cd ng-serial-terminal
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Serve the application:
    ```sh
    ng serve
    ```

4. Open your browser and navigate to `http://localhost:4200/`.
