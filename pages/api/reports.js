// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const mongoose = require("mongoose");

export default (req, res) => {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
