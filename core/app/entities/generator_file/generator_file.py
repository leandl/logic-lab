from __future__ import annotations
from abc import ABC, abstractmethod

class GeneratorFile(ABC):

    def __init__(self, path_template: str) -> None:
        with open(path_template, "r") as file_templete:
            self._template = file_templete.read()

    @abstractmethod
    def generate(self, question) -> str:
        pass
