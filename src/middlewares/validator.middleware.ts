import { Request, Response, NextFunction } from "express"

type FieldRule = {
    required?: boolean
    min?: number
    max?: number
    isEmail?: boolean
    alloweds?: string[]
}

export type ValidatorSchema = Record<string, FieldRule>

const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

export const validateBodyMiddleware = (schema: ValidatorSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
            const hasRequiredField = Object.values(schema).some(rule => rule.required)

            if (hasRequiredField) {
                return res.status(422).json({
                    message: "Validation error",
                    data: {
                        body: "Request body is required",
                    },
                })
            }
        }        
        const errors: Record<string, string> = {}

        for (const field in schema) {
            const rules = schema[field]
            const value = req.body[field]

            if (rules.required && (value === undefined || value === null || value === "")) {
                errors[field] = `${field} is required`
                continue
            }

            if (value === undefined) continue

            if (typeof value === "string") {
                if (rules.min && value.length < rules.min) {
                    errors[field] = `${field} must be at least ${rules.min} characters`
                }
                if (rules.max && value.length > rules.max) {
                    errors[field] = `${field} must be at most ${rules.max} characters`
                }
                if (rules.isEmail && !GMAIL_REGEX.test(value)) {
                    errors[field] = `email must be a valid gmail address`
                }
                if (rules.alloweds && !rules.alloweds.includes(value)) {
                    errors[field] = `${field} must be one of: ${rules.alloweds.join(", ")}`
                }
            }

            if (typeof value === "number") {
                if (Number.isNaN(value)) {
                    errors[field] = `${field} must be a valid number`
                    continue
                }
                if (rules.min !== undefined && value < rules.min) {
                    errors[field] = `${field} must be greater than or equal to ${rules.min}`
                }
                if (rules.max !== undefined && value > rules.max) {
                    errors[field] = `${field} must be less than or equal to ${rules.max}`
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(422).json({
                message: "Validation error",
                data: errors,
            })
        }

        next()
    }
}

type ParamRule = {
    required?: boolean
    min?: number
    max?: number
    alloweds?: string[]
}
  
export type ParamValidatorSchema = Record<string, ParamRule>

export const validateParamMiddleware = (schema: ParamValidatorSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: Record<string, string> = {}

        for (const param in schema) {
            const rules = schema[param]
            const value = req.params[param]

            if (rules.required && !value) {
                errors[param] = `${param} is required`
                continue
            }

            if (!value) continue

            if (typeof value === "string") {
                if (rules.min && value.length < rules.min) {
                    errors[param] = `${param} must be at least ${rules.min} characters`
                }
                if (rules.max && value.length > rules.max) {
                    errors[param] = `${param} must be at most ${rules.max} characters`
                }
                if (rules.alloweds && !rules.alloweds.includes(value)) {
                    errors[param] = `${param} must be one of: ${rules.alloweds.join(", ")}`
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(422).json({
                message: "Validation error",
                data: errors
            })
        }

        next()
    }
}