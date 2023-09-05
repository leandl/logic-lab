from flask import Flask
from flask.json import JSONEncoder
from werkzeug.exceptions import (
    BadRequest,
    InternalServerError,
    NotFound,
    ServiceUnavailable,
    Unauthorized,
    NotImplemented,
    PreconditionFailed,
    Forbidden
)

from datetime import datetime, date, time

class CustomJONEncoder(JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, (datetime, date, time)):
                return obj.isoformat()
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)


def create_app(debug=False):
    app = Flask(__name__)
    app.debug = debug

    app.json_encoder = CustomJONEncoder

    from app.controller.generate_file import generate_file_bp

    app.register_blueprint(generate_file_bp)

    return app
