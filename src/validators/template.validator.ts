import { ParamValidatorSchema } from "../middlewares/validator.middleware";

export const templateIdParamSchema: ParamValidatorSchema = {
    id: { required: true, min: 36, max: 36 }
}
