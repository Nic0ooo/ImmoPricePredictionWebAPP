# Immobilier Price Detection

Frontend web app to estimate the price of an real estate property

Note that this webapp requires usage of an api, it's available from this repo [PriceImmoPredictAPI](https://github.com/Nic0ooo/PriceImmoPredictAPI.git)

----------------------------------------------------------------

## How use it

### To launch with Docker on Local

Clone the repository

```bash
git clone https://github.com/Nic0ooo/ImmoPricePredictionWebAPP.git
```

Build the image

```bash
docker build -t frontend-predict-immo .
```

Launch the container

```bash
docker run -it -p 80:80 -v frontend:/app frontend-predict-immo
```

### To test with the API

Start the python API from the repo [PriceImmoPredictAPI](https://github.com/Nic0ooo/PriceImmoPredictAPI.git)

If you choice to deploy the python API on Gcloud run, you have to add a .env file at the root of your project with the following

```bash
VITE_REACT_APP_API_URL=https://your-api-url-provide-by-gcloud-run.run.app
```

If you choice to deploy the api on local, , you have to add a .env file at the root of your project with the following

```bash
VITE_REACT_APP_API_URL=localhost:8080/
```

You can access to the web app local on [http://localhost](http://localhost)

You can access the API documentation and try and better understand the data needed

## How work this api

This api FASTAPI can be used to interact with a model of prediction

For this, the api use an ydf model of prediction

With property details and location information, the model can predict price of a product

For more details about the api and the model go to the README.md of the [API repo](https://github.com/Nic0ooo/PriceImmoPredictAPI.git)
