

This is a  project which used an express boilerplate.
This is a server built to manage bookmarks. 

GET // POST // AND DELETE Requests can be viewed via POSTMAN

Authorization TOKEN is required 

This application fulfills the following requirements :

-Configure logging and API key handling middleware on the server

-Write a route handler for the endpoint GET /bookmarks that returns a list of bookmarks

--Write a route handler for the endpoint GET /bookmarks/:id that returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid

-Write a route handler for POST /bookmarks that accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.

-Write a route handler for the endpoint DELETE /bookmarks/:id that deletes the bookmark with the given ID.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's main branch.# bookmarks-server
