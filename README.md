# Getting started

This scaffold has three global dependencies: Node, Gulp, and Bower. To install Node, find the installer here:

* [Node](https://nodejs.org/)
    
To install Gulp 4, run:
 
    npm run gulp4

To install Bower, run:

    npm install bower -g

Finally, to install local project dependencies, run:

    npm install
    bower install
     
To kick off a dev build, start a local server and open the project in a browser, run:

    gulp


# Gulp

This project uses the Gulp taskrunner to run a number of different tasks including file copying, moving, and deletion, 
validation, testing, image processing, distribution packaging, and open the project in a browser.

## Tasklist

The tasks listed here are in the format __taskname__ *(dependencies)*. Each task may be called on the command line with the 
command `gulp taskname`. The following tasks will probably be called most often:

* __default__ *(watch-dev)* -  
  The default task, which can be called with just `gulp`. Dev build + local server.

* __watch-dev__ *(build-dev, watch)* -  
  Dev build + local server.

* __watch-prod__ *(build-prod, watch)* -  
  Prod build + local server.

* __build-dev__ *(dev, build)* -  
  Set dev flags and build.

* __build-prod__ *(prod, build)* -  
  Set prod flags and build.
  
* __build__ *(clean, tests, static, scripts, styles, images)* - 
  Calls sub tasks to build the project files.

### Sub tasks

A selection of the tasks that are called by the tasks above, which may also be called from the command line if 
so desired.
  
* __images__ -  
  Process and copy images from the images folder into the build.
  
* __scripts__ *(scripts-app, scripts-vendor, scripts-bower)* -  
  Generate build scripts.
  
* __static__ -  
  Copy files from the static folder into the build.
  
* __styles__ *(stylus)* -  
  Generate build stylesheets.
  
* __tests__ *(tests-jscs, tests-jshint, tests-mocha)* -  
  Run validation and unit tests.

* __version__ -  

  If no `--version=STRING-OR-NUMBER-HERE` arguments are used, a version number from new Date().getTime() is added 
  to the JS and CSS file names. main.build.js would be `main.build.1433375041078.js` and `index.css` would be 
  `index.1433375041078.css`. index.html would have the following comments at the bottom of the file while the CSS 
  and JS files will have this included at the top.
   
   `Version: 1433375041078`
   
   `Created: Wed Jun 03 2015 16:44:01 GMT-0700 (Pacific Daylight Time)`

  To use your own version number use `--version=STRING-OR-NUMBER-HERE`

## Config

The `./gulp/config.js` file contains a number of different configuration properties for the various build tasks listed 
below.
