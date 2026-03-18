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

/**
 * @openapi
 * /api/v1/tasks/incoming:
 *   get:
 *     summary: Get incoming tasks based on current date
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: current_date
 *         required: true
 *         schema: { type: string, format: date, example: 2026-02-20 }
 *         description: Filter tasks that are active or upcoming from this date
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
 *                       id: { type: string, format: uuid, example: e0638572-b4f5-4223-8343-987f5a14b654 }
 *                       task_title: { type: string, example: vomito tutamen }
 *                       task_desc: { type: string, nullable: true, example: "lorem ipsum" }
 *                       status: { type: string, enum: [pending, in_progress, completed], example: in_progress }
 *                       due_date: { type: string, format: date-time, example: 2026-02-20T20:13:20.912Z }
 *                       created_at: { type: string, format: date-time, example: 2025-06-25T17:05:55.302Z }
 *                       updated_at: { type: string, format: date-time, example: 2026-02-08T18:10:54.325Z }
 *                       start_date: { type: string, format: date-time, example: 2026-02-20T17:13:20.912Z }
 *                       task_assigns:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             assign_desc: { type: string, nullable: true, example: "lorem ipsum" }
 *                             assignee:
 *                               type: object
 *                               properties:
 *                                 username: { type: string, example: Daisha_Jenkins98 }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 3 }
 *                     total_page: { type: integer, example: 1 }
 */

/**
 * @openapi
 * /api/v1/tasks/{context}/total:
 *   get:
 *     summary: Get total tasks grouped by context
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: context
 *         required: true
 *         schema: { type: string, example: status }
 *         description: Context type (e.g. status)
 *     responses:
 *       200:
 *         description: Get task total context successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get task total context successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status: { type: string, enum: [pending, in_progress, completed], example: completed }
 *                       total: { type: integer, example: 29 }
 */

/**
 * @openapi
 * /api/v1/tasks/total:
 *   get:
 *     summary: Get total tasks per day
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
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
 *                       context: { type: string, example: 18 Mar 26 }
 *                       total: { type: integer, example: 0 }
 *                 total: { type: integer, example: 2 }
 *                 average: { type: number, format: float, example: 0.29 }
 */