export interface Invoice {
  id: number;
  invoice_number: string;
  total: number;
  status: string;
  issue_date: string;
  company_id: number;
  currency: string;
}

export interface InvoiceApiResponse {
  data: Invoice[];
  meta: {
    paging: {
      links: {
        next: string | null;
      };
      total: number;
    };
    time: number;
  };
}

export interface InvoiceStats {
  paid: number;
  unpaid: number;
  overdue: number;
  total: number;
}