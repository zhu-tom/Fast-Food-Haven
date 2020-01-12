import requests

key = 'AIzaSyAO3n76BQcfMed4_XroJUVZEGINZbFzCQ4'

def findNearest(lat, lon, rest):
    url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&keyword={rest}&type=point_of_interest&radius=50000&opennow=true&key={key}'
    response = requests.get(url)
    print(url)
    if response.json()['status'] != "ZERO_RESULTS":
        return findDist(lat, lon, response.json()['results'][0]['place_id'])
    else:
        return None

def findDist(lat, lon, dest):
    url = f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={lat},{lon}&destinations=place_id:{dest}&key={key}'
    response = requests.get(url).json()
    response['destid'] = dest
    return response