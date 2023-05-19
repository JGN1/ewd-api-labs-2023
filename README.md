# ewd-api-labs-2023
 Detected Node.js 16.20.0

 # Assignment 2 - Web API.

Name: [Your Name]

## Features.

[A bullet-point list of the ADDITIONAL features/endpoints you have implemented in the API **THAT WERE NOT IN THE LABS** ]. 

 + Feature 1 - Review Endpoint 

 + Feature 2 - Actor Endpoint

 + Feature 3 - ......

   e.g.

 + Get Similar Movies:  Get a list of similar movies using a movie ID. 

## Installation Requirements

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