/**
 * @openapi
 * /api/v1/cash_flows:
 *   get:
 *     summary: Get cash flows
 *     tags: [Cash Flow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema: { type: integer, example: 1 }
 *       - in: query
 *         name: limit
 *         required: false
 *         schema: { type: integer, example: 10 }
 *       - in: query
 *         name: flow_type
 *         required: false
 *         schema: { type: string, enum: [personal, shared], example: shared }
 *       - in: query
 *         name: flow_category
 *         required: false
 *         schema: { type: string, enum: [income, spending], example: spending }
 *       - in: query
 *         name: search
 *         required: false
 *         schema: { type: string, example: barba }
 *         description: Search by flow_context, flow_desc, or tags
 *     responses:
 *       200:
 *         description: Get cash flow successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get cash flow successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: 391d1c07-e8d8-4f8b-9015-4b802820c8f4 }
 *                       flow_type: { type: string, enum: [personal, shared], example: shared }
 *                       flow_context: { type: string, example: tough about }
 *                       flow_desc: { type: string, nullable: true, example: null }
 *                       flow_category: { type: string, enum: [income, spending], example: spending }
 *                       flow_amount: { type: number, example: 95000 }
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: barba
 *                       created_at: { type: string, format: date-time, example: 2026-01-21T19:04:16.842Z }
 *                       updated_at: { type: string, format: date-time, example: 2026-02-08T18:11:59.065Z }
 *                       user:
 *                         type: object
 *                         properties:
 *                           id: { type: string, format: uuid, example: 349e62b1-85d5-4414-8725-6a1a3ab11989 }
 *                           username: { type: string, example: Osbaldo_Larson13 }
 *                           fullname: { type: string, example: Bridget Breitenberg }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 31 }
 *                     total_page: { type: integer, example: 3 }
 */

/**
 * @openapi
 * /api/v1/cash_flows/recently:
 *   get:
 *     summary: Get recent cash flows with summary
 *     tags: [Cash Flow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get cash flow successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get cash flow successful }
 *                 data:
 *                   type: object
 *                   properties:
 *                     cash_flow:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           flow_type: { type: string, enum: [personal, shared], example: shared }
 *                           flow_context: { type: string, example: tough about }
 *                           flow_desc: { type: string, nullable: true, example: null }
 *                           flow_category: { type: string, enum: [income, spending], example: spending }
 *                           flow_amount: { type: number, example: 95000 }
 *                           tags:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: barba
 *                           created_at: { type: string, format: date-time, example: 2026-01-21T19:04:16.842Z }
 *                           user:
 *                             type: object
 *                             properties:
 *                               username: { type: string, example: Osbaldo_Larson13 }
 *                     summary:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           context: { type: string, enum: [income, spending], example: income }
 *                           total: { type: number, example: 4230000 }
 */

/**
 * @openapi
 * /api/v1/cash_flows/contribution/income:
 *   get:
 *     summary: Get income contribution per user
 *     tags: [Cash Flow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get cash flow successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get cash flow successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id: { type: string, format: uuid, example: 349e62b1-85d5-4414-8725-6a1a3ab11989 }
 *                       context: { type: string, example: Osbaldo_Larson13 }
 *                       total: { type: number, example: 1100000 }
 */