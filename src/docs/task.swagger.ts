/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     summary: Get task list
 *     tags: [Task]
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
 *         name: status
 *         required: false
 *         schema: { type: string, enum: [pending, in_progress, completed], example: completed }
 *       - in: query
 *         name: search
 *         required: false
 *         schema: { type: string, example: task }
 *         description: Search by task_title or task_desc
 *     responses:
 *       200:
 *         description: Get task successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get task successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: 58e9041e-be33-4b7e-b583-af4f069eceda }
 *                       task_title: { type: string, example: uberrime theca }
 *                       task_desc: { type: string, nullable: true, example: null }
 *                       status: { type: string, enum: [pending, in_progress, completed], example: completed }
 *                       due_date: { type: string, format: date-time, example: 2025-02-18T16:49:01.393Z }
 *                       start_date: { type: string, format: date-time, example: 2025-02-18T13:49:01.393Z }
 *                       created_at: { type: string, format: date-time, example: 2025-12-05T22:23:17.965Z }
 *                       updated_at: { type: string, format: date-time, example: 2026-02-08T18:10:51.170Z }
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: trans
 *                       task_assigns:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             assign_desc: { type: string, nullable: true, example: Volup amiculum capitulus ambulo arguo vapulus delicate. }
 *                             assignee:
 *                               type: object
 *                               properties:
 *                                 username: { type: string, example: Daisha_Jenkins98 }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 71 }
 *                     total_page: { type: integer, example: 6 }
 */