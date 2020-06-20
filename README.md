MONSIEUR KARL PROJECT

## Start the project
// first time
- `npm run dev:init`
- `npm run dev:up:build or docker-compose up -d build`
- uncoment line 12 in api/server/server.js to synchronize Database and SAVE
- run `npm run api:w` and wait for 'sync OK'
- comment line 12 in api/server/server.js and SAVE
- Go to localhost:8080/users to check


// next times
`npm run dev:up or docker-compose up -d`

### React front-end: localhost:3000

### Plateform API: localhost:8080
