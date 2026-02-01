import { ValidatorSchema } from "../middlewares/validator.middleware"

export const familySleepTimeSchema: ValidatorSchema = {
    hour_start: { required: true, min: 5, max: 5 },
    hour_end: { required: true, min: 5, max: 5 }
}
