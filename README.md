**To get going...**

- npm install
- gulp (will compile, test, and build)
- arg "--watch" will start a server
- arg "--livereload" will enable livereload. you can also enable livereload in the /gulp/config.js file.


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

* __default__ *(build)*
* __build__ *(tests, clean, static, scripts, style, images)*
* __tests__ *(lint, mocha)*
* __lint__
* __mocha__
* __clean__ *(build)*
* __static__ *(copy)*
* __copy__ *(clean)*
* __scripts__ *(browserify, vendor, bower)*
* __browserify__ *(clean)*
* __vendor__ *(clean)*
* __bower__ *(clean)*
* __styles__ *(stylus)*
* __stylus__ *(clean)*
* __images__ *(imagemin)*
* __imagemin__ *(static)*


## Arglist

* __--watch__
* __--livereload__
