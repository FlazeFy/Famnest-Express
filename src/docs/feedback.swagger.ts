/**
 * @openapi
 * /api/v1/feedbacks/random:
 *   get:
 *     summary: Get random feedbacks
 *     tags:
 *       - Feedback
 *     responses:
 *       200:
 *         description: Get feedback successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get feedback successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       feedback_body: { type: string, example: Bibo spoliatio trepide trado aer nulla delinquo audentia cuius quisquam. }
 *                       feedback_rate: { type: integer, example: 4 }
 *                       user:
 *                         type: object
 *                         properties:
 *                           username: { type: string, example: flazefy }
 */