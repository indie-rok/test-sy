// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const mongoose = require("mongoose");

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

    let groupedTicketsByPrice = [];

    tickets.forEach((ticket) => {
      const indexToPush = Math.floor(ticket.amount / 20);
      if (groupedTicketsByPrice[indexToPush] === undefined)
        groupedTicketsByPrice[indexToPush] = [];

      groupedTicketsByPrice[indexToPush].push(ticket);
    });

    let results = [];

    groupedTicketsByPrice.forEach((groupedTickets, index) => {
      const fees = groupedTickets.map(({ amount, tips }) => {
        if (amount === 0) return null;

        const fee = 0.3 + amount * (BANK_FEE / 100);
        const profit = tips - fee;
        var profitInPercent = (profit * 100) / amount;
        return profitInPercent;
      });

      const average =
        fees.filter(Boolean).reduce((a, b) => a + b) / fees.length;

      results.push({
        range: index * 20 + 20,
        items: groupedTickets.length,
        average: average.toFixed(4),
      });
    });

    res.send(results);
  } catch (err) {
    res.send("Error fetching");
  }
};
