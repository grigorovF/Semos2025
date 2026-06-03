const { chatWithAI } = require("./aiSystem");

exports.chat = async (req, res) => {
  try {
    const result = await chatWithAI(req.body.prompt);

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
