import { ValidatorSchema } from "../middlewares/validator.middleware"

export const authSchema: ValidatorSchema = {
    email: { required: true, min: 6, max: 255, isEmail: true },
    password: { required: true, min: 6, max: 255 }
}
