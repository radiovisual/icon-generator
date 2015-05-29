#!/usr/bin/env node

var lwip = require('lwip');
var chalk = require('chalk');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var fs = require("fs");
var Promise = require('promise');
var mkdirp = require('mkdirp');

var iconGenPackage = require(path.join(__dirname, "package.json"));
var iconSizes = require(path.join(__dirname, "icon-sizes.json"));

if (!Object.keys(iconSizes)) {
    reportError("invalid json in icon-sizes.json");
    process.exit(1);
}

var platforms = argv._;

var source_image = argv.s;
var output_destination = argv.o || "";

outputSessionInformation(platforms, source_image, output_destination);

// save the platforms in a que so that
// we can process the images in order
var platform_que = [];
var index = 0;

// Which platforms will we output?
platforms.forEach(function(platform){
    if (platform.toLowerCase() === "ios")     {
        iconSizes.ios.forEach(function(value){ platform_que.push(value); });
    };
    if (platform.toLowerCase() === "android")     {
        iconSizes.android.forEach(function(value){ platform_que.push(value); });
    };
});

function processQueObject(queObject){

    lwip.open(source_image, function(err, image) {

        if (err) throw err;

        var filename = queObject.filename + path.extname(source_image);
        var folder = queObject.folder;
        var fullpath = path.join(output_destination, folder, filename);
        var dirpath = path.join(output_destination,folder);

        mkdirp(dirpath, function (err) {

            if (err) {

                reportError("Cannot make directory: "+dirpath);
                console.error(err);
                process.exit(1);

            } else {

                var width = queObject.width;
                var height = queObject.hasOwnProperty("height") ? queObject.height : width;

                image.resize(width, height, function(err, rzdImg) {
                    rzdImg.writeFile(fullpath, function(err) {
                        if (err) {
                            console.log(chalk.red("    [x] ") + chalk.red(fullpath));
                            console.log(err.message);
                        };
                        console.log(chalk.green("    [x] ") + chalk.white(fullpath));
                        index++;
                        if (index < platform_que.length){
                            processQueObject(platform_que[index]);
                        } else {
                            console.log();
                            console.log( chalk.gray("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
                            console.log( chalk.magenta("COMPLETE: ") + chalk.white("processed "+index+" icons"));
                            console.log( chalk.gray("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
                        }
                    });
                });

            }

        });
    });
}

// start the que with the first cue item
processQueObject(platform_que[index]);

function reportError(msg){
    console.log();
    var m = chalk.white.bgRed(' ERROR: ') + " " +chalk.white.bold.bgBlack(msg);
    console.log(m);
    console.log();
}

function outputSessionInformation(platforms, source_image, output_destination){
    var _output = output_destination === "" ? "/ (current directory)" : output_destination;
    console.log();
    console.log(chalk.gray("Icon Generator version ", iconGenPackage.version, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
    //console.log(chalk.gray());
    console.log(chalk.magenta("Creating icons for the following platforms:")+ " "+chalk.white(platforms.toString()));
    console.log(chalk.cyan("Using source image: ")+source_image);
    console.log(chalk.cyan("Saving icons to: ") + " "+ _output);
    console.log(chalk.gray("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
    console.log();
}