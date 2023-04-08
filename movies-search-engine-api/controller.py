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
    # read the movie data from movies.json file
    with open('./data/movie_average_rating.json', 'r') as f:
        movies = json.load(f)

    # get the pagination parameters from the query string
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)

    # apply pagination to the movie data
    start_index = (page - 1) * limit
    end_index = start_index + limit
    movies = list(movies.values())[start_index:end_index]

    # get the filter parameters from the query string
    filter_by_genre = request.args.get('filter_by_genre')
    filter_by_year = request.args.get('filter_by_year', type=int)
    filter_by_rating = request.args.get('filter_by_rating', type=float)

    # apply filters to the movie data
    if filter_by_genre:
        movies = [movie for movie in movies if filter_by_genre in movie.get('genre', [])]

    if filter_by_year:
        movies = [movie for movie in movies if movie.get('year') == filter_by_year]

    if filter_by_rating:
        movies = [movie for movie in movies if movie.get('average_rating') >= filter_by_rating]

    # extract only the required fields from the movie data
    result = [{'name': name, **movie} for name, movie in new_movie_data.items() if movie in movies]
    return  jsonify(result)

if __name__ == '__main__':
    app.run(debug=True) 
