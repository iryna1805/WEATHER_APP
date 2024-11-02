def extract_weather_data(weather_data):
    main = weather_data['main']
    
    extracted_data = {
        'temp': main['temp'],
        'feels_like': main['feels_like'],
        'temp_min': main['temp_min'],
        'temp_max': main['temp_max'],
        'weather_main': weather_data['weather'][0]['main'],
        'weather_description': weather_data['weather'][0]['description'],
        'wind_speed': weather_data['wind']['speed'],
        'clouds': weather_data['clouds']['all'],
        'dt_txt': weather_data['dt_txt']
    }
    
    return extracted_data