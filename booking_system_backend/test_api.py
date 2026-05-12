from server import app
from fastapi.testclient import TestClient

client = TestClient(app)
response = client.get('/flights')
flights = response.json()
mars_earth = [f for f in flights if f['origin'] == 'Mars' and f['destination'] == 'Earth'][0]
print(f"API Response - Mars->Earth:")
print(f"Departure: {mars_earth['departure_time']}")
print(f"Arrival: {mars_earth['arrival_time']}")

# Made with Bob
