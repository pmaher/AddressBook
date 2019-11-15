## Welcome!
With this little app you'll be able to add, update, view, delete, filter and sort addresses using a handy little single page webapp built with React + Redux + Spring Boot built with maven.

Step 0 - Building the Project
----
### `mvn clean install`

Step 1 - Run the backend Tomcat Server
----
### `mvn spring-boot:run`

Step 2 - Start the frontend server from the /app directory
----
### `cd app`
### `npm start`


Step 3 - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
----

Step 4 - Touring your REST service
----
With the app running, you can check things out on the command line using http://curl.haxx.se/[cURL] (or any other tool you like).

### View a specific Address:
$ curl localhost:3000/api/address/1
{
    "id":1,
    "firstName":"firstName",
    "lastName":"lastName",
    "email":"email@email.com",
    "phone":"999-999-9999",
    "address":"address",
    "address2":"address2",
    "city":"city",
    "state":"CA",
    "zipcode":"91361"
}

### List all Addresses:
$ curl localhost:3000/api/addresses
[{
    "id" : 1,
    "firstName" : "firstName",
    "lastName" : "lastName",
    "email" : "email@email.com",
    "phone" : "999-999-9999",
    "address" : "address",
    "address2" : "address2",
    "city" : "city",
    "state" : "CA",
    "zipcode" : "91361"
}]

### Create a New Address:
$ curl -X POST localhost:3000/api/address -d "{\"firstName\": \"George\", \"lastName\": \"Washington\", \"email\": \"bla@bla.com\", \"phone\": \"(999) 999-9999\",\"address\": \"16 Pennsylvania Ave\",\"address2\": \"Apt 2\",\"city\": \"Washington\",\"state\": \"D.C\",\"zipcode\": \"99999\"}" -H "Content-Type:application/json"
{
    "id":2,
    "firstName":"George",
    "lastName":"Washington",
    "email":"bla@bla.com",
    "phone":"(999) 999-9999",
    "address":"16 Pennsylvania Ave",
    "address2":"Apt 2",
    "city":"Washington",
    "state":"D.C",
    "zipcode":"99999"
}

### Update an Existing Address:
$ curl -X PUT localhost:3000/api/address -d "{\"id\": \"1\", \"firstName\": \"Denzel\", \"lastName\": \"Washington\", \"email\": \"bla@bla.com\", \"phone\": \"(999) 999-9999\",\"address\": \"16 Pennsylvania Ave\",\"address2\": \"Apt 2\",\"city\": \"Washington\",\"state\": \"D.C\",\"zipcode\": \"99999\"}" -H "Content-Type:application/json"
{
    "id":1,
    "firstName":"Denzel",
    "lastName":"Washington",
    "email":"bla@bla.com",
    "phone":"(999) 999-9999",
    "address":"16 Pennsylvania Ave",
    "address2":"Apt 2",
    "city":"Washington",
    "state":"D.C",
    "zipcode":"99999"
}

### Delete an Existing Address:
$ curl -X DELETE localhost:8080/api/address/2
{ 
    "message" : "success"
}