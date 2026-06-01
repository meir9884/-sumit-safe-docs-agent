# Safety rules for AI invoicing agents

This document describes practical safety rules for AI agents that work with customers, receipts, invoices, deal invoices, and cancellation documents.

## Basic rules

- Do not create a new customer if a similar customer already exists.
- If customer identity is unclear, stop.
- Before issuing a receipt, check for an open deal invoice.
- A receipt should close the correct original document when relevant.
- Do not automatically use the business name as the receipt name.
- Confirm payment status before issuing receipts.
- Avoid full sync, audit, rescan, or large pagination unless needed.

## Goal

The goal is to make AI financial automation safer, more predictable, and easier to review.
