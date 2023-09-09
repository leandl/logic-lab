from os import path

from ..config import Config
from .execute_file import ExecuteFile


class ExecutePythonFile(ExecuteFile):

  def __init__(self) -> None:
    path_template_javascript = path.join(Config.path["TEMPLATES"]["EXECUTE"], "python.template")
    super().__init__(path_template_javascript)

  
  def generate(self, def_question) -> str:
    new_file = self._template.replace("{def_question}", def_question)

    return new_file
