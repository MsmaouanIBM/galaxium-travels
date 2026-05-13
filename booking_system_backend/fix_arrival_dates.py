"""Script to fix overnight arrival dates in the database"""
from db import SessionLocal
from models import Flight

def fix_arrival_dates():
    db = SessionLocal()
    try:
        # Get all flights
        flights = db.query(Flight).all()
        
        print("\nCurrent flights in database:")
        for f in flights:
            print(f"{f.flight_id}: {f.origin} -> {f.destination}")
            print(f"   Departure: {f.departure_time}")
            print(f"   Arrival: {f.arrival_time}")
        
        # Fix Mars -> Earth (Flight ID 2)
        mars_earth = db.query(Flight).filter(
            Flight.origin == "Mars",
            Flight.destination == "Earth"
        ).first()
        
        if mars_earth:
            print(f"\nUpdating Mars -> Earth flight (ID: {mars_earth.flight_id}):")
            print(f"  Old departure: {mars_earth.departure_time}")
            print(f"  Old arrival: {mars_earth.arrival_time}")
            setattr(mars_earth, "departure_time", "2099-01-03T17:30:00")
            setattr(mars_earth, "arrival_time", "2099-01-04T01:30:00")
            print(f"  New departure: {mars_earth.departure_time}")
            print(f"  New arrival: {mars_earth.arrival_time}")
        
        # Fix Jupiter -> Europa (Flight ID 4)
        jupiter_europa = db.query(Flight).filter(
            Flight.origin == "Jupiter",
            Flight.destination == "Europa"
        ).first()
        
        if jupiter_europa:
            print(f"\nUpdating Jupiter -> Europa flight (ID: {jupiter_europa.flight_id}):")
            print(f"  Old departure: {jupiter_europa.departure_time}")
            print(f"  Old arrival: {jupiter_europa.arrival_time}")
            setattr(jupiter_europa, "departure_time", "2099-01-05T20:30:00")
            setattr(jupiter_europa, "arrival_time", "2099-01-06T00:30:00")
            print(f"  New departure: {jupiter_europa.departure_time}")
            print(f"  New arrival: {jupiter_europa.arrival_time}")
        
        db.commit()
        print("\n✓ Database updated successfully!")
        
        # Verify changes
        print("\nVerifying updated flights:")
        flights = db.query(Flight).all()
        for f in flights:
            print(f"{f.flight_id}: {f.origin} -> {f.destination}")
            print(f"   Departure: {f.departure_time}")
            print(f"   Arrival: {f.arrival_time}")
        
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_arrival_dates()

# Made with Bob
