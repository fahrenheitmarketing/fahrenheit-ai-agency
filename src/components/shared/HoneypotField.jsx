import React from 'react';

// The hidden spam-trap input was being auto-filled by browsers and password managers,
// which silently dropped real submissions. Spam is now limited by server-side rate limiting only.
// Kept as a no-op so existing forms keep working (their trap value is always empty).
export default function HoneypotField() {
  return null;
}