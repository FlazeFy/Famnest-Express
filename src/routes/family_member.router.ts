import { Router } from "express"
import { FamilyMemberController } from "../controllers/family_member.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class FamilyMemberRouter {
    private route: Router
    private familyMemberController: FamilyMemberController

    constructor(){
        this.route = Router()
        this.familyMemberController = new FamilyMemberController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllFamilyMemberController } = this.familyMemberController

        /**
         * @openapi
         * /api/v1/family_members:
         *   get:
         *     summary: Get family members
         *     tags: [Family Member]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: query
         *         name: search
         *         required: false
         *         schema:
         *           type: string
         *           example: flazen
         *         description: Search family member by username, fullname, or email
         *     responses:
         *       200:
         *         description: Get family member successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message: { type: string, example: Get family member successful }
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       id: { type: string, format: uuid, example: 765c5ed4-2315-4625-9421-eb26f9c9cb70 }
         *                       family_relation: { type: string, example: brother }
         *                       user:
         *                         type: object
         *                         properties:
         *                           id: { type: string, format: uuid, example: 623135dd-54f0-42c8-ae53-72ce57e813c8 }
         *                           username: { type: string, example: Daisha_Jenkins98 }
         *                           email: { type: string, format: email, example: flazen.edu@gmail.com }
         *                           fullname: { type: string, example: Ann Rogahn }
         *                           bio: { type: string, example: Calco demonstro usus tempus. }
         *                           profile_image: { type: string, nullable: true, example: null }
         *                           born_at: { type: string, format: date-time, example: 1970-05-11T00:00:00.000Z }
         *                           gender: { type: string, example: female }
         *                           created_at: { type: string, format: date-time, example: 2025-06-08T07:14:06.343Z }
         *                           updated_at: { type: string, format: date-time, example: 2026-02-08T18:10:39.738Z }
         *                 meta:
         *                   type: object
         *                   properties:
         *                     page: { type: integer, example: 1 }
         *                     limit: { type: integer, example: 14 }
         *                     total: { type: integer, example: 1 }
         *                     total_page: { type: integer, example: 1 }
         */
        this.route.get("/", verifyAuthToken, authorizeRole(["user"]), getAllFamilyMemberController)
    }

    public getRouter = (): Router => this.route
}