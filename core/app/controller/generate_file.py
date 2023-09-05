from flask import Blueprint

generate_file_bp = Blueprint('generate-file', __name__)

@generate_file_bp.post("/")
def generate_file():
    pass
