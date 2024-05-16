### How to run this application

### open terminal, and execute following commands in sequence:

- git clone --recurse-submodules https://github.com/aiswarya8110/mern-movie-listing-app.git
- cd mern-movie-listing-app
- git submodule update --remote --merge
- cd react-crud-backend
- npm install
- npm run dev

### open another terminal and execute following commands in sequence:

- cd react-crud-frontend
- npm install
- npm run dev


### rename .env/sample file to .env

- rename `react-crud-backend/.env.sample` file to `.env` and add all the environment variable values


Access the application on the displayed URL: [http://localhost:5173/](http://localhost:5173/)