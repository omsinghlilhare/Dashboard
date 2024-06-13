from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

# Replace with your actual OpenWeatherMap API key
OPENWEATHER_API_KEY = '1a21b04c6ce6f4696da0ca42e5f90fa2'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather/current')
def current_weather():
    url = f'https://api.openweathermap.org/data/2.5/weather?q=Raipur,IN&appid={OPENWEATHER_API_KEY}'
    response = requests.get(url)
    return jsonify(response.json())

@app.route('/weather/forecast')
def weather_forecast():
    url = f'https://api.openweathermap.org/data/2.5/forecast?q=Raipur,IN&appid={OPENWEATHER_API_KEY}'
    response = requests.get(url)
    return jsonify(response.json())

@app.route('/air_quality')
def air_quality():
    url = f'http://api.openweathermap.org/data/2.5/air_pollution?lat=21.2514&lon=81.6296&appid={OPENWEATHER_API_KEY}'
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
