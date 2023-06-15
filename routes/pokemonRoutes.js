import express from 'express'
import { pokemonController } from '../controllers/pokemonController.js'

const router = express.Router()

router.use('/:id', pokemonController)

export default router
