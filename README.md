# sallg001_cs418_course_project

Sean Allgaier
CS 418


# Features:

## In progress:
* Users should be able to change their passwords after they login.
* The user should receive a verification email upon successful registration. (2FactorAuthentication email does not count) 

## Completed:
* Users should be able to register new accounts using email addresses.
* Password must be encrypted before storing in the database.
* Users cannot register duplicate accounts using the same email address.

* Users should be able to log into your website using the accounts they registered.
* A 2-factor-authentication should be used when a user attempt to login. This can be done by email, phone text, or a DUO push. You can just implement one of them.
* Users cannot log in to the system until their email has been verified.
* Users are identified by email address.
* An admin user should be created from the backend. (Only 1)
* The website should have a homepage for each user, where they can view their profiles, change passwords, and update information. Email cannot not be changed.
* Users should be able to reset their passwords if they forget it.
* An admin user has a different view from a regular user. (Later admin will approve the submitted advising sheet by student)

## Unintended Features (aka bugs):
* When a user tries changing their password while logged in, the old password in the database gets overwritten by *something* that is not the new password. The user is then forced to use the "forgot password?" link on the login screen to reset their password.
