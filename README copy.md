# ewd-api-labs-2023
 Detected Node.js v20.0.0

 # Assignment 2 - Web API.

Name: Joe Nunan\
Date: 20 May 2023

## Features.

[A bullet-point list of the ADDITIONAL features/endpoints you have implemented in the API **THAT WERE NOT IN THE LABS** ]. 

 + Review Endpoint 

 + Actor Endpoint

 + Actor Review Endpoint

 + Logging with Winston 

 + Setup dev & stage environments for React Movies app

 + Added new features to React app to interact with API

 + Integrated authentication for React with API

 + Built out Postman tests for new endpoints and added to Newman

 + Set up Swagger API documentation

 + add more, add more, add more

   e.g.

 + Get Similar Movies:  Get a list of similar movies using a movie ID. 

## Installation Requirements


My API is setup on GitHub Codespace. 
The codespace is accessible at the following URL:
```cmd
https://jgn1-urban-engine-777p6q746q4249x.github.dev/
```
To clone locally use the following command:
```cmd
git clone https://github.com/JGN1/ewd-api-labs-2023.git
```
### Installation
Install the required packages using the following commands
```cmd
npm install --save-dev babel-cli
npm install --save-dev babel-preset-env
npm install --save-dev nodemon
npm install dotenv --save
npm install --save-dev eslint babel-eslint
npx eslint --init
npm install --save express
npm install --save uniqid
npm install -save axios
npm install -save mongoose
npm install -save joi
npm install --save jsonwebtoken bcryptjs
npm install --save-dev newman
npm install --save-dev newman-reporter-htmlextra
```
The above packages were all added as part of the lab exercises. In addition to the packages shown above, I installed the following for assignment enhancements.
```cmd
npm install --save winston
npm install --save winston-daily-rotate-file
npm install cors
```
Additional installs were necessary in my React Movies App. These are described further down in this file.



==========================================================================================================================================================
[Describe how to run the API. If you used a DevContainer/Codespace , you can refer to the relevant files in your repo.]

[Describe getting/installing the software, perhaps:]

```cmd
git clone http:\myrepo.git
```

followed by installation

```bat
npm install
```



## API Configuration

[Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.]
[**REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB,** just placeholders as indicated below:]

```bat
NODE_ENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
```


## API Design
[Give an overview of your web API design, perhaps similar to the following: ]

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| ... | ... | ... | ... | ...

[If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).]
https://app.swaggerhub.com/apis-docs/fxwalsh/userAPI/initial

=========================EDIT=============================

Here is my Swagger API Documentation
https://app.swaggerhub.com/apis/JGN1/MSC_DevWeb_API/1.0.0#/
The API is broken into 3 broad sections... 
+ Reviews - Endpoints for user Movie Reviews
+ Actors - Endpoints for Actor Information
+ User Reviews on Actors - Endpoint for Actor Review Information

These contain 10 endpoints utilising 15 various GET. POST, PUT and DELETE method invocations.

=========================EDIT=============================



## Security and Authentication
[Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected. **REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB]**

[Give details of the routes that have authentication. ]



## Validation

[Briefly describe and extra data validation you added to the API, and where it is implemented in the App.]



## Testing

Briefly state how you tested the API. 

Give an example of any automated testing results or link to a report. 

![](./images/tests-image.png)

## Integrating with React App

[Describe how you integrated your React app with the API. You can provide a link to the React App repo and give an example of an API call from React App. For example: ]

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((res) => res.json());
};

~~~

[You can also add images of React app here also if you wish. This can be also shown in the video]

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

If you deployed to a hosting service/cloud, you should specify here. 

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  