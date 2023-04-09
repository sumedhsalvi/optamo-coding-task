from flask import Flask, jsonify, request
import json
import hashlib
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
cors = CORS(app)

# Load movie data
with open('./data/movie_average_rating.json', 'r') as f:
    movies = json.load(f)

# Load user data from user.json file
with open('./data/user.json', 'r') as f:
    user_data = json.load(f)

# Convert movie data to new format
new_movie_data = {}
for movie_name, movie_info in movies.items():
    new_movie_data[movie_name] = {
        'year': movie_info['year'],
        'genre': movie_info['genre'],
        'average_rating': movie_info['average_rating']
    }

# Set the JWT secret key and expiration time
JWT_SECRET_KEY = 'my-secret-key'
JWT_EXPIRATION_TIME = timedelta(hours=1)

@app.route('/login', methods=['POST'])
def login():
    """
    Authenticates a user and generates a JSON Web Token (JWT) if the authentication is successful.
    Returns:
        A JSON response containing a JWT if the authentication is successful, or an error message if the authentication fails.
    """    
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return jsonify({'error': 'Authentication failed'}), 401

    username = auth.username
    password = auth.password

    if username in user_data and hashlib.sha256(password.encode()).hexdigest() == user_data[username]['password_hash']:
        # Generate a JWT if the authentication is successful
        payload = {
            'sub': username,
            'first_name': user_data[username]['first_name'],
            'last_name': user_data[username]['last_name'],
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + JWT_EXPIRATION_TIME
        }
        jwt_token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')

        # Return the JWT token in the response
        return jsonify({'token': jwt_token}), 200
    else:
        return jsonify({'error': 'Authentication failed'}), 401


@app.route('/movies', methods=['GET'])
def get_movies():
    """
    Returns a list of movies based on query parameters passed in the request URL.
    Query Parameters:
        genres (str): A comma-separated list of movie genres to filter by.
        averageRating (float): The minimum average rating a movie must have to be included in the results.
        yearRange (str): A range of years to filter by, in the format "start_year,end_year".
    Returns:
        A JSON response containing a list of movies that satisfy the query parameters.
    """    
    genres = request.args.get('genres')
    min_rating = request.args.get('averageRating')
    year_range = request.args.get('yearRange')

    # filter the movies based on the query parameters
    filtered_movies = []
    for name, movie in new_movie_data.items():
        if year_range:
            start_year, end_year = map(int, year_range.split(','))

        # Check if the movie satisfies all three conditions
        if genres and min_rating and year_range:
            if genres in movie['genre'] and movie['average_rating'] >= float(min_rating) and start_year <= movie['year'] <= end_year:
                filtered_movies.append({'name': name, **movie})
        # Otherwise, if there are only two conditions, check if they are satisfied
        elif genres and min_rating:
            if genres in movie['genre'] and movie['average_rating'] >= float(min_rating):
                filtered_movies.append({'name': name, **movie})
        elif genres and year_range:
            if genres in movie['genre'] and start_year <= movie['year'] <= end_year:
                filtered_movies.append({'name': name, **movie})
        elif min_rating and year_range:
            if movie['average_rating'] >= float(min_rating) and start_year <= movie['year'] <= end_year:
                filtered_movies.append({'name': name, **movie})
        # If only one condition is provided, simply add the movie to the list
        elif genres:
            if genres in movie['genre']:
                filtered_movies.append({'name': name, **movie})
        elif min_rating:
            if movie['average_rating'] >= float(min_rating):
                filtered_movies.append({'name': name, **movie})
        elif year_range:
            if start_year <= movie['year'] <= end_year:
                filtered_movies.append({'name': name, **movie})
        else:
            filtered_movies.append({'name': name, **movie})

    # return the filtered movies as a JSON response
    return jsonify(filtered_movies)

if __name__ == '__main__':
    app.run(debug=True) 
