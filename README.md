# Vue app for sorting financial instruments table

## What is the use of this Repo 

This Repo demonstrates the use of the following in vuejs
1. Vue Routing
2. Components
3. Unit testing with mocha and chai
 
## Prerequisites

### Install NodeJS [![Generic badge](https://img.shields.io/badge/Prerequisite-NodeJS-blue.svg)](https://nodejs.org/en/)

Refer https://nodejs.org/en/ to install NodeJS

### Install Vue Cli [![Generic badge](https://img.shields.io/badge/Prerequisite-VueCli-blue.svg)](https://cli.vuejs.org/guide/)

Install Vue Cli Node Package Globally using the following Command.

```bash
npm install -g @vue/cli
```
## Cloning and Running the Application

Clone the application to local

Go into the project Folder and install the npm packages using the following command
```bash
npm install
```
Run the following command to run the application
```
npm run serve
```
The Application runs on **localhost:8081**

## Application Design

### Views and components

**Instruments** : This View Displays a list of financial instruments and gets the data from a json from assets folder

### Http 

**fetch** is used to make http calls

### Routing

The Application has 1 endpoint

**/instruments** : The ties to *Financial Instruments* View

## References

**VueJS** : https://vuejs.org/v2/guide/

**vue cli** : https://cli.vuejs.org/guide/

**fetch** : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

**vue router** : https://router.vuejs.org/guide/
