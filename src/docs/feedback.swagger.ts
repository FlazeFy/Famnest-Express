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

/**
 * @openapi
 * /api/v1/feedbacks:
 *   post:
 *     summary: Create feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [feedback_rate, feedback_body]
 *             properties:
 *               feedback_rate: { type: integer, example: 10 }
 *               feedback_body: { type: string, example: test }
 *     responses:
 *       201:
 *         description: Feedback sended
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Feedback sended }
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Validation error }
 *                 data:
 *                   type: object
 *                   properties:
 *                     feedback_rate: { type: string, example: feedback_rate must be less than or equal to 10 }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */