# Getting Started with NPVCalculator

This project contains both a .NET backend (`NPVCalculator.sln`) and a React frontend (`WebUI/npv-calculator-ui`).

## Running the Solution

### 1. Run the Backend (.NET)

1. Open a terminal in the root directory of the repository.
2. Build and run the solution:

   ```sh
   dotnet build NPVCalculator.sln
   dotnet run --project .\API\API.csproj
   ```


### 2. Run the Frontend (React)

1. Open a terminal in `WebUI/npv-calculator-ui`.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000). The frontend app expects backend to run at [http://localhost:5075](http://localhost:5075) if this is not the case on your machine set API_BASE_URL accordingly in src/services/npvService.js.

## Available Scripts (Frontend)

In the `WebUI/npv-calculator-ui` directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

