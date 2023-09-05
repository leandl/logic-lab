from flask import Blueprint

validate_exercise_bp = Blueprint('validate-exercise', __name__)


@validate_exercise_bp.post("/")
def validate_exercise():
    pass
