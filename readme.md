# Ydra

A React/Redux/Redux-Saga app for pair programming, coding exercises, and technical interviews.

[*Ydra is Kira's podling foster mother in* The Dark Crystal](http://muppet.wikia.com/wiki/Ydra)

## Purpose

As a pair programming exercise, we're not focused on building an app from scratch or creating future-proof code. It's okay to hack your way to getting a feature to work. The main purpose here is to facilitate communication and gain familiarity with the libraries that drive our ion-ui project. 

Drivers should switch every 30 minutes. Code should be committed to a branch off of master and pushed to the Github repo. 

## Setup

1. Install the version of Node and NPM listed in package.json
2. Install dependencies
3. Create a Github personal access token--rate limits are pretty low without it: https://github.com/settings/tokens
4. Start the test watcher

## Coding Exercise

*Using the [Github v3 API](https://developer.github.com/v3/) develop and test the following features:*

1. Retrieve 5 public repos from an organization
    1. Display each repo's name, description, and license type
    2. Style the repos as a list using css flexbox
    3. Add an input to change the organization
    
2. Retrieve and display a list of pull requests for each repo
    1. Show the headline, age, and total number of comments on each pull request
    2. Color code a pull request if it's either approved or has changes requested
    3. Link to the pull request on github

3. Create a pull request on Github for the changes made here
