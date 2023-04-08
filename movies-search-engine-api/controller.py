from flask import Flask, jsonify, request
import json
import hashlib

app = Flask(__name__)

# Load movie data
with open('movie_average_rating.json', 'r') as f:
    movie_data = json.load(f)

# Load user data
with open('user.json', 'r') as f:
    user_data = json.load(f)

# Convert movie data to new format
new_movie_data = {}
for movie_name, movie_info in movie_data.items():
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

@app.route('/ratings', methods=['GET'])
def get_ratings():
    movie_name = request.args.get('movie_name')

    if movie_name in new_movie_data:
        response_data = {
            'name': movie_name,
            'year': new_movie_data[movie_name]['year'],
            'genre': new_movie_data[movie_name]['genre'],
            'average_rating': new_movie_data[movie_name]['average_rating']
        }
        return jsonify(response_data)
    else:
        return jsonify({'error': 'Movie not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
