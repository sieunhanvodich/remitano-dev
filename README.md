# Funny Movies

## Installation

1. Create `.env` file in root of `server` folder and fill values for the following

   ```
   NODE_ENV=
   MONGO_URI=
   JWT_SECRET=
   GOOGLE_API_KEY=
   ```

2. Create `.env` file in root if `client` folder and fill value for the following

   ```
   REACT_APP_API_ENDPOINT=
   ```

3. Run following commands to install dependencies

   ```
   npm install
   cd client && npm install
   ```

4. Run the app

   ```
   cd server && npm run server
   cd client && npm run start
   ```

5. Test client app

   ```
   npm run test
   ```
