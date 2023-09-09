from flask import Flask
from flask_cors import CORS
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

from app.common.utils import formater_response

def create_app(debug=False):
    app = Flask(__name__)
    CORS(app)
    app.debug = debug

    app.register_error_handler(ServiceUnavailable, service_unavailable)
    app.register_error_handler(BadRequest, bad_request)
    app.register_error_handler(Forbidden, forbidden)
    app.register_error_handler(NotFound, not_found)
    app.register_error_handler(PreconditionFailed, precondition_failed)
    app.register_error_handler(Unauthorized, unauthorized)
    app.register_error_handler(InternalServerError, internal_server_error)
    app.register_error_handler(NotImplemented, internal_server_error)

    from app.controller.file import file_bp
    app.register_blueprint(file_bp)

    return app



def service_unavailable(e):
    return formater_response(
        code=503,
        message= f'{e}'
    ) 

def bad_request(e):
    return formater_response(
        code=400,
        message= f'{e}'
    )

def forbidden(e):
    return formater_response(
        code=403,
        message=f'{e}'
    )

def not_found(e):
    return formater_response(
        code=404,
        message= f'{e}'
    )


def precondition_failed(e):
    return formater_response(
        code=412,
        message= f'{e}'
    )

def unauthorized(e):
    return formater_response(
        code=401,
        message=f'{e}'
    )

def internal_server_error():
    return formater_response(
        code=500,
        message="Ocorreu um erro no servidor!"
    )

