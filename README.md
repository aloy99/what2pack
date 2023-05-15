# What2Pack
Welcome to the What2Pack Website!
The aim of this website is that you can find information and prepare yourself for your next planned trip. Based on your destination and travel dates. 

The website gives you:
Insights into the weather (API) on your planned dates* (* We only provide 14 days weather forecast.)
Packing list suggestions based on the weather forecasts. You can modify your list by adding/deleting items, or change the amounts/remarks of the items. You can also tick on/off the items on the list for the ease of packing.
The holidays (API) that are happening during your planned trip.
Current news (API) on your planned destination, links to external websites included.
You can also create an account on the website, so you can save all your planned trips to the database.  This allows you to save all your trip plans and view them again at a later date.
When saving a trip, the website will add a matching photo from Unsplash (API) based on the destination.

We at the What2Pack team wish everyone so much ease in preparing and packing for your trip and wish everyone a safe journey!


# Setup instructions
git clone the repository into your working directory of choice
```npm install
npm run dev ```
Open the website on you localhost

## Our project file structure (short description/purpose of each file):
```
[src]
	[What2PackModel.js]
		Model file.
	[views]
		View files.
[reactjs]
Presenter files.
	[main.jsx]
	[App.jsx]
		Root components.
[api] 	
API related files, for getting the data from the APIs including holiday info, news info, weather info, and the unsplash image.
	[App.css]
	[index.css]
		Styling files.
[firebaseConfig.js]
[firebaseModel.js]
	Firebase related files, to get data from and save data to the database.
	[resolvePromise.js]
		Function to resolve promise.
[utils.jsx]
		File for util functions such as giving suggested packing list based on weather info.
	[examples.jsx]
		Examples of objects for reference.
[assets](useless)
react.svg (default file).

```

## Routes:
Route "/":
shows you the startpage. It is intended as the landing page.
Route "/login":
Is the login/sign Up page.
Route "/details":
shows the detailed information based on the given search on the startpage from the API's. However, it is not intended for users to direct to this URL directly.
Route "/profile":
shows the profile page where you can find your saved trips.

There is plenty of links and clickable components to take the user to other parts of the website. There is also a navigation bar always at the top of the app, guiding the user to different routes.

## API's:
Gmaps API: https://maps.googleapis.com/maps/api/js?key=?
Weather API: https://api.open-meteo.com/v1/forecast?
Holiday API: https://api.api-ninjas.com/v1/holidays
News API: https://bing-news-search1.p.rapidapi.com/news?
Pictures related to the chosen holiday: https://api.unsplash.com/photos/random?

## Technologies:
MVP
Framework - React + Vite
Hosting, Database and Authentication with Firebase

And a router that can show corresponding presenters according to different URL.

## Third party components:
Location finder: https://maps.googleapis.com/maps/api/js?key=
Ant Design: https://ant.design/ 
DatePicker, Button, Input, Icon, Popconfirm, Notification
