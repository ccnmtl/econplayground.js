# econplayground.js [![Build Status](https://travis-ci.org/ccnmtl/econplayground.js.svg?branch=master)](https://travis-ci.org/ccnmtl/econplayground.js)

Environment for authoring and interacting with economics graphs

## Requirements
You need to install these packages in order to build
econplayground. These are all requirements of mathjax.

Debian:
* `libfreetype6-dev`
* `pkg-config`
* `libcairo2-dev`
* `g++`
* `libjpeg-dev`

macOS / homebrew:
* `freetype`
* `pkg-config`
* `cairo`
* `jpeg-turbo`

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

### Overview
I'm still learning new things about React, and my React codebases are
the only ones I've ever worked with. I'm realizing now that it's
probably about time to look at how other people are solving similar
problems with React, to make things more typical and less
idiosyncratic.  So, there are some quirks here that I'd like to
explain.

The Django application displays either `Viewer.js` or `Editor.js`. The
graph create route displays `Editor.js`, while the graph detail route
displays `Editor.js`. The Editor and Viewer in turn render either
GraphEditor or GraphViewer, which contain the actual DOM elements.
Note that if an instructor visits the detail route of a graph,
Viewer.js gives them a GraphEditor, not a GraphViewer, because
instructors can edit graphs.

I'm not using [react-redux](https://github.com/reactjs/react-redux)
for XHR calls. To me, redux seems like a complicated solution to
very simple problems: GET, PUT, and POST requests. I realize there are
more complicated situations where I'm sure it's indispensable, but for
now, I've been fine without it. But again, I need to branch out more
and see how other people are using redux. Because it's also true that
I just don't know how to use redux.

So instead of using redux, I'm connecting state to the django server
with a few
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
calls, and a mapping to the Graph model in `GraphMapping.js`. If you
look at, for example, how I'm instantiating the `GraphEditor` in
`Editor.js`, you can see that I'm passing in tons of attributes to the
GraphEditor. The properties that are part of the Graph model are
prepended with 'g' - these are the properties sent to and from the API
via `GraphMapping.js`. These have been slowly growing over the course
of development. I made the decision early on to just do it this way
and run with it. What I gain out of this is that React is aware of any
changes to any of these attributes, and is able to keep everything up
to date throughout the entire application. For example, if I update
line 1's slope, the jsxgraph part of the application is notified, and
the change is displayed immediately. At the same time, the rest of the
application is still up to date and ready for a new PUT request to the
API if I want to save this change.

I don't think I would reap that same benefit if I was passing along a
`graph` object throughout my application, but there may be ways of
achieving the same ends that I'm not aware of yet.
There's a discussion about this [here](https://stackoverflow.com/questions/27105257/storing-an-object-in-state-of-a-react-component).

Anyways, I took this method and ran with it for the time being because
it just works, and will continue to, because it's just using the
basic notion of React props and state.
