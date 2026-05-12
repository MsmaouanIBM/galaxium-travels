"""
Migration script to add cancelled_at column to existing bookings table.
Run this script if you have an existing database with bookings.
For new databases, the column will be created automatically.
"""
import sqlite3
from pathlib import Path

def migrate():
    db_path = Path(__file__).parent / 'booking.db'
    
    if not db_path.exists():
        print("No existing database found. Column will be created automatically on first run.")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if column already exists
    cursor.execute("PRAGMA table_info(bookings)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if 'cancelled_at' in columns:
        print("Column 'cancelled_at' already exists. No migration needed.")
        conn.close()
        return
    
    # Add the column
    try:
        cursor.execute("ALTER TABLE bookings ADD COLUMN cancelled_at DATETIME")
        conn.commit()
        print("✓ Successfully added 'cancelled_at' column to bookings table")
    except sqlite3.Error as e:
        print(f"✗ Error adding column: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()

# Made with Bob
