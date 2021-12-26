# book-inventory-management

## Requirements

1. node version >= 12
1. mongo version >= 5
1. No other process should run on port 3000
1. create ".env" file in project's root directory with variables
    1. "DB_STRING" of format "mongodb://localhost:27017/[database-name]"
    1. "SECRET" long string (more than 32 characters) of mixed characters
1. run "npm install"


## Instructions to run the server

1. cd into the project's root directory
1. run "node app.js"