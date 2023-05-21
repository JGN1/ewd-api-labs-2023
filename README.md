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

For security and authentication there are two elements that need to be examined:
+ Security and authentication for react Movie App
+ Security and authentication for API
<br/>
<br/>

__Security and authentication for react Movie App__

For the react application I already had authentication in place using SUPABASE user authentication. For this assignment I set up a stage environment which uses the API Accounts endpoint for authentication. Specific details of how this was implemented are included in the [Integrating with React App](#integrating-with-react-app) section of this report. 

After making these changes, protected routes, such as opening an actors details page became unavailable unless logged in - essentially my API authentication took the place of the SUPABASE authentication for the React Movie App protected routes. These protected routes are as follows...
~~~JavaScript
  <MoviesContextProvider>
    <Routes>
      {/* Items within the AuthRoute route element require authentication to access  */}
      <Route element={<AuthRoute />}>
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/watchlist" element={<WatchlistMoviesPage />} />
        <Route path="/actors/profile/:id" element={<ActorDetailsPage />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
      </Route>
~~~
<br/>
<br/>

__Security and authentication for API__

For the API security and authentication, I sent request to my API to authenticate the user using the following function in `ewd-api-jn-2023`...
~~~JavaScript
  export const login = (email, password) => {
    return fetch('/api/accounts/security/token', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password })
    }).then(res => res.json())
  };
~~~

And then set the Authorization header in `contexts/authProvider` using the following code...
~~~JavaScript
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (email, password) => {
    const result = await login(email, password);
    if (result.token != undefined) {
      setToken(result.token)
      setAuth(true);
      setEmail(email);
      setUser(email);
    }
  };
~~~

