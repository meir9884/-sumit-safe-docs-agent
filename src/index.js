const { checkCustomerMatch } = require('./checks/customerMatch');
const { checkDocumentFlow } = require('./checks/documentFlow');
const { checkReceiptName } = require('./checks/receiptName');
const { checkPaymentStatus } = require('./checks/paymentStatus');

function validateDocumentAction(context) {
  const issues = [];
  const nextSteps = [];

  const checks = [
    checkCustomerMatch,
    checkDocumentFlow,
    checkReceiptName,
    checkPaymentStatus
  ];

  for (const check of checks) {
    const result = check(context || {});
    issues.push(...result.issues);
    nextSteps.push(...result.nextSteps);
  }

  const hasBlocker = issues.some((issue) => issue.severity === 'blocker');
  const hasWarning = issues.some((issue) => issue.severity === 'warning');

  return {
    allowed: !hasBlocker,
    riskLevel: hasBlocker ? 'high' : hasWarning ? 'medium' : 'low',
    issues,
    nextSteps: [...new Set(nextSteps)]
  };
}

module.exports = { validateDocumentAction };
