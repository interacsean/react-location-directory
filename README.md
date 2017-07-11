# Location directory

This project is a tech demo for what I hope to develop into a location based directory boilerplate.

Please Note:
* Search results drawn from DataSourceDummy are random variations on the selected location.
* The links from the nav menu do not have active pages.

## Techonolgies used:

* React
* Webpack 2
* SCSS
* HTML & CSS3
* Google places API

## Todo list:
* Create a Listing Page route
* Address usability issue of not being able to use keyboard with the AutoComplete
* Improve documentation of classes, methods etc
* Tighten up the dataset spec of the ListingData service.
* Make it pretty
* Add SCSS autoprefixer [https://github.com/postcss/autoprefixer]
* Write component tests
* Search for "Tidyup:" for pieces of code I think I could improve on
* Debug DebounceInput component (see known issues)

## Known issues

The DebounceInput component currently has a bug in some situations when using the keyboard.  To replicate, begin typing the name of a city, then select the text using shift+home keys and begin typing.  After the debounce period, the text field will empty itself, removing the characters you have begun to type.  This component is a community developed package and I plan on debugging the issue to submit a patch/PR.