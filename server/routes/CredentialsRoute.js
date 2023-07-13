const express = require('express')
const router = express.Router()
const credentialsController = require('../controllers/CredentialsController.js')

//tags seen below in swagger are used to give heading to group of apis.

/**
 * @swagger
 * tags:
 *   - name: BNZ Token
 *     description: "API of BNZ token smart contract"
 * components:
 *   schemas:
 *     registration:
 *       type: object
 *       required:
 *         - userType
 *         - name
 *         - email
 *         - publicKey
 *       properties:
 *         userType:
 *           type: string
 *           description: type of user
 *         name:
 *           type: string
 *           description: name
 *         email:
 *           type: string
 *           description: email
 *         publicKey:
 *           type: string
 *           description: publicKey
 *     fetchProfile:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: email
 */

/**
 * @swagger
 * /credentials/registration:
 *   post:
 *    summary: API to fetch Token Name.
 *    tags:
 *      - BNZ Token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/registration'
 *    responses:
 *      200:
 *        description: GetName has been successfully fetched
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/registration', credentialsController.registration)

/**
 * @swagger
 * /credentials/fetchProfile:
 *   post:
 *    summary: API to fetch Token Name.
 *    tags:
 *      - BNZ Token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/fetchProfile'
 *    responses:
 *      200:
 *        description: GetName has been successfully fetched
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/fetchProfile', credentialsController.fetchProfile)

module.exports = router
