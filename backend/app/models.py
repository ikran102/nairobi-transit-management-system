"""
Database models for NairobiTransit.

Tables:
- User: registered contributors / admins
- Route: a matatu route (e.g. "Route 46 - CBD to Rongai")
- Stop: a stage/stop along a route, with lat/lng for the map
- Fare: a fare range tied to a route
- Submission: a pending crowdsourced correction/addition, reviewed by an admin
"""
from app import db
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    submissions = db.relationship("Submission", backref="submitted_by", lazy=True)


class Route(db.Model):
    __tablename__ = "routes"

    id = db.Column(db.Integer, primary_key=True)

    # Basic route information
    name = db.Column(db.String(120), nullable=False)
    origin = db.Column(db.String(120), nullable=False)
    destination = db.Column(db.String(120), nullable=False)
    operating_hours = db.Column(db.String(80), nullable=True)
    verified = db.Column(db.Boolean, default=False)

    # Map information
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)

    # Passenger information
    estimated_time = db.Column(db.String(50), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    stops = db.relationship(
        "Stop",
        backref="route",
        lazy=True,
        order_by="Stop.sequence"
    )

    fares = db.relationship(
        "Fare",
        backref="route",
        lazy=True
    )

class Stop(db.Model):
    __tablename__ = "stops"

    id = db.Column(db.Integer, primary_key=True)
    route_id = db.Column(db.Integer, db.ForeignKey("routes.id"), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    sequence = db.Column(db.Integer, nullable=False)  # order of stop along the route


class Fare(db.Model):
    __tablename__ = "fares"

    id = db.Column(db.Integer, primary_key=True)
    route_id = db.Column(db.Integer, db.ForeignKey("routes.id"), nullable=False)
    min_fare = db.Column(db.Float, nullable=False)   # in KES
    max_fare = db.Column(db.Float, nullable=False)   # in KES
    time_of_day = db.Column(db.String(40), nullable=True)  # e.g. "peak", "off-peak"
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)


class Submission(db.Model):
    """A crowdsourced correction or addition awaiting admin review."""
    __tablename__ = "submissions"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    submission_type = db.Column(db.String(40), nullable=False)  # "route" | "stop" | "fare"
    payload = db.Column(db.JSON, nullable=False)  # the proposed data, e.g. {"route_id":1,"min_fare":50}
    status = db.Column(db.String(20), default="pending")  # "pending" | "approved" | "rejected"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    reviewed_at = db.Column(db.DateTime, nullable=True)
