import { Invoice, InvoiceStats } from "../models/invoice.model";

export function calculateInvoiceStats(
  invoices: Invoice[],
): InvoiceStats {
  const stats: InvoiceStats = {
    paid: 0,
    unpaid: 0,
    overdue: 0,
    total: invoices.length,
  };

  for (const invoice of invoices) {
    const status = invoice.status?.trim().toLowerCase();

    if (status === 'paid') {
      stats.paid++;
    } else if (status === 'overdue') {
      stats.overdue++;
    } else {
      stats.unpaid++;
    }
  }

  return stats;
}