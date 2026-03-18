/**
 * @openapi
 * /api/v1/meal_feedbacks/stats/last:
 *   get:
 *     summary: Get last meal feedback statistics
 *     tags: [Meal Feedback]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get meal feedback successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get meal feedback successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       meal_name: { type: string, example: Chicken Fajitas }
 *                       prepare_by: { type: string, example: Ann Rogahn }
 *                       avg_meal_rate: { type: number, format: float, example: 3 }
 */