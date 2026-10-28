const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email) {
  return EMAIL_RE.test((email || '').trim());
}

export function isValidPhone(phone) {
  const value = (phone || '').trim();
  const digits = value.replace(/\D/g, '');
  return /^[\d\s()+\-.]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

// Returns an error message, or null when every required field is filled and email/phone are valid.
export function validateLead(data, required) {
  if (required.some((key) => !(data[key] || '').trim())) return 'Please fill in all required fields.';
  if (!isValidEmail(data.email)) return 'Please enter a valid email address.';
  if (required.includes('phone') && !isValidPhone(data.phone)) return 'Please enter a valid phone number.';
  return null;
}