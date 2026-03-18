/**
 * @openapi
 * /api/v1/dictionaries:
 *   get:
 *     summary: Get all dictionaries
 *     tags:
 *       - Dictionary
 *     responses:
 *       200:
 *         description: Get dictionary successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get dictionary successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: 76789fa3-f5c7-45b7-95f1-004f289daa78 }
 *                       dictionary_name: { type: string, example: appointment }
 *                       dictionary_type: { type: string, example: event_category }
 *                       dictionary_desc: { type: string, example: Personal or family appointment }
 *                       created_at: { type: string, format: date-time, example: 2025-03-11T20:48:16.748Z }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 33 }
 *                     total_page: { type: integer, example: 3 }
 */