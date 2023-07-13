const express = require('express')
const router = express.Router()
const projectController = require('../controllers/ProjectController.js')

//tags seen below in swagger are used to give heading to group of apis.

/**
 * @swagger
 * tags:
 *   - name: BNZ Token
 *     description: "API of BNZ token smart contract"
 * components:
 *   schemas:
 *     addNdDeployProject:
 *       type: object
 *       required:
 *         - name
 *         - title
 *         - description
 *         - numOfTokens
 *         - price
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: name of user
 *         title:
 *           type: string
 *           description: title
 *         description:
 *           type: string
 *           description: description
 *         numOfTokens:
 *           type: string
 *           description: numOfTokens
 *         price:
 *           type: string
 *           description: price
 *         email:
 *           type: string
 *           description: email
 *     listProject:
 *       type: object
 *       required:
 *         - numOfTokens
 *         - email
 *         - projectId
 *       properties:
 *         numOfTokens:
 *           type: string
 *           description: numOfTokens of user
 *         email:
 *           type: string
 *           description: email
 *         projectId:
 *           type: string
 *           description: projectId
 *     fetchAvailableProjects:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *     fetchSmartContractAddress:
 *       type: object
 *       required:
 *         - projectId
 *       properties:
 *         projectId:
 *           type: string
 *           description: projectId
 */


/**
 * @swagger
 * /projects/addNdDeployProject:
 *   post:
 *    summary: API to fetch Token Name.
 *    tags:
 *      - BNZ Token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/addNdDeployProject'
 *    responses:
 *      200:
 *        description: GetName has been successfully fetched
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/addNdDeployProject', projectController.addNdDeployProject)

/**
 * @swagger
 * /projects/listProject:
 *   post:
 *    summary: API to fetch Token Name.
 *    tags:
 *      - BNZ Token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/listProject'
 *    responses:
 *      200:
 *        description: GetName has been successfully fetched
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/listProject', projectController.listProject)


/**
 * @swagger
 * /projects/fetchAvailableProjects:
 *   post:
 *    summary: API to fetch Token Name.
 *    tags:
 *      - BNZ Token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/fetchAvailableProjects'
 *    responses:
 *      200:
 *        description: GetName has been successfully fetched
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/fetchAvailableProjects', projectController.fetchAvailableProjects)


/**
 * @swagger
 * /projects/fetchSmartContractAddress:
 *   post:
 *    summary: API to fetch Token Name.
 *    tags:
 *      - BNZ Token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/fetchSmartContractAddress'
 *    responses:
 *      200:
 *        description: GetName has been successfully fetched
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/fetchSmartContractAddress', projectController.fetchSmartContractAddress)


module.exports = router
