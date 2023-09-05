from flask import make_response, jsonify


def formater_response(code=400, message=None):
    if message is None:
        code = 501
        message = "Ocorreu um erro interno."
    elif type(message) is str:
        message = { "message": message }

    res = make_response( jsonify(message), code, )
    res.headers["Content-Type"] = "application/json"
    return res
