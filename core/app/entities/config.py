from os import path, pardir

current_dirname = path.abspath(path.join(__file__, pardir))
root_dirname = path.abspath(path.join(current_dirname, pardir))
root_dirname_project_validator = path.abspath(path.join(root_dirname, pardir))
sandboxes_dirname = path.join(root_dirname, "sandboxes")

templates_generator_dirname = path.join(root_dirname, "templates", "generator")
templates_execute_dirname = path.join(root_dirname, "templates", "execute")

class Config:
  path = {
    "ROOT": root_dirname,
    "TEMPLATES": {
      "GENERATOR": templates_generator_dirname,
      "EXECUTE": templates_execute_dirname
    },
    "SANDBOXES": sandboxes_dirname
  }
