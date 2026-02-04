import { ValidatorSchema } from "../middlewares/validator.middleware"

export const mealSchema: ValidatorSchema = {
    meal_name: { required: true, max: 75 },
    meal_desc: { required: false, max: 255 },
    meal_day: { required: true, max: 3, min: 3 },
    meal_time: { required: true }
}