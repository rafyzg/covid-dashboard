# Covid 19 Data Dashboard

This is a simple Covid 19 dashboard analytics visualization developed with React and Ant Design.

This dashboard uses the [disease.sh API](https://github.com/disease-sh/api)

See Live Demo: https://covidanalytics.netlify.app/

## Technologies

- React 
- Ant Design
- Ant Design Charts
- react-countup

## Screenshots

![Alt text](/screenshots/ContinentsData.PNG?raw=true "Continents Data")
![Alt text](/screenshots/GlobalData.PNG?raw=true "Global Data")
![Alt text](/screenshots/CountryData.PNG?raw=true "Country Data")
![Alt text](/screenshots/covidtimeline.PNG?raw=true "Covid Timeline")


### Quick Start

You can run this project from source or running it as a docker container.

### Source

```
git clone https://github.com/rafyzg/covid-dashboard

cd covid-dashboard
```

Install packages (using yarn in preffered)
```
yarn
``` 

or 

```
npm run install 
```

Then run the project:

```
npm run start
```
Visit the url : `http://localhost:3000`

#### Docker 

```
docker build -t covid_dashboard .
docker run 3000:3000 covid_dashboard 
```

