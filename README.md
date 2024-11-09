# sallg001_cs418_course_project

Name: Sean Allgaier  
Course: CS 418  
Semester: Fall 2024  
Professor: Dr. Nasreen Arif

# Milestone 1 Specs
1. - [x] Users should be able to register new accounts using email addresses.
2. - [x] Users are identified by email address.
3. - [x] Password must be encrypted before storing in the database.
4. - [x] Users cannot register duplicate accounts using the same email address.  
5. - [ ] The user should receive a verification email upon successful registration.
     - [ ] Current 2-Factor-Authentication email does not count because it is hard-coded
6. - [x] Users cannot log in to the system until their email has been verified.
7. - [x] Users should be able to log into your website using the accounts they registered.
8. - [x] Users should be able to reset their passwords if they forget it.
9. - [x] Users should be able to change their passwords after they login.
10. - [x] A 2-factor-authentication should be used when a user attempt to login. This can be done by email, phone text, or a DUO push. You can just implement one of them.
11. - [x] The website should have a homepage for each user, where they can view their profiles, change passwords, and update information. Email cannot not be changed.
12. - [x] An admin user should be created from the backend. (Only 1)
13. - [x] An admin user has a different view from a regular user. (Later admin will approve the submitted advising sheet by student)

# Milestone 2 Specs
### Admin Portal
1. - [x] Design and create the prerequisite form for admin, displaying courses from levels 100 to 499 with fields: Level, Course, Enable/Disable
2. - [x] Update database based on the admin's selection of prerequisites.

### Student Portal
3. - [ ] Implement an ***Advising*** menu accessible upon student login.
4. - [ ] Design and create the “***Course Advising History***” form to display previously submitted records or indicate no records. Records will show in the list. You must show the below columns

<center>

| Date | Term | Status |
| :---: | :---: | :---: |
| 02/15/2024 | Fall 2024 | Pending |
| 10/15/2023 | Summer 2024 | Approved |
| 10/03/2023 | Summer 2024 | Rejected |

</center>

5. - [ ] Develop a form for creating new “***Course Advising***” form with three sections: History, prerequisites, and course plan.
6. - [ ] Implement the History section with fields: Last Term, Last GPA, Advising Term.
7. - [x] Enable dynamic addition of rows for prerequisites section with fields: Level, Course Name. (both fields will be dropdown)
8. - [x] Enable dynamic addition of rows for the course section with fields: Level, Course Name. (both fields will be dropdown)
9. - [x] Implement ***rules*** for course selection, preventing the addition of courses previously taken in the previous terms.
10. - [ ] Implement functionality to save new entries so that newly created records are displayed in the 'Course Advising History' form with a Pending status.
11. - [ ] When a user clicks on any record displayed in ***point 4***, they should be redirected to the Course Advising form with the selected record pre-populated. Additionally, if the status of the record is 'approved' or 'rejected,' the record should be frozen and not editable. If the status is 'pending,' the user can make changes and save the record.
12. - [ ] Deploy your Frontend, Backend and Database on server and your demo should be demonstrate from live server. (For milestone 2 and milestone 3).
