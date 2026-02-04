import { ValidatorSchema } from "../middlewares/validator.middleware"

export const allergicSchema: ValidatorSchema = {
    allergic_context: { required: true, max: 36 },
    allergic_desc: { required: false, max: 255 }
}