# OAuth

## SetUp

in order to run this file you will need two different .env files
* for the front-end
```
CDN_URL=/
NODE_ENV=development
API_URL=http://localhost:3000
```
* for the back-end
```
PORT=3000
API_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost/dev
CORS_ORIGIN=http://localhost:8080
CLIENT_URL=http://localhost:8080
CLOUD_SECRET=(your-app-secret)
AWS_BUCKET=(your-bucket)
AWS_ACCESS_KEY_ID=(your-key-id)
AWS_SECRET_ACCESS_KEY=(your-secret-key)
GOOGLE_CLIENT_ID=(your-google-client-id)
GOOGLE_CLIENT_SECRET=(your-google-client-secret)
```
## How to run
1. run the database
`npm run dbon`
2. start the server
`npm start`
3. run live server
`npm run live`

The Oauth is currently a link that will cookie the browser