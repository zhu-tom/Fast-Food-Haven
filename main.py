from flask import Flask, render_template, request, jsonify
from findDeals import findDeals, goToRests
from findNearest import findNearest

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.php')

@app.route('/getDeals', methods=['POST'])
def getDeals():
    restaurants = ['A & W', 'McDonalds', 'Harveys', 'KFC']
    return jsonify(goToRests(restaurants))

@app.route('/getNearest', methods=['POST'])
def getNearest():
    data = request.get_json()
    lat = data['lat']
    lon = data['lon']
    result = {}
    for restaurant in ['AW', 'McDonalds', 'Harveys', 'KFC']:
        result[restaurant] = findNearest(lat, lon, restaurant)

    return jsonify(result)
        
if __name__ == '__main__':
    app.run(debug=True)