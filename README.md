# tnp-portal-web
A Web App for Training and Placement (TnP) Department of a college.
1. Student is allowed to create his/her profile which includes details like basic personal info, education, addresses, experiences, etc.
2. ONE CLICK APPLY: This enables students to apply for a company (internship/placement) just by clicking on the APPLY button and all the basic info required by the company is automatically submitted (already provided by the student in profile creation section). This saves time of students as they don't have to fill in their data again and again in Google forms.
3. A confirmation notification in the form of SMS/email is sent to the student when the application is verified and approved automatically (CG, Branch, etc. validation).
4. Students can track their applications.
5. Whenever the TnP department adds a post or date of exam is confirmed, a notification to the interested students will be sent via SMS/email along with company name and the deadline to apply (notification will be sent to the only Branch and CG filtered students). 
6. Similar notifications will be sent once the student applies for a particular post and any updates regarding that post are made by the TnP department.

## Important
Before cloning this repository, make sure to do the following:

1. Make a new directory
2. Create a venv to work with
3. Activate the venv and install Node.js
4. Clone this repo and get started... 

After cloning the repo:

1. Run the command `npm install` to install all the dependencies and devDependencies (`node_modules`) mentioned in the          `package.json` file 
2. Install nodemon globally using `npm install -g nodemon` and then run `nodemon src/app.js` to start the web app. 
3. Alternatively, you can use nodemon as devDependency and run it locally.
4. You can also use `node src/app.js` to run using node.

### Project Structure
```
tnp-portal-web # (dir for holding project components)
---- venv
---- config
-------- *.js 
---- node_modules
---- public
-------- css
-------- img
-------- js
---- src
-------- controllers
-------- db
-------- models
-------- routers
-------- app.js (starting point of the app)
---- templates
-------- views
------------ *.ejs
------------ partials
---------------- *.ejs (headers and footers)
---- .gitignore
---- .env
---- package-lock.json
---- package.json
---- README.md
```
