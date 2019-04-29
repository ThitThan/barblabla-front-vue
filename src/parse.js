// import Vue from 'vue'
import Parse from 'parse'

// var Parse = require('parse')
Parse.initialize('gOXzeflDQ8opBMiiGlk39sLiJZ5HoeHw6Z6JcTiz', ) ; // just APP_ID is okay, since JS_KEY is not provided in the server.
Parse.serverURL = 'https://barblabla.me/parse'
Parse.User.enableUnsafeCurrentUser();

export default Parse
