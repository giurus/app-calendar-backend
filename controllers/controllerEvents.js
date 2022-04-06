const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");
  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventSave = await event.save();
    res.json({
      ok: true,
      event: eventSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You not allowed to update this event",
      });
    }
    const newEvent = {
      ...req.body,
      user: uid,
    };
    const eventUpdated = await Event.findByIdAndUpdate(eventID, newEvent, { new: true });
    res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You not allowed to delete this event",
      });
    }
    await Event.findByIdAndDelete(eventID);
    res.json({
      ok: true,
      msg: "Event deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
