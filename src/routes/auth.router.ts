import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { authSchema } from "../validators/auth.validator"

export default class AuthRouter {
    private route: Router
    private authController: AuthController

    constructor(){
        this.route = Router()
        this.authController = new AuthController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { postLogin, getRefreshToken, getMyProfile } = this.authController

        /**
         * @openapi
         * /api/v1/auths/login:
         *   post:
         *     summary: Login user
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required: [email, password]
         *             properties:
         *               email: { type: string, format: email, example: flazen.edu@gmail.com }
         *               password: { type: string, format: password, example: nopass123 }
         *     responses:
         *       200:
         *         description: Login successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message: { type: string, example: Login successful }
         *                 data:
         *                   type: object
         *                   properties:
         *                     name: { type: string, example: Daisha_Jenkins98 }
         *                     email: { type: string, format: email, example: flazen.edu@gmail.com }
         *                     role: { type: string, example: user }
         *                     token: { type: string, example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 }
         *                     family:
         *                       type: object
         *                       properties:
         *                         id: { type: string, format: uuid, example: 8870a083-b343-4a65-b38e-bd6a49484963 }
         *                         family_name: { type: string, example: Kutch }
         *                         family_desc: { type: string, example: Family description }
         *                         created_by: { type: string, format: uuid, example: 623135dd-54f0-42c8-ae53-72ce57e813c8 }
         *                         created_at: { type: string, format: date-time, example: 2025-10-14T10:29:33.472Z }
         *                         updated_at: { type: string, format: date-time, example: 2026-02-08T18:10:48.288Z }
         *                         familyMember:
         *                           type: object
         *                           properties:
         *                             data:
         *                               type: array
         *                               items:
         *                                 type: object
         *                                 properties:
         *                                   id: { type: string, format: uuid, example: 765c5ed4-2315-4625-9421-eb26f9c9cb70 }
         *                                   family_relation: { type: string, example: brother }
         *                                   user_id: { type: string, format: uuid }
         *                                   user:
         *                                     type: object
         *                                     properties:
         *                                       username: { type: string, example: Daisha_Jenkins98 }
         *                                       fullname: { type: string, example: Ann Rogahn }
         *                                       email: { type: string, format: email, example: flazen.edu@gmail.com }
         *                             total: { type: integer, example: 2 }
         */
        this.route.post("/login", validateBodyMiddleware(authSchema), postLogin)
        this.route.get("/refresh", verifyAuthToken, authorizeRole(["admin","user"]), getRefreshToken)
        this.route.get("/profile", verifyAuthToken, authorizeRole(["admin","user"]), getMyProfile)
    }

    public getRouter = (): Router => this.route
}