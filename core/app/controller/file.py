from flask import Blueprint, request
from wvalidate import Validate as v

from ..common.utils import formater_response
from ..entities.config import Config

from ..entities.generator_file.generator_python_file import GeneratorPythonFile

file_bp = Blueprint('file', __name__)


validator_type = v.enum([
    "INTEGER",
    "FLOAT",
    "STRING",
    "BOOLEAN",
    "INTEGER-ARRAY",
    "FLOAT-ARRAY",
    "STRING-ARRAY",
    "BOOLEAN-ARRAY",
])

validator_param = v.dict({
    "name": v.string(min=3),
    "type": validator_type,
    "description": v.string(min=10)
})

validator_data_file = v.dict({
    "name": v.string(min=3),
    "description":  v.string(min=10),
    "type-result": validator_type,
    "description-result":  v.string(min=10),
    "params": v.list(validator_param)
})


generators = {
  'python': GeneratorPythonFile
}

@file_bp.post("/generate-file")
def generate_file():
    data = request.json
    is_valid, errors = validator_data_file.is_valid(data)

    if not is_valid:
        return formater_response(
            400,
            [error.values() for error in errors]
        )

    lang = "python"
    GeneratorFile = generators[lang]
    generator_file = GeneratorFile(Config.path["TEMPLATES"])
    file_content = generator_file.generate(data)

    return formater_response(200, {
        "file_content": file_content
    })



@file_bp.post("/")
def validate_exercise():
    return formater_response(200, { "ok": "ok"})
