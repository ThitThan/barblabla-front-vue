// import Vue from 'vue'
import Parse from 'parse'

Parse._initialize(
    'SqIb8jEvzPDuvUFrJuyIYFB6RAxEDFWVS3GSlbSy',     // APP_ID
    'iFWa2bs1bb0dAliy8uPhuKTkvDqeuJk4HNfCCInN',     // JS_KEY
    'Hu4w42FTCclQzVRiW1XQ01npSs9T8HE2CurE8pse',     // MASTER_KEY (required so users can modify other users)
);

Parse.serverURL = 'https://parseapi.back4app.com/'
Parse.User.enableUnsafeCurrentUser();

export default Parse
