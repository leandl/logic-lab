from typing import List

from wvalidate.validator import Validator
from wvalidate.validator_return import ValidatorReturn
from wvalidate.validator_error import ValidatorError
from wvalidate.validator_path import ValidatorPath

class ValidatorListByItem(Validator):

    def __init__(self, validators: List[Validator]) -> None:
        self.__validators = validators
    
    def is_valid(self, data: object) -> ValidatorReturn:
        if not isinstance(data, list):
            return ValidatorReturn(False, ValidatorError("Is not an instance of list."))
        
        if len(data) != len(self.__validators):
            excepted_length = len(self.__validators)
            return ValidatorReturn(False, ValidatorError(f"The expected length of the list was {excepted_length}"))
        
        errors = []
        for index, d in enumerate(data):
            validator = self.__validators[index]
            is_valid, validator_errors = validator.is_valid(d)

            if not is_valid:
                for e in validator_errors:
                    errors.append(
                        ValidatorError(message=e.message, path=ValidatorPath(index, *e.path))
                    )

        if len(errors) == 0:
            return ValidatorReturn(True)
            
        return ValidatorReturn(False, errors)
