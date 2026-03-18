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

/**
 * @openapi
 * /api/v1/auths/refresh:
 *   post:
 *     summary: Refresh auth token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Token refreshed successfully }
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

/**
 * @openapi
 * /api/v1/auths/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get user successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get user successful }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: string, format: uuid, example: 623135dd-54f0-42c8-ae53-72ce57e813c8 }
 *                     username: { type: string, example: Daisha_Jenkins98 }
 *                     email: { type: string, format: email, example: flazen.edu@gmail.com }
 *                     fullname: { type: string, example: Ann Rogahn }
 *                     bio: { type: string, example: Calco demonstro usus tempus. }
 *                     profile_image: { type: string, nullable: true, example: null }
 *                     born_at: { type: string, format: date-time, example: 1970-05-11T00:00:00.000Z }
 *                     gender: { type: string, example: female }
 *                     created_at: { type: string, format: date-time }
 *                     updated_at: { type: string, format: date-time }
 *                     deleted_at: { type: string, nullable: true, example: null }
 *                     family:
 *                       type: object
 *                       properties:
 *                         id: { type: string, format: uuid, example: 8870a083-b343-4a65-b38e-bd6a49484963 }
 *                         family_name: { type: string, example: Kutch }
 *                         family_desc: { type: string, example: Family description }
 *                         created_by: { type: string, format: uuid }
 *                         created_at: { type: string, format: date-time }
 *                         updated_at: { type: string, format: date-time }
 *                         familyMember:
 *                           type: object
 *                           properties:
 *                             data:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id: { type: string, format: uuid }
 *                                   family_relation: { type: string, example: brother }
 *                                   user_id: { type: string, format: uuid }
 *                                   user:
 *                                     type: object
 *                                     properties:
 *                                       username: { type: string, example: Daisha_Jenkins98 }
 *                                       fullname: { type: string, example: Ann Rogahn }
 *                                       email: { type: string, format: email }
 *                             total: { type: integer, example: 2 }
 */