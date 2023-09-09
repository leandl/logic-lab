from flask import Blueprint, request
from wvalidate import Validate as v
from os import path
import sys
import subprocess
import json

from ..common.utils import formater_response
from ..entities.config import Config
from ..validators.validator_list_by_item import ValidatorListByItem
from ..entities.generator_file.generator_python_file import GeneratorPythonFile
from ..entities.execute_file.execute_python_file import ExecutePythonFile

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

executes = {
  'python': ExecutePythonFile
}

sandboxes = {
    'python': path.join(Config.path["SANDBOXES"], "python_sandbox.py")
}


validatos = {
    "INTEGER": v.integer(),
    "FLOAT": v.float(),
    "STRING": v.string(),
    "BOOLEAN": v.enum([True, False]),
    "INTEGER-ARRAY": v.list(v.integer()),
    "FLOAT-ARRAY": v.list(v.float()),
    "STRING-ARRAY": v.list(v.string()),
    "BOOLEAN-ARRAY": v.list(v.enum([True, False]))
}


@file_bp.post("/generate-file")
def generate_file():
    data = request.json
    is_valid, errors = validator_data_file.is_valid(data)

    if not is_valid:
        return formater_response(400, [error.values() for error in errors])

    lang = "python"
    GeneratorFile = generators[lang]
    generator_file = GeneratorFile()
    file_content = generator_file.generate(data)

    return formater_response(200, {
        "file_content": file_content
    })


validator_data_execute_file = v.dict({
    "code": v.string(min=30),
    "type-result": validator_type,
    "params": v.list(validator_type)
})

@file_bp.post("/")
def validate_exercise():
    data = request.json
    is_valid, errors = validator_data_execute_file.is_valid(data)

    if not is_valid:
        return formater_response(400, [error.values() for error in errors])

    type_result = data.get("type-result")
    params = data.get("params")
    validator_tests = v.dict({ 
        "tests": v.list(v.dict({
            "args": ValidatorListByItem([ validatos[param] for param in params ]),
            "result": validatos[type_result]
        }))
    })

    is_valid, errors = validator_tests.is_valid(data)
    if not is_valid:
        return formater_response(400, [error.values() for error in errors])


    code_raw = data.get("code")
    tests = data.get("tests")

    lang = "python"

    ExecuteFile = executes[lang]
    execute_file = ExecuteFile()
    code = execute_file.generate(code_raw)

    sandbox = sandboxes[lang]

    proc = subprocess.Popen(
        [sys.executable, sandbox, "question", code, json.dumps(tests)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    extra = ""
    try:
        stdout, stderr = proc.communicate(timeout=2)
    except subprocess.TimeoutExpired:
        extra = "process timed out"
        proc.kill()
        stdout, stderr = proc.communicate()

    result_success = stdout.decode().strip().split("\n")[-1]
    return formater_response(200, {
        "success": json.loads(result_success) if result_success else result_success,
        "error": stderr.decode(),
        "extra": extra
    })
