from flask import Flask, request, jsonify
import requests
from secret import openweather_api_key
from service import extract_weather_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return "Welcome to the Weather App!"  


# endpoint that is used for today's weather 
@app.route('/get_weather')
def get_weather():
    location = request.args.get('location')
    if location:
        url = f'http://api.openweathermap.org/data/2.5/weather?q={location}&appid={openweather_api_key}&units=metric'
        response = requests.get(url)
        data = response.json()
        return jsonify(data)
    else:
        return jsonify(error='Location not provided'), 400
    

# endpoint that is used for few day forecast 
@app.route('/get_weather_forecast')
def get_weather_forecast():
    location = request.args.get('location')
    if location:
        url = f'http://api.openweathermap.org/data/2.5/forecast?q={location}&appid={openweather_api_key}&units=metric'
        response = requests.get(url)
        data = response.json()

        # get weather info for nearest few days
        forecast = []
        print(data)
        for entry in data['list']:
            extracted_data = extract_weather_data(entry)
            forecast.append(extracted_data)

        return jsonify(forecast)
    else:
        return jsonify(error='Location not provided'), 400


if __name__ == '__main__':
    app.run(debug=True)


