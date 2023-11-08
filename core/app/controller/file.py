from flask import Blueprint, request
from werkzeug.exceptions import NotImplemented
from wvalidate import Validate as v

from os import path
import sys
import subprocess
import json

from ..common.utils import formater_response
from ..entities.config import Config
from ..validators import validator_data_file, validator_data_execute_file, validator_lang, get_validator_tests
from ..entities.generator_file.generator_python_file import GeneratorPythonFile
from ..entities.execute_file.execute_python_file import ExecutePythonFile

file_bp = Blueprint('file', __name__)


file_generators = {
  'python': GeneratorPythonFile
}

generate_content_to_be_executed = {
  'python': ExecutePythonFile
}

sandboxes = {
    'python': path.join(Config.path["SANDBOXES"], "python", "python_sandbox.py")
}

executables = {
    "python": sys.executable
}



@file_bp.post("/generate-file/<lang>")
def generate_file(lang):
    if not validator_lang.is_valid(lang):
        raise NotImplemented(f'language "{lang}" not implemented')

    data = request.json
    is_valid, errors = validator_data_file.is_valid(data)

    if not is_valid:
        return formater_response(400, [error.values() for error in errors])

    
    GeneratorFile = file_generators[lang]
    generator_file = GeneratorFile()
    file_content = generator_file.generate(data)

    return formater_response(200, {
        "file_content": file_content
    })



@file_bp.post("/validate-exercise/<lang>")
def validate_exercise(lang):
    if not validator_lang.is_valid(lang):
        raise NotImplemented(f'language "{lang}" not implemented')

    data = request.json
    is_valid, errors = validator_data_execute_file.is_valid(data)

    if not is_valid:
        return formater_response(400, [error.values() for error in errors])

    type_result = data.get("type-result")
    params = data.get("params")
    validator_tests = get_validator_tests(params, type_result)

    is_valid, errors = validator_tests.is_valid(data)
    if not is_valid:
        return formater_response(400, [error.values() for error in errors])


    code_raw = data.get("code")
    tests = data.get("tests")

    ExecuteFile = generate_content_to_be_executed[lang]
    execute_file = ExecuteFile()
    code = execute_file.generate(code_raw)

    sandbox = sandboxes[lang]
    executable = executables[lang]

    proc = subprocess.Popen(
        [executable, sandbox, "question", code, json.dumps(tests)],
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
        "success": json.loads(result_success) if result_success else None,
        "error": stderr.decode() if stderr.decode() else None,
        "extra": extra if extra else None
    })
