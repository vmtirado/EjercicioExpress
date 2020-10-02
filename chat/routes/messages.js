const { JSONCookies } = require("cookie-parser");
var express = require("express");
var router = express.Router();
var [
  getMessages,
  insertMessage,
  getMessage,
  deleteMessage,
  updateMessage,
] = require("../controllers/Message");

/* GET Messages*/
router.get("/", async function (req, res) {
  const messages = await getMessages();
  res.send(messages);
});

/* POST Message */
router.post("/", async function (req, res) {
  const newMessage = await insertMessage(req.body);
  res.send(newMessage);
});

/* GET Message */
router.get("/:ts", async function (req, res) {
  const message = await getMessage(parseInt(req.params.ts));
  if (message == null) {
    return res
      .status(404)
      .send(
        "No fue encontrado ningun Message con el timestamp: " + req.params.ts
      );
  }
  res.send(message);
});


/* DELETE message  */
router.delete("/:id", async function (req, res) {
  const m = await deleteMessage(parseInt(req.params.ts));
  if (m == null) {
    return res
      .status(404)
      .send(
        "The message with the given ts wasn't found: " + req.params.ts
      );
  }
  res.send(m);
});



/* PUT message */
router.put("/:ts", async function (req, res) {
    const schema =Joi.object({
        message: Joi.string()
        .min(5)
        .required(),
        author: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z]+\s[a-zA-Z]+$/)) //Expresion Reg para tener dos nombres separados
         .required(),
         ts:Joi.string()
         .required()
    }) ;

  const { error } = schema.validate(msg);

  if (error) {
    return res.status(400).send(error);
  }

  let msg = {
    message: req.body.message,
    author: req.body.author,
    ts: parseInt(req.params.id),
  };

  const message = await updateMessage(msg);

  if (message == null) {
    return res
      .status(404)
      .send(
        ": " + req.params.ts
      );
  }
  res.send(message);
});

module.exports = router;