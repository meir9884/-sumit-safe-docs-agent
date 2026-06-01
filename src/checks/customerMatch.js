function checkCustomerMatch(context) {
  const issues = [];
  const nextSteps = [];
  const matches = Array.isArray(context.matchedCustomers) ? context.matchedCustomers : [];

  if (context.action === 'create_customer' && matches.length > 0) {
    issues.push({
      code: 'POSSIBLE_DUPLICATE_CUSTOMER',
      severity: 'blocker',
      message: 'A similar customer already exists. Do not create a new customer until the existing customer is checked.'
    });
    nextSteps.push('Review existing customer matches before creating a new customer.');
  }

  if (matches.length > 1) {
    issues.push({
      code: 'MULTIPLE_CUSTOMER_MATCHES',
      severity: 'blocker',
      message: 'More than one customer matches the request. Do not create or issue documents until the exact customer is confirmed.'
    });
    nextSteps.push('Confirm the exact customer before creating or linking financial documents.');
  }

  if (matches.length === 0 && context.action !== 'create_customer') {
    issues.push({
      code: 'NO_CONFIRMED_CUSTOMER',
      severity: 'blocker',
      message: 'No confirmed customer was found for this financial action.'
    });
    nextSteps.push('Find or confirm the customer before continuing.');
  }

  return { issues, nextSteps };
}

module.exports = { checkCustomerMatch };
