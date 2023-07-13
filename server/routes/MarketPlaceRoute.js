const express = require('express')
const router = express.Router()
const marketplaceController = require('../controllers/MarketplaceController.js')

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
 * /marketPlace/fetchAllProjects:
 *   post:
 *    summary: API to fetch Projects form MarketPlace.
 *    tags:
 *      - BNZ Token
 *    responses:
 *      200:
 *        description: GetName has been successfully fetched
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/fetchAllProjects', marketplaceController.fetchAllProjects)

module.exports = router
