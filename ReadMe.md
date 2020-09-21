# Setup

Clone this repo and run the following command

````
npm install
````
You should see that you have an .env file and a creds file. Please not these will no longer work after review by the client as the credentials and services associated will be deactivated.

# Start

In order to start this very simple API, run the following command

````
npm start
````

Unless specified in the .env file ( as the PORT environment variable), this will start an express server that is listening on port 4000. 

# Test

In order to test that the BigQuery API is responding, start the system and then perform a query by opening the browser and going to http://localhost:4000/. A very large JSON should be offered as reponse, containing the information found in sample_data.csv file found in the data/ directory of this repository.

Mind you, this data file is not used during the query and can be deleted to test the authenticity of the call to BigQuery.

In order to filter that data, navigate to http://localhost:4000/?category=1 and a much smaller set of data should be given back, corresponding to the items whose categ variable is equal to 1.

