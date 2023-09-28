# tasking-frontend
Single page application developed with Vite.js and React.js, featuring a routing system using React Router Dom V6. It consumes the  [tasking-backend](https://github.com/diegonacimiento/tasking-backend) API.

This project works in conjunction with the tasking API. To achieve full functionality, you must run the API project first.

[Documentación en español](README-es.md)

## Project Cloning
First, you need to clone the project into the directory of your choice:

```git clone https://github.com/diegonacimiento/tasking-frontend.git```

## Dependency Installation
``` npm install ```

## Environment Variables:
You must create a ".env" file in the root directory and define the following variable:
```
VITE_URL="http://localhost:3000"
```

## Start tasking-backend
First, you should run [tasking-backend](https://github.com/diegonacimiento/tasking-backend)

Once the project is up and running, continue...

## Start tasking-frontend
```npm run dev```