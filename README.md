# Backend
Built on `nodeJS`, `expressJS`, `MongoDB`. <br>
Typescript version of the Node application is available at: [Callbreak-Backend-Node-Typescript](https://github.com/sudbasnet/Callbreak-Backend-Node-Typescript)

# Frontend
Built on `Angular` (9)

# Project
In this project, I'm trying to create an online multiplayer application for playing the game of "CALLBREAK". It is a card-game, played with a regular deck of 52 cards. The game should be played with 4 players, however, a modified version can be played with just 3 players.

As far as the project design is concerned, it will have the following parts or functionalities.

### Authentication 
*   Authentication is done with JSON Web Token (JWT)
*   User Actions:
    *   Registration (inc. user verification through email, reset password through email)
    *   Login
    *   Deactvation of account
    *   Deleting account permanently

### Communication among players (`socket.io`)
*   The in-game communication (moves made by the players) will also be done using `socket.io`
*   Chatting among the players.

### See game history or playbacks (Future)
* Authenticated players can view their past games.
* Players can also see their stats and games played by other players.

### The folder structure is as follows (only shows important files/folders):
**Old Architecture**

```
|-- [backend] (NodeJS, Express, MongoDB)
    |-- [models] (models corrresponding to MongoDB schema)
    |-- [routes] (contains the api paths)
    |-- .env (hidden from git)
    |-- server.js (main file)
    |-- package.json
|-- [frontend] (Angular 9)
    |-- [e2e]
    |-- [src]
        |-- [app]
            |-- [_helpers]
                |-- auth.guard.ts
                |-- error.interceptor.ts
                |-- jwt.interceptor.ts
            |-- [_models] (Objects that are received/sent during api calls)
            |-- [_services]
                |-- auth.service.ts
                |-- register-user.service.ts
            |-- [home]
            |-- [register]
            |-- [login]
            |-- [game]
            |-- app-routing.ts
            |-- app.module.ts
            |-- app.component.html
            |-- app.component.ts
        |-- environments
        |-- index.html
```

**New Architecture**(trying to base it on Clean Coding architecture by Bob Martin)
```
|-- [backend] (NodeJS, Express, MongoDB)
    |-- [user]
        |-- use-cases
            |-- (contains all modules that users have access to)
        |-- user.model.js (connects to mongoDB collection)
        |-- user.controller.js ( pulls all the use-cases in one place )
        |-- user.routes.js
    |-- [game]
        |-- use-cases
            |-- game-definition
                |-- (contains all the game definition such as create, join, start, delete)
            |-- game-specific
                |-- callbreak
                    |-- (contains all modules for callbreak specific logic)
        |-- game.model.js (connects to mongoDB collection)
        |-- game.controller.js (pulls all the use-cases in one place)
        |-- game.routes.js
    |-- [middlewares]
        |-- (all the middlewares/interactors. Only these middlewares can connect different components)
    |-- [entities]
        |-- (public entities/classes, such as Card, Deck, etc)
    |-- [_helpers]
        |-- (contains simple functions that are repeated inside the program, available to everyone)
    |-- .env (hidden from git, contains secret keys)
    |-- server.js (main file)
    |-- package.json
```
```
|-- [frontend] (Angular 9)
    |-- [e2e]
    |-- [src]
        |-- [app]
            |-- [_helpers]
                |-- auth.guard.ts
                |-- error.interceptor.ts
                |-- jwt.interceptor.ts
            |-- [_models] (Objects that are received/sent during api calls)
            |-- [_services]
                |-- auth.service.ts
                |-- register-user.service.ts
            |-- [home]
            |-- [register]
            |-- [login]
            |-- [game]
            |-- app-routing.ts
            |-- app.module.ts
            |-- app.component.html
            |-- app.component.ts
        |-- environments
        |-- index.html
```
