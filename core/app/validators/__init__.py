from wvalidate import Validate as v

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
    "code": v.string(min=30),
    "type-result": validator_type,
    "params": v.list(validator_type)
})
