function checkPaymentStatus(context) {
  const issues = [];
  const nextSteps = [];

  if (['create_receipt', 'create_tax_invoice_receipt'].includes(context.action)) {
    if (!context.paymentConfirmed) {
      issues.push({
        code: 'PAYMENT_NOT_CONFIRMED',
        severity: 'warning',
        message: 'Payment confirmation was not provided. A receipt should usually be issued only after payment is confirmed.'
      });
      nextSteps.push('Confirm payment status before issuing a receipt.');
    }
  }

  return { issues, nextSteps };
}

module.exports = { checkPaymentStatus };
