# What2Pack
Welcome to What2Pack!
The aim of this webapp is to enable you to information and prepare yourself for your next planned trip, based on your destination and travel dates. 

The webapp gives you:
Packing advice based on the weather (API)
The local holidays that are happening during your planned trip (API)
Current news on your planned destination (API)

# What we have done:
On the landing page, you can fill in your destination and travel date, when you click on search you will see packing advice based on the weather API.
If you click on the login icon, you can sign up or log in on What2Pack and sign out. 
User testing : https://docs.google.com/document/d/1jlsax-P4guY3SXY7rLVAtGeZ12kV93LXTaiUh6joi3U/edit


## Our project file structure (short description/purpose of each file):
```
[src]
    [assets]
        react.svg (default file)
    [reactjs]
        LoginPresenter.jsx (redirect Login View (will handle login props later))
        detailsPresenter.jsx (trip details presenter, handles plan details and suggested item props)
        profilePresenter.jsx (user profile presenter, handles saved trip props)
        signUpPresenter.jsx (signuup presenter, redirect signup View (will handle signup props later))
        startPresenter.jsx (start page presenter, handles search props)
        useModelProp.jsx (hook for observer lifecycle)
        useRerender.jsx (hook for rerender)
    [views]
        AuthDetails.jsx (checks login/logout state for header )
        LoginView.jsx (Login page)
        SignIn.jsx (Sign in component + firebase)
        SignUp.jsx (Sign Up component + firebase)
        addButtonView.jsx (handle the reaction of adding travel information into account)
        detailsView.jsx (shows all your trip information and packing advice)
        profileView.jsx (when you are logged in you can find your saved trips here)
        searchBarView.jsx (creates search bar view, that uses autocomplete portion from searchCompleteView and adds date picker)
        searchCompleteView.jsx (handle search autocomplete, use package to process Google places autocomplete API)
        startView.jsx (Loading page)
        userIconView.jsx (handle the clicked icon reaction)
    App.css (set up the layout and UI for pages) 
    App.jsx (to export App component)
    What2PackModel.js (define model)
    apiConfig.jsx (contains API urls)
    firebaseConfig.js (firebase configuration details) 
    firebaseModel.jsx (custom hook for firebase auth)
    index.css (set up the layout and UI for pages)
    main.jsx (display app)
    resolvePromise.js (resolvePromise function)
    weatherSource.jsx (work in progress, to call weather API to get weather data)
```

## Routes:
Route "/" or "/start" shows you the startpage
Route "/login" and "/signup" are the login and sign Up pages
Route "/details" shows the detailed information based on the given search on the startpage from the API's
Route "/profile" shows the profile page where you can find your saved trips

## API's:
Weather API: https://api.open-meteo.com/v1/forecast?
Holiday API: 

## Technologies:
MVP
Framework - React + Vite
Hosting, Database and Authentication with Firebase

And a router that can show corresponding presenters according to different URL.


## Third party components:
Location finder: https://maps.googleapis.com/maps/api/js?key=
Ant Design: https://ant.design/ 
DatePicker, Button, Input, Icon, Popconfirm, Notification

## Note: 
Because we are using Vite, 
1. all the extensions for js files should be .jsx instead of .js.
2. When using React you need a React import everywhere you use JSX (e.g. Views): import React from "react";

