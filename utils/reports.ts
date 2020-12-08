export const groupTicketsByPrice = (tickets) => {
  // important to consider we are leaving empty indexes in array
  // because the index represent the range i.e < 20$

  let groupedTicketsByPrice = [];

  tickets.forEach((ticket) => {
    const indexToPush = Math.floor(ticket.amount / 20);
    if (groupedTicketsByPrice[indexToPush] === undefined)
      groupedTicketsByPrice[indexToPush] = [];

    groupedTicketsByPrice[indexToPush].push(ticket);
  });

  return groupedTicketsByPrice;
};

export const ticketsByBenefitReportOfTickets = (
  groupedTicketsByPrice,
  bankFee
) => {
  let results = [];

  groupedTicketsByPrice.forEach((groupedTickets, index) => {
    const feesOfEachGroupedCategory = groupedTickets.map(({ amount, tips }) => {
      // TODO: if ticket does not cost, how to calculate profit?, for now is zero
      if (amount === 0) return 0;

      const fee = 0.3 + amount * (bankFee / 100);
      const profit = tips - fee;
      var profitInPercent = (profit * 100) / amount;
      return profitInPercent;
    });

    // removing also empty values for precaution
    const averagePerCategory =
      feesOfEachGroupedCategory.filter(Boolean).reduce((a, b) => a + b) /
      feesOfEachGroupedCategory.length;

    results.push({
      range: index * 20 + 20,
      items: groupedTickets.length,
      average: parseFloat(averagePerCategory.toFixed(4)),
    });
  });

  return results;
};
