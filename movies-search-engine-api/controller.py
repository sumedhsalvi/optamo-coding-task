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

# Load user data
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
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return jsonify({'error': 'Authentication failed'}), 401

    username = auth.username
    password = auth.password

    if username in user_data and hashlib.sha256(password.encode()).hexdigest() == user_data[username]:
        # Generate a JWT if the authentication is successful
        payload = {
            'sub': username,
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
    genres = request.args.get('genres')
    min_rating = request.args.get('averageRating')
    year_range = request.args.get('yearRange')

    # filter the movies based on the query parameters
    filtered_movies = []
    for name, movie in new_movie_data.items():
        # if genres and genres not in movie['genre']:
        #     continue
        # if min_rating and movie['average_rating'] < float(min_rating):
        #     continue
        if year_range:
            start_year, end_year = map(int, year_range.split(','))
        #     if movie_year) < start_year or movie_year) > end_year:
        #         continue

        if movie['year'] and movie['year'].isnumeric():
            movie_year = int(movie['year'])
        else:
            movie_year = 0


        # Check if the movie satisfies all three conditions
        if genres and min_rating and year_range:
            if genres in movie['genre'] and movie['average_rating'] >= float(min_rating) and start_year <= movie_year <= end_year:
                filtered_movies.append({'name': name, **movie})
        # Otherwise, if there are only two conditions, check if they are satisfied
        elif genres and min_rating:
            if genres in movie['genre'] and movie['average_rating'] >= float(min_rating):
                filtered_movies.append({'name': name, **movie})
        elif genres and year_range:
            if genres in movie['genre'] and start_year <= movie_year <= end_year:
                filtered_movies.append({'name': name, **movie})
        elif min_rating and year_range:
            if movie['average_rating'] >= float(min_rating) and start_year <= movie_year <= end_year:
                filtered_movies.append({'name': name, **movie})
        # If only one condition is provided, simply add the movie to the list
        else:
            filtered_movies.append({'name': name, **movie})

    # return the filtered movies as a JSON response
    return jsonify(filtered_movies)

if __name__ == '__main__':
    app.run(debug=True) 
