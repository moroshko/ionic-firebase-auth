# Features

### Signup

When users sign up using their email address, email with a temporary password is sent automatically to them. They'll need to change the password prior to using the app.

### Login

To use the app, users need to log in using their email and password.

### Change Password

Users can always change their password, whether it's a temporary password they got upon sign up, or not.

### Reset Password

If one forgets their password, they can enter their email address to get a temporary password via email.

### Dashboard

Placeholder for the app itself.



# Firebase configuration

1. Change `FIREBASE_ROOT` in [app.js](https://github.com/moroshko/ionic-firebase-auth/blob/master/www/app.js) to point to your Firebase app.
2. In Firebase, go to `Simple Login -> Authentication Providers -> Email & Password` and make sure that **Enabled** is checked.
3. Set up your password reset email (in the same place)

# Installation

### To run the app in a browser:

    1. git clone git@github.com:moroshko/ionic-firebase-auth.git
    2. cd ionic-firebase-auth
    3. npm install
    4. ionic serve

### To run the app on an Android device:

    5. ionic platform add android
    6. ionic build android
    7. ionic run android
