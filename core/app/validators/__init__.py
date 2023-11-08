from wvalidate import Validate as v
from .validator_list_by_item import ValidatorListByItem

validator_lang = v.enum(["python", "python"])

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
    "name": v.string(min=1),
    "type": validator_type,
    "description": v.string(min=5)
})

validator_data_file = v.dict({
    "name": v.string(min=3),
    "description":  v.string(min=5),
    "type-result": validator_type,
    "description-result":  v.string(min=5),
    "params": v.list(validator_param)
})

validators_by_type = {
    "INTEGER": v.integer(),
    "FLOAT": v.float(),
    "STRING": v.string(),
    "BOOLEAN": v.enum([True, False]),
    "INTEGER-ARRAY": v.list(v.integer()),
    "FLOAT-ARRAY": v.list(v.float()),
    "STRING-ARRAY": v.list(v.string()),
    "BOOLEAN-ARRAY": v.list(v.enum([True, False]))
}

validator_data_execute_file = v.dict({
    "code": v.string(),
    "type-result": validator_type,
    "params": v.list(validator_type)
})

def get_validator_tests(params, type_result):
    return v.dict({ 
        "tests": v.list(v.dict({
            "args": ValidatorListByItem([ validators_by_type[param] for param in params ]),
            "result": validators_by_type[type_result]
        }))
    })
