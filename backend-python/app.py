from flask import Flask, jsonify
from flask_cors import CORS 
import json

app = Flask(__name__)
CORS(app) 

def load_profiles():
    with open('profiles.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/api/profiles', methods=['GET'])
def get_all_profiles():
    profiles = load_profiles()
    return jsonify(profiles)

@app.route('/api/profile/<int:profile_id>', methods=['GET'])
def get_profile_by_id(profile_id):
    profiles = load_profiles()
    profile = next((p for p in profiles if p['id'] == profile_id), None)

    if profile:
        return jsonify(profile)
    else:
        return jsonify({"error": "Profile not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)