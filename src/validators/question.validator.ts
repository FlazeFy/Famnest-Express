import { ValidatorSchema } from "../middlewares/validator.middleware"

export const questionSchema: ValidatorSchema = {
    question: { required: true, min: 5, max: 255 },
    email: { required: true, min: 6, max: 255,  isEmail: true }
}
