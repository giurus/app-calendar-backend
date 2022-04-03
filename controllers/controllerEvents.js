const { response } = require("express");

const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Get events",
  });
};

const createEvent = (req, res = response) => {
  console.log(req.body);

  res.json({
    ok: true,
    msg: "New event",
  });
};

const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Updated event",
  });
};

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Deleted event",
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
