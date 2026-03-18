/**
 * @openapi
 * /api/v1/questions:
 *   post:
 *     summary: Send a question
 *     tags: [Question]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, question]
 *             properties:
 *               email: { type: string, format: email, example: flazen.edu@gmail.com }
 *               question: { type: string, example: lorem ipsum? }
 *     responses:
 *       201:
 *         description: Question sended
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Question sended }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: string, format: uuid, example: cddb8d45-1e18-4755-ba50-f06a52ae88fb }
 *                     question: { type: string, example: lorem ipsum? }
 *                     answer: { type: string, nullable: true, example: null }
 *                     is_show: { type: boolean, example: false }
 *                     created_at: { type: string, format: date-time, example: 2026-03-16T17:06:46.494Z }
 *                     email: { type: string, format: email, example: flazen.edu@gmail.com }
 */

/**
 * @openapi
 * /api/v1/questions/random:
 *   get:
 *     summary: Get random questions with answers
 *     tags: [Question]
 *     responses:
 *       200:
 *         description: Get question successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get question successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question: { type: string, example: Copia tempore bellum. }
 *                       answer: { type: string, example: Deficio derideo coma corona supellex. }
 */