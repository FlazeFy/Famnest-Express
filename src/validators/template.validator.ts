import { ParamValidatorSchema } from "../middlewares/validator.middleware";

export const templateIdParamSchema: ParamValidatorSchema = {
    id: { required: true, min: 36, max: 36 }
}

export const isValidTime = (value: string): boolean => {
    if (!/^(\d{2}):(\d{2})$/.test(value)) return false
    const [hour, minute] = value.split(':').map(Number)

    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59
  }
  