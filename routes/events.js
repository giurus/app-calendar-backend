/*
    Rutas de Eventos
    host + /api/events
*/

const express = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/controllerEvents");
const { jwtValidator } = require("../middlewares/jwtValidator");
const router = express.Router();

router.use(jwtValidator);

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
