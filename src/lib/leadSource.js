// Lead attribution: first-touch source/medium for the visit, plus the page the form was sent from.
const KEY = 'fm_lead_source';

export function getLeadSource() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = (params.get('utm_source') || '').trim().slice(0, 80);
  const utmMedium = (params.get('utm_medium') || '').trim().slice(0, 80);
  const page = (window.location.pathname + window.location.search).slice(0, 200);

  let stored = null;
  try {
    stored = JSON.parse(sessionStorage.getItem(KEY) || 'null');
  } catch {
    stored = null;
  }

  // First touch wins: the campaign that brought the visitor in is kept for the rest of the visit.
  if (!stored || (!stored.source && utmSource)) {
    const host = window.location.hostname.replace(/^www\./, '');
    let referrer = '';
    try {
      referrer = new URL(document.referrer).hostname.replace(/^www\./, '');
    } catch {
      referrer = '';
    }
    const external = referrer && referrer !== host ? referrer : '';
    stored = {
      source: utmSource || external || 'direct',
      medium: utmMedium || (utmSource ? 'campaign' : external ? 'referral' : 'direct'),
    };
    try {
      sessionStorage.setItem(KEY, JSON.stringify(stored));
    } catch {
      // Storage unavailable: this submission is measured on its own.
    }
  }

  return { source: stored.source || 'direct', medium: stored.medium || 'direct', page };
}