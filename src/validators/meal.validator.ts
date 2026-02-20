import { ValidatorSchema } from "../middlewares/validator.middleware"
import { ParamValidatorSchema } from "../middlewares/validator.middleware";

export const mealIdParamSchema: ParamValidatorSchema = {
    meal_id: { required: true, min: 36, max: 36 }
}

export const mealSchema: ValidatorSchema = {
    meal_prepare_by: { required: false },
    meal_name: { required: true, max: 75 },
    meal_desc: { required: false, max: 255 },
    meal_day: { required: true, max: 3, min: 3 },
    meal_time: { required: true }
}
