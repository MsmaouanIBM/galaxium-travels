from models import Base, User, Flight, Booking
from db import engine, SessionLocal
from datetime import datetime, timedelta
import random

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    # Clear existing data
    db.query(Booking).delete()
    db.query(User).delete()
    db.query(Flight).delete()
    db.commit()
    # Add demo users
    users = [
        User(name="Alice", email="alice@example.com"),
        User(name="Bob", email="bob@example.com"),
        User(name="Charlie", email="charlie@galaxium.com"),
        User(name="Diana", email="diana@moonmail.com"),
        User(name="Eve", email="eve@marsmail.com"),
        User(name="Frank", email="frank@venusmail.com"),
        User(name="Grace", email="grace@jupiter.com"),
        User(name="Heidi", email="heidi@europa.com"),
        User(name="Ivan", email="ivan@asteroidbelt.com"),
        User(name="Judy", email="judy@pluto.com"),
    ]
    db.add_all(users)
    db.commit()
    # Add demo flights with updated times to match screenshot
    flights = [
        Flight(origin="Earth", destination="Mars", departure_time="2099-01-01T14:30:00Z", arrival_time="2099-01-01T22:30:00Z", price=1000000, seats_available=17),
        Flight(origin="Earth", destination="Moon", departure_time="2099-01-02T08:00:00Z", arrival_time="2099-01-02T12:00:00Z", price=500000, seats_available=17),
        Flight(origin="Mars", destination="Earth", departure_time="2099-01-03T16:00:00Z", arrival_time="2099-01-04T00:00:00Z", price=950000, seats_available=17),
        Flight(origin="Venus", destination="Earth", departure_time="2099-01-04T10:30:00Z", arrival_time="2099-01-04T20:30:00Z", price=1200000, seats_available=17),
        Flight(origin="Jupiter", destination="Europa", departure_time="2099-01-05T18:00:00Z", arrival_time="2099-01-05T22:00:00Z", price=2000000, seats_available=17),
        Flight(origin="Earth", destination="Venus", departure_time="2099-01-06T09:15:00Z", arrival_time="2099-01-06T17:15:00Z", price=1100000, seats_available=17),
        Flight(origin="Moon", destination="Mars", departure_time="2099-01-07T13:45:00Z", arrival_time="2099-01-07T21:45:00Z", price=800000, seats_available=17),
        Flight(origin="Mars", destination="Jupiter", departure_time="2099-01-08T15:30:00Z", arrival_time="2099-01-09T01:30:00Z", price=2500000, seats_available=17),
        Flight(origin="Europa", destination="Earth", departure_time="2099-01-09T11:00:00Z", arrival_time="2099-01-09T23:00:00Z", price=3000000, seats_available=17),
        Flight(origin="Earth", destination="Pluto", departure_time="2099-01-10T07:00:00Z", arrival_time="2099-01-11T07:00:00Z", price=5000000, seats_available=17),
    ]
    db.add_all(flights)
    db.commit()
    # Add demo bookings
    user_ids = [user.user_id for user in db.query(User).all()]
    flight_ids = [flight.flight_id for flight in db.query(Flight).all()]
    statuses = ["booked", "cancelled", "completed"]
    bookings = []
    now = datetime.utcnow()
    for i in range(20):
        user_id = random.choice(user_ids)
        flight_id = random.choice(flight_ids)
        status = random.choice(statuses)
        booking_time = (now - timedelta(days=random.randint(0, 30), hours=random.randint(0, 23))).isoformat() + "Z"
        bookings.append(Booking(user_id=user_id, flight_id=flight_id, status=status, booking_time=booking_time))
    db.add_all(bookings)
    db.commit()
    db.close()
    print("Database seeded with elaborate demo data!")

if __name__ == "__main__":
    seed() 