# ewd-api-labs-2023
 Detected Node.js v20.0.0

 # Assignment 2 - Web API.

__Name:__ Joe Nunan\
__Date:__ 20 May 2023

---------------------------------------------------------------------
## Features.
---------------------------------------------------------------------
The following is a list of the features developed in the application as part of this assignment.

 + Review Endpoint 
 + Actor Endpoint
 + Actor Review Endpoint
 + Logging with Winston Logger
 + Setup dev & stage environments for React Movies app
 + Added new features to React app to interact with API
 + Hooked movie review screen to Review endpoint to allow adding reviews
 + Altered 'Review' drawer in Movie details page to retrieve and display reviews with API
 + Altered 'Review' drawer in Movie details page to display different items dependign on whether user logged in (accounts API) and whether review existed or not 
 + Integrated authentication for React with Accounts endpoint of the API
 + Built out Postman tests for new endpoints and added to Newman
 + Set up Swagger API documentation

 
 + add more, add more, add more

   e.g.

 + Get Similar Movies:  Get a list of similar movies using a movie ID. 
<br/>
<br/>

---------------------------------------------------------------------
## Installation Requirements
---------------------------------------------------------------------

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
<br/>
<br/>

---------------------------------------------------------------------
## API Configuration
---------------------------------------------------------------------
Before using the API, a number of configurations need to be made. The first area for configurations is in the .env file. This is not in the GIT repository and therefore needs to be added if spinning up locally. For the TMDB_KEY you must use your own TMDB API key. This can be obtained by going to https://www.themoviedb.org/ and signing up for a free account. For the JWT_SECRET_KEY you can select your own value. You need to keep both these values secure to ensure the security of your application.\
<br/>
The following is a screenshot of my .env file (with TMDB_KEY and JWT_SECRET_KEY replaced values replaced).

![][image1]

In the .env file, the DATABASE_URL value can be used to point the API to a different MongoDB (currently pointing to localhost version). The DATABASE_DIALECT shown above determines which dependencies are built for the API. You can see in the following screenshot what dependencies are built when the DATABASE_DIALECT is 'mongo'.

![][image2]

To connect to the API from the React frontend it will be necessary to use port forwarding for certain paths. This is explained down further in section on connection to React Movie App.

I also tried to connect my Swagger API for this project to my API. I tried this in two different ways, firstly by using localhost URL, and secondly by using URL of my vercel deployment of this API. In both cases I ran into CORS issues. I installed the CORS package from NPM but ran out of time to finish implementing fully. 
<br/>
<br/>

---------------------------------------------------------------------
## API Design
---------------------------------------------------------------------

For the API design of my project I focused on three main functionaility endpoints.
+ Reviews - Endpoints for user Movie Reviews
+ Actors - Endpoints for Actor Information
+ User Reviews of Actors - Endpoint for Actor Review Information

These contain 10 endpoint URLs, utilising 15 various GET, POST, PUT and DELETE method invocations. In addition I utilised the accounts endpoint, built out as part of the labs, for authorisation and route protection in my React Application.

To better document the endpoints I developed for this assignment I used the Swagger API builder. 
My Swagger API Documentation is available at the following link:
+ https://app.swaggerhub.com/apis/JGN1/MSC_DevWeb_API/1.0.0#/

![][image3]

The following screenshots show the API endpoints in Swagger along with a brief description of what each one does.

![][image4]
![][image5]

As I had intended trying to hook Swagger up with my API, I built out all the relevant schemas for both requests and responses. These are detailed in this screenschot.

![][image6]
<br/>
<br/>

---------------------------------------------------------------------
## Security and Authentication
---------------------------------------------------------------------
[Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected. **REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB]**

[Give details of the routes that have authentication. ]

<br/>
<br/>

---------------------------------------------------------------------
## Validation
---------------------------------------------------------------------
I added validation using JOI for both the reviews and actor reviews. The actors endpoint did not need as I am only performing GET operations.\
<br/>
For this I created two validator schemas - actors/validators/index.js and reviews/validators/index.js

![][image7]

After I had created the validation schema, I added validation to all POST and PUT routes. This can be seen in the screenshot below which shows routes for both actors and reviews.

![][image8]


[Briefly describe and extra data validation you added to the API, and where it is implemented in the App.]

<br/>
<br/>

---------------------------------------------------------------------
## Testing
---------------------------------------------------------------------

ALL NEWMAN TESTS ADDED - HAD to add create user account and authenticate to start of each collection so I could get bearer token for protected route tests.

Briefly state how you tested the API. 

Give an example of any automated testing results or link to a report. 

![](./images/tests-image.png)

<br/>
<br/>

---------------------------------------------------------------------
## Integrating with React App
---------------------------------------------------------------------

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

<br/>
<br/>

---------------------------------------------------------------------
## Extra features
---------------------------------------------------------------------

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

If you deployed to a hosting service/cloud, you should specify here. 


WINSTON LOgging - 5 file rotation - app and error
Try/Catch on items feeding out to Logger

Try/Catch on items feeding out to Logger
<br/>
<br/>

---------------------------------------------------------------------
## Independent learning.
---------------------------------------------------------------------

+ ++ file copy, environments for REACT STAGE DEV, import.meta.env.____

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  

---------------------------------------------------------------------
## Security and Authentication
## Testing
ADDED TRY/CATCH to Accounts endpoint also to prevent app crashing on error


[image1]: readme_images/01_API_.env_contents.png
[image2]: readme_images/02_API_dependencies.js.png
[image3]: readme_images/03_Swagger_API_Doc.png
[image4]: readme_images/04_Swagger_Review_Actor_Endpts.png
[image5]: readme_images/05_Swagger_ActorReview_Endpt.png
[image6]: readme_images/06_Swagger_Endpt_Schemas.png
[image7]: readme_images/07_ValidationSchema_JOI.png
[image8]: readme_images/08_Validation_Routes.png

