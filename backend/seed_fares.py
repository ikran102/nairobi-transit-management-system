from app import create_app, db
from app.models import Fare

app = create_app()

with app.app_context():

    Fare.query.delete()
    db.session.commit()

    fares = [
        Fare(route_id=1, min_fare=50, max_fare=80, time_of_day="Peak"),
        Fare(route_id=2, min_fare=100, max_fare=150, time_of_day="Peak"),
        Fare(route_id=3, min_fare=70, max_fare=100, time_of_day="Peak"),
        Fare(route_id=4, min_fare=80, max_fare=120, time_of_day="Peak"),
        Fare(route_id=5, min_fare=70, max_fare=100, time_of_day="Peak"),
        Fare(route_id=6, min_fare=90, max_fare=120, time_of_day="Peak"),
        Fare(route_id=7, min_fare=150, max_fare=200, time_of_day="Peak"),
    ]

    db.session.add_all(fares)
    db.session.commit()

    print("✅ Fares added successfully!")