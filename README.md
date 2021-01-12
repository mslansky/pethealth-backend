## Pet Health Server
This project was created as my first full stack application.

Backend Server Created for: Pet Health Application

This was my first capstone project for the THINKFUL engineering immersion bootcamp. 

Link to Live Application: pet-health-app.mslansky.vercel.app

## Application 
Endpoints:  

/api/profiles/ - This main route endpoint GETS all profiles and POSTS a new profile CREATED

/api/profiles/:profilesid - This endpoint DELETES one specific pet profile

/api/diaries/:diaryid - This endpoint allows for CREATING one specific diary entry, UPDATING one diary, and DELETING diary

/api/diaries/pet/:petname - This endpoint allows for GETTING ALL diaries for one specific pet to generate a report

* Authorization TOKEN is required 

Testing is implemented for all endpoints

For App:

- Morgan (real-time notifications of requests in the terminal)

- Cors (prevents CORS errors with simple requests)

- Helmet (protects sensitive header information)

- Knex (sql query builder package)

- PG (PostgreSQL client for node.js)

- Postgrator CLI (cmd line SQL database migration tool)

For Development:

- NodeMon (dev server that auto-refreshes when changes are made)

- Mocha (a testing structure package)

- Chai (assertion functions package)

- Supertest (package used to test HTTP calls)


## Tech
Tech Stack: Nodejs, Mocha, Chai

Middleware: Morgan, CORS, Helmet, *Bearer Token*

Heroku: https://git.heroku.com/pethealthproject.git

Github: https://github.com/mslansky/pethealth-backend



## Users (Front End)
You can create a PET PROFILE for each of your pets! Within these profiles you can create daily diary entries.
- these entries will allow for you to document your pets health! 
- you will be able to create, update, and delete diary entries
- you will also be able to print a CUMULATIVE report of all of your pet's diary entries to give to your vet, or keep for your records!
(Email capability coming soon!)