# Location directory

This project is a tech demo for a location based directory.  I hope to develop it into a usable boilerplate that can be easily set up.

_It was built quickly and there are many improvements yet to be made (see Todo list)_

### Please Note:
* Search results drawn from DataSourceDummy are random variations on the selected location. 
* Occasionally (_by design!_) DataSourceDummy will mimick there being no search results in the selected location.
* The links from the nav menu do not have active pages and will 404.

## Techonolgies + Methodologies used:

* React
* Webpack 2
* SCSS, vaguely complying to 
* HTML & CSS3 (flexbox, responsive breakpoints)
* Google places API

## Todo list:
* Create a Listing Page route for page details
* In prod build, have SCSS build into external css file
* Address usability issue of not being able to use keyboard with SearchAutoComplete box
* Improve documentation of classes, methods etc
* Tighten up the spec of the ListingData service to refine returned object.
* Make it pretty
* Add SCSS autoprefixer [https://github.com/postcss/autoprefixer]
* Write component tests
* Search for `Tidyup` for pieces of code I think I could write more efficiently.
* Debug DebounceInput component (see known issues below)

## Known issues

The DebounceInput component currently has a bug in some situations when using the keyboard.  To replicate, begin typing the name of a city, then select the text using shift+home keys and begin typing.  After the debounce period, the text field will empty itself, removing the characters you have begun to type.  This component is a community developed package and I plan on debugging the issue to submit a patch/PR.
