"""
Core API endpoints: searching routes, viewing route details, creating routes,
creating stops, and submitting crowdsourced corrections.

All endpoints are prefixed with /api (see app/__init__.py).
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from app.models import Route, Stop, Fare, Submission

bp = Blueprint("routes", __name__)


# ==========================
# GET ALL ROUTES / SEARCH
# ==========================

@bp.route("/routes", methods=["GET"])
def search_routes():
    """
    Search routes by origin, destination or route name.
    Returns all routes if no query is provided.
    """
    query = request.args.get("query", "").strip().lower()
    routes_query = Route.query

    if query:
        routes_query = routes_query.filter(
            db.or_(
                Route.origin.ilike(f"%{query}%"),
                Route.destination.ilike(f"%{query}%"),
                Route.name.ilike(f"%{query}%"),
            )
        )

    routes = routes_query.all()
    return jsonify([_route_to_dict(route) for route in routes]), 200


# ==========================
# CREATE ROUTE
# ==========================

@bp.route("/routes", methods=["POST"])
def create_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ["name", "origin", "destination", "operating_hours"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    route = Route(
        name=data["name"],
        origin=data["origin"],
        destination=data["destination"],
        operating_hours=data["operating_hours"],
        verified=data.get("verified", False),
    )

    db.session.add(route)
    db.session.commit()

    return jsonify({
        "message": "Route created successfully",
        "route": _route_to_dict(route)
    }), 201


# ==========================
# GET SINGLE ROUTE
# ==========================

@bp.route("/routes/<int:route_id>", methods=["GET"])
def get_route(route_id):
    route = Route.query.get_or_404(route_id)
    return jsonify(_route_to_dict(route, include_stops=True)), 200


# ==========================
# UPDATE ROUTE
# ==========================

@bp.route("/routes/<int:route_id>", methods=["PUT"])
def update_route(route_id):
    route = Route.query.get_or_404(route_id)
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    route.name = data.get("name", route.name)
    route.origin = data.get("origin", route.origin)
    route.destination = data.get("destination", route.destination)
    route.operating_hours = data.get("operating_hours", route.operating_hours)
    route.verified = data.get("verified", route.verified)

    db.session.commit()

    return jsonify({
        "message": "Route updated successfully",
        "route": _route_to_dict(route)
    }), 200


# ==========================
# DELETE ROUTE
# ==========================

@bp.route("/routes/<int:route_id>", methods=["DELETE"])
def delete_route(route_id):
    route = Route.query.get_or_404(route_id)

    Fare.query.filter_by(route_id=route.id).delete()
    Stop.query.filter_by(route_id=route.id).delete()
    db.session.delete(route)
    db.session.commit()

    return jsonify({"message": "Route deleted successfully"}), 200


# ==========================
# GET ALL STOPS
# ==========================

@bp.route("/stops", methods=["GET"])
def get_stops():
    stops = Stop.query.order_by(Stop.sequence).all()
    return jsonify([_stop_to_dict(stop) for stop in stops]), 200


# ==========================
# CREATE STOP
# ==========================

@bp.route("/stops", methods=["POST"])
def create_stop():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ["route_id", "name", "latitude", "longitude", "sequence"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    route = Route.query.get(data["route_id"])
    if not route:
        return jsonify({"error": "Route not found"}), 404

    stop = Stop(
        route_id=data["route_id"],
        name=data["name"],
        latitude=data["latitude"],
        longitude=data["longitude"],
        sequence=data["sequence"],
    )

    db.session.add(stop)
    db.session.commit()

    return jsonify({
        "message": "Stop created successfully",
        "stop": _stop_to_dict(stop)
    }), 201
# ==========================
# GET ALL FARES
# ==========================

@bp.route("/fares", methods=["GET"])
def get_fares():
    fares = Fare.query.all()

    return jsonify([
        {
            "id": fare.id,
            "route_id": fare.route_id,
            "route_name": fare.route.name,
            "min_fare": fare.min_fare,
            "max_fare": fare.max_fare,
            "time_of_day": fare.time_of_day,
        }
        for fare in fares
    ]), 200


# ==========================
# CREATE FARE
# ==========================

@bp.route("/fares", methods=["POST"])
def create_fare():

    data = request.get_json()

    required = [
        "route_id",
        "min_fare",
        "max_fare",
        "time_of_day"
    ]

    for field in required:
        if field not in data:
            return jsonify({
                "error": f"{field} is required"
            }), 400

    fare = Fare(
        route_id=data["route_id"],
        min_fare=data["min_fare"],
        max_fare=data["max_fare"],
        time_of_day=data["time_of_day"]
    )

    db.session.add(fare)
    db.session.commit()

    return jsonify({
        "message": "Fare added successfully."
    }), 201


# ==========================
# DELETE FARE
# ==========================

@bp.route("/fares/<int:id>", methods=["DELETE"])
def delete_fare(id):

    fare = Fare.query.get_or_404(id)

    db.session.delete(fare)
    db.session.commit()

    return jsonify({
        "message": "Fare deleted successfully."
    }), 200


# ==========================
# DELETE STOP  ← NEW
# ==========================

@bp.route("/stops/<int:stop_id>", methods=["DELETE"])
def delete_stop(stop_id):
    stop = Stop.query.get_or_404(stop_id)
    db.session.delete(stop)
    db.session.commit()
    return jsonify({"message": "Stop deleted successfully"}), 200


# ==========================
# CREATE SUBMISSION
# ==========================

@bp.route("/submissions", methods=["POST"])
@jwt_required()
def create_submission():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or "submission_type" not in data or "payload" not in data:
        return jsonify({
            "error": "submission_type and payload are required"
        }), 400

    submission = Submission(
        user_id=user_id,
        submission_type=data["submission_type"],
        payload=data["payload"],
    )

    db.session.add(submission)
    db.session.commit()

    return jsonify({
        "message": "Submission received, pending review",
        "id": submission.id,
    }), 201


# ==========================
# LIST PENDING SUBMISSIONS
# ==========================

@bp.route("/admin/submissions", methods=["GET"])
@jwt_required()
def list_pending_submissions():
    pending = Submission.query.filter_by(status="pending").all()
    return jsonify([_submission_to_dict(s) for s in pending]), 200


# ==========================
# REVIEW SUBMISSION
# ==========================

@bp.route("/admin/submissions/<int:submission_id>/review", methods=["POST"])
@jwt_required()
def review_submission(submission_id):
    data = request.get_json()
    decision = data.get("decision") if data else None

    if decision not in ("approved", "rejected"):
        return jsonify({
            "error": "decision must be approved or rejected"
        }), 400

    submission = Submission.query.get_or_404(submission_id)
    submission.status = decision
    db.session.commit()

    return jsonify({"message": f"Submission {decision}"}), 200


# ==========================
# HELPERS
# ==========================

def _route_to_dict(route, include_stops=False):
    data = {
        "id": route.id,
        "name": route.name,
        "origin": route.origin,
        "destination": route.destination,
        "operating_hours": route.operating_hours,
        "verified": route.verified,
        "fares": [
            {
                "min_fare": fare.min_fare,
                "max_fare": fare.max_fare,
                "time_of_day": fare.time_of_day,
            }
            for fare in route.fares
        ],
    }

    if include_stops:
        data["stops"] = [
            _stop_to_dict(stop) for stop in route.stops
        ]

    return data


def _stop_to_dict(stop):
    return {
        "id": stop.id,
        "route_id": stop.route_id,
        "name": stop.name,
        "latitude": stop.latitude,
        "longitude": stop.longitude,
        "sequence": stop.sequence,
    }


def _submission_to_dict(submission):
    return {
        "id": submission.id,
        "user_id": submission.user_id,
        "submission_type": submission.submission_type,
        "payload": submission.payload,
        "status": submission.status,
        "created_at": submission.created_at.isoformat(),
    }
