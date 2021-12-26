# Instructions to run the server

## Requirements:

1. node version >= 12 is required
1. mongo version >= 5 is required
1. create ".env" file in the root directory of the project folder
    1. create 2 variables "DB_STRING", "SECRET"
    1. "DB_STRING" should be in format "mongodb://localhost:27017/[database-name]"
1. Make sure no other process is running on port 3000

## To run the server
1. cd into the projecct's root directory
1. run "npm install"
1. run the command "node app.js"