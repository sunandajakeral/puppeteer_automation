# kriegerdigital

The digital transformation demands viable, accessible solutions that suit everyone, even in the furniture trade: From the client to the employee to the company as a whole.

## Version 1.0

## Added

- Added the test "registers a new user with valid details" for Registration functionality
- Added tests:
  - logs in to moebel-kraft.com with valid credentials
  - tries to login with empty credentials
  - tries to login with invalid username
  - tries to login with the valid emailid without customer account
- DB creation setup and related queries are added

## Installation

1. Clone the repository: `git clone <ssh>`
2. Install the dependencies: `npm install`

## DB setup

Install mssql npm package

```
npm install mssql -g

```
Run docker

```
docker-compose up

```
switch to sql-scripts folder

```
cd docker/sql-scripts
```

connect to the datbase
```
mssql -u sa -p YourPassword123
```
run sql script

```
.run init.sql

```

## Usage

1. Run the tests using the command `npm test`
2. Write a query that selects the item name and the name of its seller for each item that
   belongs to a seller with a rating greater than 4. The query should return the name of the
   item as the first column and name of the seller as the second column.

```
select items.name, sellers.name from sellers
join items on sellers.id = items.sellerId
where sellers.rating > 4

```

## Tasks

1. TestCase Creation and Documentation
2. Test Automation Creation
3. Test Result Task
4. Database Query challenge
5. API challenge
6. Performance task(plus point/not mandatory)
