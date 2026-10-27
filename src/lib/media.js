const PROXY = 'https://media.fahrenheitmarketing.com';
export const mediaUrl = (u) => typeof u === 'string'
  ? u.replace(/^https:\/\/(media\.base44\.com\/images\/public|base44\.app\/api\/apps\/[^/]+\/files\/(?:mp\/)?public)/, PROXY)
  : u;