function checkReceiptName(context) {
  const issues = [];
  const nextSteps = [];

  if (['create_receipt', 'create_tax_invoice_receipt'].includes(context.action)) {
    if (!context.receiptName || String(context.receiptName).trim().length === 0) {
      issues.push({
        code: 'MISSING_RECEIPT_NAME',
        severity: 'blocker',
        message: 'Receipt name is missing. Confirm the exact name that should appear on the receipt.'
      });
      nextSteps.push('Confirm the exact receipt name before issuing the document.');
    }

    if (context.businessName && context.receiptName && context.businessName !== context.receiptName && !context.receiptNameConfirmed) {
      issues.push({
        code: 'UNCONFIRMED_RECEIPT_NAME_DIFFERENCE',
        severity: 'warning',
        message: 'Business name and receipt name are different. Confirm that this difference is intentional.'
      });
      nextSteps.push('Confirm whether the receipt name should differ from the business name.');
    }
  }

  return { issues, nextSteps };
}

module.exports = { checkReceiptName };
