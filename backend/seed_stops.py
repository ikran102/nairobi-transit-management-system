from app import create_app, db
from app.models import Stop

app = create_app()

with app.app_context():

    print("Deleting old stops...")

    Stop.query.delete()
    db.session.commit()

    stops = [

        # ==========================
        # Route 1 - CBD → Westlands
        # ==========================
        Stop(route_id=1, name="Railways", latitude=-1.2864, longitude=36.8245, sequence=1),
        Stop(route_id=1, name="Kencom", latitude=-1.2847, longitude=36.8260, sequence=2),
        Stop(route_id=1, name="Museum Hill", latitude=-1.2720, longitude=36.8145, sequence=3),
        Stop(route_id=1, name="Chiromo", latitude=-1.2680, longitude=36.8090, sequence=4),
        Stop(route_id=1, name="Westlands", latitude=-1.2675, longitude=36.8085, sequence=5),

        # ==========================
        # Route 2 - CBD → Ngong
        # ==========================
        Stop(route_id=2, name="Railways", latitude=-1.2864, longitude=36.8245, sequence=1),
        Stop(route_id=2, name="Kenyatta Market", latitude=-1.3015, longitude=36.7856, sequence=2),
        Stop(route_id=2, name="Dagoretti Corner", latitude=-1.3115, longitude=36.7480, sequence=3),
        Stop(route_id=2, name="Bulbul", latitude=-1.3360, longitude=36.6840, sequence=4),
        Stop(route_id=2, name="Ngong Town", latitude=-1.3592, longitude=36.6566, sequence=5),

        # ==========================
        # Route 3 - CBD → Kawangware
        # ==========================
        Stop(route_id=3, name="Railways", latitude=-1.2864, longitude=36.8245, sequence=1),
        Stop(route_id=3, name="University Way", latitude=-1.2790, longitude=36.8175, sequence=2),
        Stop(route_id=3, name="Kangemi", latitude=-1.2695, longitude=36.7425, sequence=3),
        Stop(route_id=3, name="Riruta", latitude=-1.2895, longitude=36.7515, sequence=4),
        Stop(route_id=3, name="Kawangware", latitude=-1.2858, longitude=36.7564, sequence=5),

        # ==========================
        # Route 4 - CBD → Roysambu
        # ==========================
        Stop(route_id=4, name="Railways", latitude=-1.2864, longitude=36.8245, sequence=1),
        Stop(route_id=4, name="Pangani", latitude=-1.2724, longitude=36.8433, sequence=2),
        Stop(route_id=4, name="Muthaiga", latitude=-1.2445, longitude=36.8350, sequence=3),
        Stop(route_id=4, name="Kasarani", latitude=-1.2200, longitude=36.8940, sequence=4),
        Stop(route_id=4, name="Roysambu", latitude=-1.2215, longitude=36.8795, sequence=5),

        # ==========================
        # Route 5 - CBD → Embakasi
        # ==========================
        Stop(route_id=5, name="Railways", latitude=-1.2864, longitude=36.8245, sequence=1),
        Stop(route_id=5, name="Nyayo Stadium", latitude=-1.3040, longitude=36.8255, sequence=2),
        Stop(route_id=5, name="South B", latitude=-1.3095, longitude=36.8470, sequence=3),
        Stop(route_id=5, name="Pipeline", latitude=-1.3160, longitude=36.9075, sequence=4),
        Stop(route_id=5, name="Embakasi", latitude=-1.3233, longitude=36.9144, sequence=5),

        # ==========================
        # Route 6 - CBD → Rongai
        # ==========================
        Stop(route_id=6, name="Railways", latitude=-1.2864, longitude=36.8245, sequence=1),
        Stop(route_id=6, name="Nyayo Stadium", latitude=-1.3040, longitude=36.8255, sequence=2),
        Stop(route_id=6, name="Langata", latitude=-1.3440, longitude=36.7570, sequence=3),
        Stop(route_id=6, name="Bomas", latitude=-1.3735, longitude=36.7480, sequence=4),
        Stop(route_id=6, name="Rongai", latitude=-1.3964, longitude=36.7411, sequence=5),

        # ==========================
        # Route 7 - CBD → Thika
        # ==========================
        Stop(route_id=7, name="Railways", latitude=-1.2864, longitude=36.8245, sequence=1),
        Stop(route_id=7, name="Pangani", latitude=-1.2724, longitude=36.8433, sequence=2),
        Stop(route_id=7, name="Kasarani", latitude=-1.2200, longitude=36.8940, sequence=3),
        Stop(route_id=7, name="Ruiru", latitude=-1.1450, longitude=36.9600, sequence=4),
        Stop(route_id=7, name="Thika", latitude=-1.0333, longitude=37.0692, sequence=5),
    ]

    db.session.add_all(stops)
    db.session.commit()

    print(f"✅ Added {len(stops)} stops successfully!")