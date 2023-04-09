Welcome to the What2Pack Website!
On this website you can find information and prepare yourself for your next planned trip.
Bases on you destination and travel dates. 
The websites gives you:
1. Packing advices based on the weather (API)
2. The Holidays that are happening during you planed trip (API)
3. Current news on your planned destination (API)

Routes:
Route "/" or "/start" shows you the startpage
Route "/login" and "/signup" are the login and sign Up pages
Route "/details" showes the detailed information based on the given search on the startpage from the API's
Route "/profile" shows the profile page where you can find your saved trips

API's:
Weather API: https://api.open-meteo.com/v1/forecast?
Holiday API: 

Technologies:
MVP
Framework - React + Vite
Hosting, Database and Authentication with Firebase

And a router that can show corresponding presenter according to different URL.

Third party components:
1. location finder: https://maps.googleapis.com/maps/api/js?key=
2. Calender
3. dayjs

Note: 
Because we are using Vite, 
1. all the extension for js files should be .jsx instead of .js.
2. When using React you need a React import everywhere you use JSX (e.g. Views): import React from "react";
