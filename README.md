# IMDb-Backend-Assignment

**This is the backend of the IMDB clone application**

**Key features:**

-> Get all movies: We can fetch all the movie details like name, year of release, actors acted and producer.

-> Add a new movie: Adding a new movie with actors and producer along with year of release, plot and poster.

-> Updating a movie: Update the details of an existing movie.  

-> If a new movie is created along with some existing actors and producers, then that movie comes under that actor's and producer's document. 

-> Similarly if a movie is updated and if an actor is added or removed, it updates the actor's details as well. Same for producer.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


-> Get all the actors and their details.

-> Add a new actor: Adding a new actor with name, movies, date of birth, bio and gender.

-> Updating an actor: Update the actors details.

-> If a new actor is added with the movies he has acted in, then those movies will be added to the movie table.

-> Similarly for updating an actor, the movies update accordingly.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


-> Get all the producers and their details.

-> Add a producer with with name, movies, date of birth, bio and gender.

-> Updating a producer will update the movie details according to the changes.

-> We can also add an producer and it also updates the movie table. 


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


 **Token based authentication:**

  -> I have used token based authentication to protect the routes.
  
  -> Any one can access the GET routes to fetch and see all the movies, actors and producer details.
  
  -> But only a authenticated use can make any changes/add any items to the list. So that any one who is not authorized doesn't make any unnecessary changes to our data.
  
  -> A new user can register with username, email and password.
  
  -> The password is stored in the form of hashed password for extra security.
  
  -> So once the user is logged in, they can change/create any data into our database. At the time of login they get a token with they can use for authentication and access the private routes.


  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  

 **Validations:**

  -> Every time a new user registers, they have to give an unique username which is not present in the database. 
  
  -> The email also has to be unique so that a single user cannot access the routes with different usernames.
  
  -> Everytime a new movie is created, it is mandatory to have all the fields including actors and producer.
  
  -> Everytime a new actor is creates, it is mandatory to add all the fields including movies and same is for a producer.



------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


**Relationships among entities**

-> I have established the relationships among actor, producer and movie. 

-> Actor: It has all the fields of an actor along with an array of movies which he has acted in which establishes the relationship between actor and movie.

-> Producer: It has all the fields of a producer along with an array of movies which he has produced which establishes the relationship between producer and movie.

-> Movie: It has all the fields of a movie along with an array of actors who have acted in the movie and a producer who has produced that movie. 


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


**Error Handling**

-> I have used constants to mark the possible error status: 400, 404, 401 and 403 based on the type of error that might occur.

-> That is mainly: NOT_FOUND, VALIDATION_ERROR, UNAUTHORIZED, FORBIDDEN.

-> I have handled errors in the code wherever possible so that there will not be any crash.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


**Node Modules used**

-> I have used the minimum number of node modules. Here are the list of them:

  -> "bcrypt": "^5.1.1", Used it for hashing password and validating the password.
  
  -> "dotenv": "^16.3.1", Used for .env files
  
  -> "express": "^4.18.2", Application framework
  
  -> "express-async-handler": "^1.2.0", Used for error handling
  
  -> "jsonwebtoken": "^9.0.2", Used to generate JWT and for token based authentication
  
  -> "mongoose": "^7.6.4", Used for mongodb 
