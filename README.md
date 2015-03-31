# Getting started

There are a couple of applications you will need to install that will be used for every project: Node, Gulp, and 
Vagrant (especially on Windows). Follow the directions at these links to install these applications:

* [Node](https://nodejs.org/)
* [Gulp](http://gulpjs.com/)
* [Vagrant](https://www.vagrantup.com/)

After getting those installed, copy these files into your project folder first. Then, from that folder, run:

    npm install
    gulp
     
__If running on Windows, skip to the Vagrant section.__
     
The Gulp command will compile, test, and build. There are two arguments available for use:   

* `--watch` will start a server
* `--livereload` will enable livereload; you can also enable livereload in the `./gulp/config.js` file


# Vagrant

This project contains a Vagrant configuration file and script to create a consistent development environment across 
platforms, particularly on Windows. We found that many of the Node modules don't perform well on Windows, so please run 
these instructions to get the virtual machine and project started:

    vagrant up
    npm install
    gulp
    
To halt the virtual machine:

    vagrant halt


# Gulp

This project uses the Gulp taskrunner to run a number of different tasks including file copying, moving, and deletion, 
validation, testing, image processing, distribution packaging, and even launching the project in a browser.

## Config

The `./gulp/config.js` file contains a number of different configuration properties for the various build tasks listed 
below. Before listing the properties, one thing to note is the `dest` variable, which changes from if the `--watch` 
flag is used.

* __clean__ -  
  `src` lists directories and files to be processed
  
* __styles__ -  
  `entry` is the starting point for Stylus;  
  `dist` is the destination folder 
  
* __static__ -  
  `src` lists directories and files to be processed;  
  `dist` is the destination folder
  
* __images__ -  
  `src` lists directories and files to be processed;  
  `dist` is the destination folder
  
* __tests__ -  
  `src` lists directories and files to be processed;  
  `mocha` is the Mocha test framework configuration
  
* __lint__ -  
  `src` lists directories and files to be processed
  
* __scripts__ -  
  `entry` is the starting point for Browserify;  
  `output` is the destination file;  
  `dist` is the destination folder;  
  `vendor` lists directories and files to be processed by the vendor task
  
* __server__ -  
  `root` is the base folder for the server instance;  
  `port` is the server port;  
  `livereload` specifies if browser refreshes when files change
  
* __bower__ -  
  is the directory to be processed by the bower task

## Tasklist

The tasks listed here are in the format __taskname__ *(dependencies)*. Each task may be called on the command line with the 
command `gulp taskname`. 

* __default__ *(build)* -  
  The default task, which can be called with just `gulp`. If the `--watch` flag is used, a local server instance is 
  started and the project is opened in the default browser.
  
* __build__ *(tests, clean, static, scripts, style, images)* -  
  Calls sub-tasks to build the project.
  
* __tests__ *(lint, codestyle, mocha)* -  
  Runs unit tests and performs validation checks on JavaScript source files.
  
* __lint__ -  
  Runs JSHint validation checks against JavaScript source files.
  
* __codestyle__ -  
  Runs JSCS code style checks againt JavaScript source files.
  
* __mocha__ -  
  Runs unit tests found in the tests folder using the Mocha framework.
  
* __clean__ *(build)* -    
  Empty out specified directories and delete specified files to prepare for other tasks.
  
* __static__ *(copy)* -  
  Calls sub-tasks to process files in the static folder.
  
* __copy__ *(clean)*
  Copies files from the static folder to the distribution folder.
  
* __scripts__ *(browserify, vendor, bower)* -  
  Calls sub-tasks for processing JavaScript source files.
  
* __browserify__ *(clean)* -  
  Compiles app script in the distribution folder using Browserify.

* __vendor__ *(clean)* -  
  Concatenates vendor scripts in the distribution folder.
  
* __bower__ *(clean)* -  
  Concatenates Bower scripts in the distribution folder.
  
* __styles__ *(stylus)* -  
  Calls sub-tasks for processing CSS source files.
  
* __stylus__ *(clean)* -  
  Compiles app styles in the distribution folder using Stylus.
  
* __images__ *(imagemin)* -  
  Calls sub-tasks for processing images.
  
* __imagemin__ *(static)* -  
  Compresses source image files in the distribution folder.
   

# Structure

Describe the file and folder setup.
