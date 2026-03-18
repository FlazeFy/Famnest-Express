/**
 * @openapi
 * /api/v1/family_sleep_time:
 *   get:
 *     summary: Get family sleep time
 *     tags: [Family Sleep Time]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get family sleep time successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get family sleep time successful }
 *                 data:
 *                   type: object
 *                   properties:
 *                     hour_start: { type: string, example: "00:00" }
 *                     hour_end: { type: string, example: "21:00" }
 *                     created_at: { type: string, format: date-time, example: 2026-03-17T01:41:23.933Z }
 *                     updated_at: { type: string, format: date-time, example: 2026-03-17T01:41:23.939Z }
 *                     user:
 *                       type: object
 *                       properties:
 *                         username: { type: string, example: Daisha_Jenkins98 }
 */