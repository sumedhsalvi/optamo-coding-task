from flask import Flask, jsonify, request
import json
import hashlib
from flask_cors import CORS

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

@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return jsonify({'error': 'Authentication failed'}), 401

    username = auth.username
    password = auth.password

    print('username: ', username, ' password: ', password)
    print('userdata: ', user_data)
    if username in user_data and hashlib.sha256(password.encode()).hexdigest() == user_data[username]:
        return jsonify({'message': 'Authentication successful'}), 200
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
        if genres and genres not in movie['genre']:
            continue
        if min_rating and movie['average_rating'] < float(min_rating):
            continue
        if year_range:
            start_year, end_year = map(int, year_range.split(','))
            if int(movie['year']) < start_year or int(movie['year']) > end_year:
                continue
        filtered_movies.append({'name': name, **movie})

    # return the filtered movies as a JSON response
    return jsonify(filtered_movies)

if __name__ == '__main__':
    app.run(debug=True) 
