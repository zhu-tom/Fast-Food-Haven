from flask import Flask, render_template, request, jsonify
from findDeals import findDeals, goToRests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.php')

@app.route('/getDeals', methods=['POST'])
def getDeals():
    data = request.get_json()
    restaurants = data['restaurants']
    return jsonify(goToRests(restaurants))

if __name__ == '__main__':
    app.run(debug=True)