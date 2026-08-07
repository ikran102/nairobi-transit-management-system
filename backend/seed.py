from app import create_app, db
from app.models import Route, Fare

app = create_app()

with app.app_context():

    print("Deleting old routes...")

    Fare.query.delete()
    Route.query.delete()

    db.session.commit()

    routes = [
    Route(
        name="CBD → Westlands Express",
        origin="CBD",
        destination="Westlands",
        operating_hours="05:00 AM - 11:00 PM",
        verified=True,
    ),

    Route(
        name="CBD → Ngong Town",
        origin="CBD",
        destination="Ngong",
        operating_hours="05:00 AM - 10:30 PM",
        verified=True,
    ),

    Route(
        name="CBD → Kawangware",
        origin="CBD",
        destination="Kawangware",
        operating_hours="05:00 AM - 10:30 PM",
        verified=True,
    ),

    Route(
        name="CBD → Roysambu (USIU)",
        origin="CBD",
        destination="Roysambu",
        operating_hours="05:00 AM - 11:00 PM",
        verified=True,
    ),

    Route(
        name="CBD → Embakasi",
        origin="CBD",
        destination="Embakasi",
        operating_hours="05:00 AM - 11:00 PM",
        verified=True,
    ),

    Route(
        name="CBD → Rongai",
        origin="CBD",
        destination="Rongai",
        operating_hours="05:00 AM - 10:30 PM",
        verified=True,
    ),

    Route(
        name="CBD → Thika Superhighway",
        origin="CBD",
        destination="Thika",
        operating_hours="04:30 AM - 10:00 PM",
        verified=True,
    ),
]

    db.session.add_all(routes)
    db.session.commit()

    print(f"✅ {len(routes)} routes added successfully!")