from flask import Flask, jsonify
import deezer

app = Flask(__name__)
client = deezer.Client(headers={'Accept-Language': 'fr'})

@app.route('/music', methods=['GET'])
def get_music():
    track = client.get_track(3135556)  # Exemple avec un track ID Deezer
    return jsonify({
        'title': track.title,
        'artist': track.artist.name,
        'preview': track.preview  # Lien vers un extrait
    })

if __name__ == '__main__':
    app.run(debug=True)
