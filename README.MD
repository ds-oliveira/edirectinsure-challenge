# EDirectinsure TODO List

## Why did I separate back-end from front-end in two applications?
- Different scalability for each application;
- Code decoupling;
- Individual deploys;
- Language-agnostic back-end.

## Password Security
- SHA256 before the internal API POST;
- SHA256 before the external API POST;
- SHA256 before the database persistence.

## Authentication
- API Key;
- Cors;
- User token.

## Technologies:
- Docker;
- Docker Compose;
- Node.js;
- PM2;
- Express;
- React;
- Next.js.

## URLs:
- Front-end: http://localhost
- Back-end: http://localhost:3000
- Back-end (Swagger): http://localhost:3000/api-docs

## TO DO:
- Implement validations (front-end and back-end);
- Implement actions feedbacks (error messages/success messages);
- Data cleaning (trim, remove white-spaces, etc);
- Implement different endpoints do update specific paths of the main entity;
- Use PATCH instead of PUT;
- Improve the swagger documentation;
- Code refactoring;
- Implement unitary, integration, and end-to-end tests;
- Improve all the front-end side since it was my first front-end project with React and Next.js.

## How to run:
At the project's root folder execute the following command:
```
docker-compose up --renew-anon-volumes --force-recreate --build
```

NOTE: Every part of the dashboard is bound to an asynchronous persistence event, so you don't need to care about save your work.