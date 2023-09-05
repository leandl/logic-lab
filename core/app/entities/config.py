from os import path, getcwd, pardir

current_dirname = path.abspath(path.join(__file__, pardir))
root_dirname = path.abspath(path.join(current_dirname, pardir))
root_dirname_project_validator = path.abspath(path.join(root_dirname, pardir))
templates_dirname = path.join(root_dirname, "templates")
exam_dirname = path.join(root_dirname_project_validator, "exam")

path_file_json_data = path.join(root_dirname_project_validator, "data.json")

class Config:
  path = {
    "ROOT": root_dirname,
    "TEMPLATES": templates_dirname
  }
