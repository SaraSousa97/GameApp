# GameHorizon

**GameHorizon** is a web application designed to help users choose and manage free games. The app allows users to manage their game library, including adding games to personal lists, removing games, and tracking progress across different categories such as "Play Later," "Currently Playing," "Played," and "Completed." 

## Features:
- **User Profile**: 
  - Display the user's avatar and name in all pages.
  - Allow users to edit their profile data.
  - Users can update or remove their profile picture URL.
  - If no profile picture is provided, the app will display the user's initials over a colored background.

- **Game List**:
  - The homepage shows all available games.
  - Users can search for games by title.
  - Clicking on a game opens its details page, including information like genre, platform, and system requirements.

- **User Lists**:
  - Each user has four customizable lists: **"Play Later," "Currently Playing," "Played,"** and **"Completed."**
  - Users can add or remove games from these lists.
  - On the game detail page, users can see if a game is already in one of their lists and move the game between lists.

- **Notifications**:
  - Feedback notifications are shown to the user for every action, such as successfully adding/removing a game, or errors that may occur.

- **Layout**:
  - The app has a dynamic and intuitive layout.
  - Styling is done using **[Angular Material](https://material.angular.io/)**.
  - Custom identity visual suggestions are applied in the UI design.

## API:
The app uses a **mock JSON API** powered by [json-server](https://github.com/typicode/json-server). This API handles user profile management, game search, and game list management. The API allows you to filter data and update user lists. You can set up the backend with the provided `db.json` file and the following instructions.

### API Setup:
1. Install **json-server** globally if you haven't already:
   ```bash
   npm install -g json-server
   ```

2. Place your `db.json` file (which contains the structure and test data for users and games) in the root of the project.

3. Run the JSON server:
   ```bash
   json-server --watch db.json --port 3000
   ```

4. The API will be available at `http://localhost:3000/`.

### Available Endpoints:
- **GET /profile**: Fetches the user's profile data.
- **GET /games**: Fetches a list of games.
- **GET /games/:id**: Fetches details of a specific game by ID.
- **PUT /profile**: Updates the user's profile data.
- **POST /profile/lists**: Add a game to one of the user's lists.
- **DELETE /profile/lists**: Remove a game from one of the user's lists.

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI, use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

### Notes:
- The user profile includes a **name**, **email**, **avatar** (image URL), and **lists** (personalized game lists).
- For each game in a user's list, the **game's ID** and **name** are stored.
- The `GameApp` design follows the business logic for managing personalized lists of games and ensuring the user has full control over them, as described in the requirements.

---

With these updates, your `README.md` now reflects the additional functionality of the GameApp, and provides detailed information about the setup and the new features added to the app.