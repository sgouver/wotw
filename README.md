# Wonders of the World Project

The project is an interactive world map with all the new and the old Wonders of the world.
It was created from scratch as a part of Udacity's curriculum. It manifest the __Google API__,
and __Wikipedia API__ to create an interactive and informative environment.

## Table of Contents

* [Installation](#installation)
* [Structure](#structure)
* [Libraries](#libraries)
* [Contributing](#contributing)

## Installation

*  Clone this repository
* `npm install`
* `npm start`

## Structure

The project has the below structure :
  App.js // The main page where the composition of multiple components  occur.
    |     Most of the functionality is located here, in order to syncronise the state.
    |
    |__ __ MenuIcon.js // The stateless composition to create the MenuIcon
    |       |
    |       |___ sidebar.js // The list of the wonders in the sidemenu
    |       |___ search.js // the search input field
    |
    |__ __ SideMenu.js // The stateless composition that manage the SideBar
    |
    |__ __ MapContainer.js // The map container where the Markers and InfoWindow is created.

## Libraries

* `google-maps-react`
* `escape-string-regexp`

## Contributing

Find more ways to enhance the interactivity.
