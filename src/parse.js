// import Vue from 'vue'
import Parse from 'parse'

// var Parse = require('parse')
Parse.initialize('gOXzeflDQ8opBMiiGlk39sLiJZ5HoeHw6Z6JcTiz', '', 'YkNCuydCwc2rgxVNeP2z8nRnP9MyxHhQDfn9Yjwh') ; // just APP_ID is okay, since JS_KEY is not provided in the server, but MASTER_KEY is to allow user to modify other users.
Parse.serverURL = 'https://barblabla.me/parse'
// Parse.Cloud.useMasterKey();
Parse.User.enableUnsafeCurrentUser();

export default Parse
