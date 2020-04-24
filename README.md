# Backend
Built on `nodeJS`, `expressJS`, `MongoDB`.

# Frontend
Built on `Angular` (9)

# Project
In this project, I'm trying to create an online multiplayer application for playing the game of "CALLBREAK". It is a card-game, played with a regular deck of 52 cards. The game should be played with 4 players, however, a modified version can be played with just 3 players.

As far as the project design is concerned, it will have the following parts or functionalities.

### Authentication 
*   Player Registration 
*   Player Login and verification
*   Authorization using JSON Web Token

### Communication among players
*   Chatting with `socket.io`
*   The in-game communication (moves made by the players) will also be done using `socket.io`

### See game history or playbacks
* Authenticated players can view their past games.
* Players can also see their stats and games played by other players.

### The folder structure is as follows (only shows important files/folders):

```
|-- [backend] (NodeJS, Express, MongoDB)
    |-- [models] (models corrresponding to MongoDB schema)
    |-- [routes] (contains the api paths)
    |-- .env (hidden from git)
    |-- app.js (main file)
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