--FINISHED INSTRUCTIONS--
Full Startup instructions:
1. Open 2 terminals
2. Open terminal 1 and cd to project root and run "mvn spring-boot:run"
3. open 2nd terminal and cd to "frontend/flywire-frontend", then run "npm start"

Backend Interaction Instructions:
1. To get all active employees: GET http://localhost:8080/employees/active
2. To get an employee by ID: GET http://localhost:8080/employees/{id}
3. To get employees hired within a date range: GET http://localhost:8080/employees/hired?startDate={startDate}&endDate={endDate}
4. To add a new employee: POST http://localhost:8080/employees/
5. To deactivate an employee: PUT http://localhost:8080/employees/{id}/deactivate
--END INSTRUCTIONS--
# Flywire Interview Exercise

> Create an application to act as a web service for managing and retrieving company employee information. Please use any frameworks and libraries you feel comfortable with and would make sense for the situation. The application uses Spring Boot framework and a built in Tomcat server to run the app locally on port 8080. The data.json file will be the data source used to. This base project should provide  to start the web service application.

> All http requests must return a JSON response.

<b>**Before committing any code, please create a new branch off of main.<br/>Name it: "{your-github-id}-flywire-exercise"<b>
 
 1. Create an http request endpoint that returns a list of all active employees in alphabetical order of last name.
 
 2. Create an http request endpoint that takes in an ID and returns a JSON response of the matching employees, as well as the names of their direct hires. Employee IDs are unique.
 
 3. Create an http request endpoint that takes a date range, and returns a JSON response of all employees hired in that date range. Sort by descending order of date hired.
 
 4. Create an http request endpoint that takes a name, id, position, direct reports, and manager to creates a new employee. The employee should be added to the JSON file. Add any validation and error handling you see fit.
 
 5. Create an http request endpoint that takes in an ID and deactivates an employee. Add any validation you see fit.

 EXTRA FRONT-END CREDIT: Create a web page show a list of employees. Flex your design skills and front-end experience to make it as complex or presentable as you like.


