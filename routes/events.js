/*
    Rutas de Eventos
    host + /api/events
*/

const express = require("express");
const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");
const { isDate } = require("../helpers/isDate");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/controllerEvents");
const router = express.Router();

router.use(jwtValidator);

router.get("/", getEvents);
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldsValidator,
  ],
  createEvent
);
router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldsValidator,
  ],
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
