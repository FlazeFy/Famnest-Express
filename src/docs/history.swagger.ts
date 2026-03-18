/**
 * @openapi
 * /api/v1/histories:
 *   get:
 *     summary: Get history list
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get history successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get history successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: eb3e0758-f94e-4178-91c5-088be51181d0 }
 *                       history_type: { type: string, example: yum }
 *                       history_context: { type: string, example: abnormally shrilly }
 *                       created_by: { type: string, format: uuid, example: 623135dd-54f0-42c8-ae53-72ce57e813c8 }
 *                       created_at: { type: string, format: date-time, example: 2026-01-29T23:39:42.120Z }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 9 }
 *                     total_page: { type: integer, example: 1 }
 */