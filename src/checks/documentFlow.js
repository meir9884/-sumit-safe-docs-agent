function checkDocumentFlow(context) {
  const issues = [];
  const nextSteps = [];
  const openDocuments = Array.isArray(context.openDocuments) ? context.openDocuments : [];

  if (context.action === 'create_receipt') {
    const openDealInvoices = openDocuments.filter((doc) => doc.type === 'deal_invoice' && Number(doc.balance) > 0);

    if (openDealInvoices.length === 0) {
      issues.push({
        code: 'NO_OPEN_DEAL_INVOICE_FOUND',
        severity: 'warning',
        message: 'No open deal invoice was provided. Make sure this receipt should be standalone and not linked to an existing document.'
      });
      nextSteps.push('Check whether an open deal invoice exists before creating a standalone receipt.');
    }

    if (openDealInvoices.length > 1) {
      issues.push({
        code: 'MULTIPLE_OPEN_DEAL_INVOICES',
        severity: 'blocker',
        message: 'More than one open deal invoice exists. The receipt must be linked to the correct original document.'
      });
      nextSteps.push('Choose the exact open deal invoice that this receipt should close.');
    }
  }

  return { issues, nextSteps };
}

module.exports = { checkDocumentFlow };
