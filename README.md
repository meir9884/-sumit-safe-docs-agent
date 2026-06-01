# SUMIT Safe Docs Agent

An open-source safety layer for AI agents that create invoices, receipts, customer records, and business documents.

This project helps developers add validation checks before an AI agent performs financial or accounting actions through SUMIT or similar invoicing APIs.

## Why this exists

AI agents connected to invoicing systems can make expensive mistakes if they act too quickly.

Common risks include:

- creating duplicate customers
- issuing a receipt that does not close the original deal invoice
- using the wrong receipt name
- confusing an invoice, deal invoice, receipt, or cancellation document
- leaving an open balance after a payment document was created
- running unnecessary full sync, audit, rescan, or large pagination steps

This project provides a lightweight rules engine that checks proposed document actions before execution.

## Quick start

```bash
npm install
npm run example
```

## Basic usage

```js
const { validateDocumentAction } = require('./src');

const result = validateDocumentAction({
  action: 'create_receipt',
  customerQuery: 'Baruch',
  amount: 2500,
  currency: 'ILS',
  receiptName: null,
  matchedCustomers: [
    { id: 'cus_1', name: 'Baruch Shechter' },
    { id: 'cus_2', name: 'Baruch Shachter' }
  ],
  openDocuments: [
    { id: 'doc_1', type: 'deal_invoice', balance: 2500, currency: 'ILS' }
  ]
});

console.log(result);
```

## Core safety rules

1. Do not create a new customer if a similar customer already exists.
2. Before creating a receipt, check whether there is an existing open deal invoice.
3. Confirm the exact receipt name before issuing a document.
4. Never assume that `business_name` and `receipt_name` are identical.
5. If the document flow is unclear, stop and ask for confirmation.
6. Avoid full sync, audit, rescan, or large pagination unless explicitly required.
7. Use precise customer identifiers before creating financial documents.

## Project status

Early development. The initial version focuses on local validation rules and examples.

## License

MIT
