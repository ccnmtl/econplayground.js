# econplayground.js [![Build Status](https://travis-ci.org/ccnmtl/econplayground.js.svg?branch=master)](https://travis-ci.org/ccnmtl/econplayground.js)

Environment for authoring and interacting with economics graphs

## Development Notes
Here's how to develop econplayground.js in the econplayground django application:

* `cd econplayground`
* `rm media/econplayground.js/main.js`
* `ln -s ~/public_html/econplayground.js/build/main.js media/econplayground.js/main.js`
* `make runserver`

Then, in a new terminal:

* `cd ~/public_html/econplayground`
* `make dev`

Now you can make changes in the econplayground.js repository, and the
build will be updated when you access the tool in the Django application.
