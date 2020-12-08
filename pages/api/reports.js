const mongoose = require("mongoose");

import {
  groupTicketsByPrice,
  ticketsByBenefitReportOfTickets,
} from "../../utils/reports";

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

export default async (req, res) => {
  const db = mongoose.connection.collection("tickets");

  const BANK_FEE = parseFloat(req.query.bank_fee);

  if (BANK_FEE < 0 || BANK_FEE > 100 || isNaN(BANK_FEE)) {
    res.send({ error: "invalid bank fee" });
  }

  try {
    const response = await db.find();
    const tickets = await response.toArray();

    const groupedTicketsByPrice = groupTicketsByPrice(tickets);
    console.log(tickets);

    const results = ticketsByBenefitReportOfTickets(
      groupedTicketsByPrice,
      BANK_FEE
    );

    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error fetching");
  }
};
