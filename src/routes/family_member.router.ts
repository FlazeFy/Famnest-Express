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

        this.route.get("/", verifyAuthToken, authorizeRole(["user"]), getAllFamilyMemberController)
    }

    public getRouter = (): Router => this.route
}