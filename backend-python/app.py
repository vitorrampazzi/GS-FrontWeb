import os
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def load_profiles():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    json_path = os.path.join(script_dir, 'profiles.json')
    
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"ERRO: Arquivo 'profiles.json' não encontrado em {json_path}")
        return []
    except json.JSONDecodeError:
        print(f"ERRO: Falha ao decodificar o 'profiles.json'. Verifique se é um JSON válido.")
        return []
    except Exception as e:
        print(f"Um erro inesperado ocorreu: {e}")
        return []

@app.route('/api/profiles')
def get_all_profiles():
    profiles_data = load_profiles()
    if not profiles_data:
        return jsonify({"error": "Não foi possível carregar os perfis"}), 500
    return jsonify(profiles_data)

@app.route('/api/profile/<int:id>')
def get_profile_by_id(id):
    profiles_data = load_profiles()
    
    profile = next((p for p in profiles_data if p.get('id') == id), None)
    
    if profile:
        return jsonify(profile)
    else:
        return jsonify({"error": "Perfil não encontrado"}), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)