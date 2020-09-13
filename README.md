# reddit-clone
## Setup for development
### Install node modules
```
npm install
```
### Compile and hot reload
```
npm run serve
```
### Create .env
Create .env.development file in root directory. `VUE_APP_BASE_URL` is the base url for all api calls. [Backend](https://github.com/mismaah/reddit-clone-backend) runs on port 8000 by default.
```
VUE_APP_BASE_URL=http://localhost:8000
```

## Setup for production
### Create .env
Create .env.production file in root directory.
```
VUE_APP_BASE_URL={backend host}
```
### Compile and minify for production
```
npm run build
```
