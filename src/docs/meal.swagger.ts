/**
 * @openapi
 * /api/v1/meals:
 *   get:
 *     summary: Get meal list
 *     tags: [Meal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get meal successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get meal successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: fc5e2d1f-02cc-404f-8f16-d932d58ff4f1 }
 *                       meal_name: { type: string, example: Peruvian Avocado Oil Soup }
 *                       meal_desc: { type: string, nullable: true, example: Our golden rabbit, slow-cooked to perfection. }
 *                       meal_day: { type: string, example: mon }
 *                       meal_time: { type: string, example: breakfast }
 *                       prepare_by: { type: string, example: Ann Rogahn }
 */

/**
 * @openapi
 * /api/v1/meals/{context}/total:
 *   get:
 *     summary: Get total meals grouped by context
 *     tags: [Meal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: context
 *         required: true
 *         schema:
 *           type: string
 *           example: meal_time
 *         description: Group context for meal total (example meal_time)
 *     responses:
 *       200:
 *         description: Get meal total context successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get meal total context successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       meal_time: { type: string, example: dinner }
 *                       total: { type: integer, example: 17 }
 */