I then utilised the authorization header in my fetch request as follows for protected route calls... 
~~~JavaScript
export const getApiMovieReviews = (movieId) => {
    return fetch(
        `/api/reviews/${movieId}/movie`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then((res) => res.json());
};
~~~
The following screenshot from my Chrome DevTool shows the JWT Bearer_token in Local Storage

![][image20]

This bearer token is passed to my API via the Authorization Header and used to verify the user is authorised to make teh call they are attempting to invoke.

I have built out logic in the react review drawer to illustrate changing information displayed based on whether individual logged in or not. 

This can be seen under the [Integrating with React App](#integrating-with-react-app) section of this report. 
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
For testing my API, I built out tests for the following endpoints in Postman.

+ Accounts
+ Actors - which covers Actors and Actor Reviews
+ Reviews
+ Full Regression - covers above plus Movies endpoint

The following screenshot shows those collections in Postman, along with the contents and run order for the *MSC WebDev API - Full Regression* collection.

![][image9]

Once I had built out the collections in Postman, I imported them into my project so I could run with Newman. Each test suite produces a separate html report. All reports are available under `tests>reports` folder. For each collection I included the `Account - Create New Account` and `Account - Authenticate Account Data` tests so I could retrieve a bearer token to use with protected calls later in the test.

![][image10]

I updated the package.json file with test details allowing me to run them individually or to run the regression test which includes all tests. 

![][image11]

In total there are 19 tests with 47 assertions. The full regression test takes about 1.5 seconds to run, as can be seen in screenshot of report below.

![][image12]

<br/>
<br/>

---------------------------------------------------------------------
## Integrating with React App
---------------------------------------------------------------------

For this assignment, I integrated my API with my React Movies App in the following areas:
+ Authentication
  - For login to the application so users can access protected routes within the React Movie application
  - For authentication of API calls to protected endpoint URLs using JWT Bearer Token
+ Movie Reviews
  - Allow a user to submit a review, which is subsequently stored in MongoDB table
  - Retrieve a users review for a particular movie from MongoDB and display in the application
  - If user is not logged in, inform them in Review drawer and provide link to login
  - If user is logged in but no user reviews for movie in question exist, provide link to review form, passing movie information in state so Review form page displays correct movie images

The React application I created for Assignment 1, already had authentication using Supabase, and is deployed to Vercel. As such I wanted to preserve the application with this configuration. To achieve this I set up two environments for my React Movie Application:
+ Dev environment - configured as per original Assignment 1 setup with Supabase authentication.
+ Stage environment - integrated with my Assignment 2 API for authentication, reviews, etc.

I describe how this was setup under the [Independent Learning](#independent-learning) section of this README file.
<br/>
<br/>

### __General changes for Integration__
Firstly I added a new file to api folder - `ewd-api-jn-2023.js`. This file contains the endpoints of my API that the react app will interact with for authentication and review functionalities. I then needed to update the `vite.config.js` file to add proxy rules for the paths used by the API. The routes added can be seen below.

~~~JavaScript
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    // cors: false,
    proxy: {
      '/api/reviews': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false
      },
      '/api/accounts/security/token': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false
      },
      '/api/accounts/*': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
~~~

All changes to React code to integrate my API with my React application can be seen in the following GIthub commit comparison...
+ [React Movies App - Comparison of starting point commit and final commit](https://github.com/JGN1/labMoviesApp/compare/0a08d1befefea3da269d47d393ccfa5a13425a25...7494d2bb4abc8730022f496e13a6074b43fb7ccb)

I created a `.env.stage` file to be used when running in stage environment. This file contains items such as my TMDB keys and a some new keys as can be seen below (TMDB and SUPABASE details redacted).

~~~JavaScript
VITE_TMDB_KEY=...........
VITE_SUPABASE_URL=............
VITE_SUPABASE_ANON_KEY=...........
VITE_NODE_ENV=stage
VITE_AUTH_API=MONGODB
VITE_BASE_URL_API=http://127.0.0.1:8080
VITE_AUTHPROVIDER_PATH=./src/contexts/authProvider_API.jsx
REACT_APP_NOTES=for_AUTH_API_options_are_SUPABASE_or_MONGODB
~~~

The `VITE_NODE_ENV` and `VITE_AUTH_API` environmental variables are used as effectively switches between dev and stage in code. This is described in more detail in [Independent Learning](#independent-learning) section of this README file.
<br/>
<br/>

### __Integration for Authentication__
I wanted to minimise changes to get my React application to interact with my API for authentication . To achieve this I used a combination of total rewrite/replacement of `contexts\authProvider.jsx` file, followed by alterations to two other files - `login.jsx` and `profileIcon/index.jsx`. 

Having code for both SUPABASE and my API in the one file would have been too cluttered, so I opted to rewrite the content of the `contexts\authProvider.jsx` file on startup, with the content depending on the environment choosen. The `authProvider` file used for my API is similar to that used for the react app in the labs with some minor alterations to fit in with my React code.

~~~JavaScript
import React, { useState, useContext, createContext } from "react";
import { login, signup } from "../api/ewd-api-jn-2023";

// export const AuthContext = createContext(null);

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [email, setEmail] = useState("");

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  // const login = async (email, password) => {
  const authenticate = async (email, password) => {
    const result = await login(email, password);
    console.log("result token - "+result.token);
    if (result.token != undefined) {
      console.log("in login set token area");
      setToken(result.token)
      setAuth(true);
      setEmail(email);
      setUser(email);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const result = await signup(email, password, firstName, lastName);
    console.log(result.code);
    return (result.code == 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setAuth(false), 100);
    setToken();
  }

    return (
      <AuthContext.Provider
        value={{
          user,
          // login,
          authenticate,
          register,
          signout,
          auth
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );

};

export default AuthContextProvider;
~~~

After setting up the rewrite of the `authProvider` file, I needed to alter the following two files:
+ src/pages/login.jsx
+ src/components/profileIcon/index.jsx

For the `login.jsx` page I made the following changes. Replaced 
~~~JavaScript
const { login } = useAuth();
~~~
with 
~~~JavaScript
const { login, authenticate } = useAuth();
~~~
This allowed me to use methods from either SUPABASE or API authProvider context. I then replaced the following code in the handleSubmit function...
~~~JavaScript
      const {
        data: { user, session },
        error
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
~~~
with... 
~~~JavaScript
      if (import.meta.env.VITE_AUTH_API == "SUPABASE") {
        console.log("in login.jsx - 1 - SUPABASE");
        const {
          data: { user, session },
          error
        } = await login(emailRef.current.value, passwordRef.current.value);
        if (error) setErrorMsg(error.message);
        if (user) navigate("/");
      }
      if (import.meta.env.VITE_AUTH_API == "MONGODB") {
        console.log("in login.jsx - 1 - MONGODB");
        const {
          data: { user, session },
          error
        } = await authenticate(emailRef.current.value, passwordRef.current.value);
        if (error) setErrorMsg(error.message);
        if (user && session) navigate("/");
      }
~~~
This is essentially performing a switch operation, calling the appropriate method based on the value of `VITE_AUTH_API` value in the .env (or .env.stage) file.

The `components/profileIcon/index.jsx` page essentially manages the session of a logged in user. As such I needed to update this so that the React protected routes could be accessed/protected depending on whether user logged in or not. Additionally the information displayed in the profileIcon component changes for logged in and logged out users. The following screenshots illustrate this..

![][image13]
![][image14]
![][image15]

To make the code compatible with both APIs the following code changes were necessary. I replaced...
~~~JavaScript
const { error } = await signOut();
~~~
with...
~~~JavaScript
await signout();
~~~
to cover differences in method naming depending on whether SUPABSE or API. Also `const { error }` throws errors when app pointed to API. I also refactored the name of the `signOut()` method in the SUPABASE authProvider context file to `signout()`. 

The second section of code changed was as follows...
~~~JavaScript
  if (import.meta.env.VITE_AUTH_API == "SUPABASE") {
    // setName = props.user;
    var displayName = props.user;
  }
  if (import.meta.env.VITE_AUTH_API == "MONGODB") {
    // setName = user;
    var displayName = user;
  }
~~~
For the original SUPABASE authentication, the user details are retrieved from `props.user`. For my API they are in `user` variable. The above 'switch' was added to allow display of username in both environments.

Finally, I altered the returned component to remove reference to `props.user` instead replacing with the new variable `displayName`.

Before...
~~~JavaScript
  <MenuItem onClick={handleClose}>
    <Avatar /> {props.user}
~~~
After...
~~~JavaScript
  <MenuItem onClick={handleClose}>        
    <Avatar /> {displayName}
~~~

[Security and Authentication](#security-and-authentication)

After making these changes, protected routes, such as opening an actors details page became unavailable unless logged in - essentially my API authentication took the place of the SUPABASE authentication for the React Movie App protected routes. These protected routes are as follows...
~~~JavaScript
  <MoviesContextProvider>
    <Routes>
      {/* Items within the AuthRoute route element require authentication to access  */}
      <Route element={<AuthRoute />}>
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/watchlist" element={<WatchlistMoviesPage />} />
        <Route path="/actors/profile/:id" element={<ActorDetailsPage />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
      </Route>
~~~

Additionally, by logging in with my API, a JWT Bearer Token is added to the Authorization Header...

![][image20]

This bearer token is passed to my API via the Authorization Header and used to verify the user is authorised to access the information.
<br/>
<br/>

### __Integration for Reviews__
For the Review API functionality I wanted to carry out a few functions
+ Check a user is logged in first before displaying reviews
+ Check for reviews for particular movie, and if not present give option to add review
+ Display existing reviews for a movie

In addition to adding the API file and VITE proxy forwarding as described [General changes for Integration](#general-changes-for-integration) section, the following files were altered...
+ src/contexts/moviesContext.jsx
+ src/components/movieReviews/index.jsx

The following changes were made to the `contexts/moviesContext.jsx` file. Firstly I needed to add an import for the `ewd-api-jn-2023` api file.
~~~JavaScript
  import {apiAddReview} from "../api/ewd-api-jn-2023";
~~~
Then in the addReview function of the script I added call to teh apiAddReview endpoint.
~~~JavaScript
  const addReview = (movie, review) => {   
    apiAddReview(movie.id, movie.original_title, review.author, review.review, review.rating);
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
~~~
These changes pointed the MovieContext to my API so I was then able to make the other required changes.

In `components/movieReviews/index.jsx`, built in quite a bit of logic to deal with the three possible states...
+ State where user not logged in
+ State where user logged in but no reviews
+ State where user logged in and reviews exist

The first change was to import the `getApiMovieReviews` function from my API file...
~~~JavaScript
  import { getApiMovieReviews } from "../../api/ewd-api-jn-2023";
~~~
I then added various useState constants that I would utilise later in the file...
~~~JavaScript
  const [checkResponse, setCheckResponse] = useState(false);
  const [responseComment, setResponseComment] = useState();
  const [responseLink, setResponseLink] = useState();
  const [responseLinkText, setResponseLinkText] = useState();
  const [responseState, setResponseState] = useState();
~~~
I then needed to add 'switch' to the `useEffect()` section of the script. For SUPABASE (dev environment) I added teh following...
~~~JavaScript
 if (import.meta.env.VITE_AUTH_API == "SUPABASE") {
      getMovieReviews(movie.id).then((rev) => {
        setReviews(rev);
        setCheckResponse(true);
      });
    }
~~~
For the API MONGODB (stage environment), the code was a bit more complex...
~~~JavaScript
if (import.meta.env.VITE_AUTH_API == "MONGODB") {
      try {
        getApiMovieReviews(movie.id).then((rev) => {

          setReviews(rev);
          const authToken = localStorage.getItem('token');
          try {
            var accessToken = authToken.split(" ")[0];
          } catch (error) {
            var accessToken = 'NotLoggedIn';
          }
          
          if (rev.length > 0 && accessToken == 'BEARER') {
            setCheckResponse(true);
            console.log("Reviews exist and logged in");
          };
          if (rev.error == "Error: Verification Failed jwt must be provided") {
            setCheckResponse(false);
            setResponseComment("To see your Reviews Please Log In");
            setResponseLink("/login");
            setResponseLinkText("Login");
            console.log(" JWT ERROR - Reviews Please Log IN");
          };
          if ((rev.length == 0 && authToken == null)|(rev.length > 0 && authToken == null)) {
            setCheckResponse(false);
            setResponseComment("To see your Reviews Please Log In");
            setResponseLink("/login");
            setResponseLinkText("Login");
            console.log(" Reviews Please Log IN");
          };
          if (rev.length == 0 && accessToken == 'BEARER') {
            setCheckResponse(false);
            setResponseLink("/reviews/form");
            setResponseState("state={{movieId: movie.id,}}")
            setResponseLinkText("Add Review");
            setResponseComment("You have not added any reviews yet");
            console.log(" no reviews yet");
          };
        });
      } catch (error) {
        setResponseComment("To see your Reviews Please Log In");
        setCheckResponse(false);
      }
    }
~~~
To better describe what this code does I have included the following screenshots. 

Review drawer display where user not logged in..
![][image16]

Review drawer display where user logged in but no reviews exist...
![][image17]

Review drawer display where user logged in and reviews exist...
![][image18]

For the first two situations, different links are displayed for the users convenience.
+ The first link to Login page 
+ The second link is to the Add Review page, and adds the movie object to the state so the user is brought to review form with correct images and movie details displayed...
![][image19]













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
<br/>
<br/>

ADDED TRY/CATCH to Accounts endpoint also to prevent app crashing on error


[image1]: readme_images/01_API_.env_contents.png
[image2]: readme_images/02_API_dependencies.js.png
[image3]: readme_images/03_Swagger_API_Doc.png
[image4]: readme_images/04_Swagger_Review_Actor_Endpts.png
[image5]: readme_images/05_Swagger_ActorReview_Endpt.png
[image6]: readme_images/06_Swagger_Endpt_Schemas.png
[image7]: readme_images/07_ValidationSchema_JOI.png
[image8]: readme_images/08_Validation_Routes.png
[image9]: readme_images/09_Postman_Tests.png
[image10]: readme_images/10_Newman_Test_Structure.png
[image11]: readme_images/11_Package_json_script_update_for_tests.png
[image12]: readme_images/12_Newman_Regression_report.png
[image13]: readme_images/13_ProfileIcon_Logged_Out.png
[image14]: readme_images/14_ProfileIcon_Logged_In.png
[image15]: readme_images/15_ProfileIcon_Logged_In_Menu.png
[image16]: readme_images/16_Review_Drawer_Logged_Out.png
[image17]: readme_images/17_Review_Drawer_Logged_In_No_Review.png
[image18]: readme_images/18_Review_Drawer_Logged_In_Reviews.png
[image19]: readme_images/19_Review_Form_With_Movie_State.png
[image20]: readme_images/20_Bearer_Token_in_DevTools.png

