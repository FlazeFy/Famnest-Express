import { ValidatorSchema } from "../middlewares/validator.middleware"

export const dictionarySchema: ValidatorSchema = {
    dictionary_name: { required: true, max: 36 },
    dictionary_type: { required: true, max: 36, alloweds: ["event_category", "schedule_category", "family_relation"] },
    dictionary_desc: { required: false, max: 255 }
}