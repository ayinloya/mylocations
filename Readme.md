## Table of contents
* [App info](#app-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)

## App info
The sample application is called myLocations and it allows the user to maintain a list of
categorized name locations.
	
## Technologies
Project is created with:
* Node:  16.14.0
* React: 16.14.0
* React router 7.2.6
* Vite: 2.8
* Tailwindcss: 3.0.23
* Redux (Redux Toolkit) 1.8.0
* Google maps (react-google-maps/api) 2.7.0
	
## Setup
To run this project

Create a .env.local file with the following key

```
VITE_MAP_KEY=GoogleApiKey
```


Install it locally using npm:

```
$ cd ../my-locations
$ npm install
$ npm run dev
```

## Features
* Add, edit, view, delete categories
* Add, edit, view, delete locations
* View location on map
* Add multiple categories to a single location
* Add location coordinates through google maps
* Filter by category (show only locations with the selected category)
* Group locations by category