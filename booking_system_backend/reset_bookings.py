import sqlite3

conn = sqlite3.connect('booking.db')
cursor = conn.cursor()

# Delete from bookings table (plural)
result = cursor.execute('DELETE FROM bookings')
conn.commit()
print(f'Deleted {cursor.rowcount} bookings')
conn.close()

# Made with Bob
