// Web Crypto API — works in both Edge (middleware) and Node.js (API routes)

export const COOKIE_NAME = 'drohol_adm_sess';
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecret(): string {
  return process.env.JWT_SECRET || 'drohol-fallback-secret-change-in-production';
}

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function toBase64url(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function fromBase64url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

// ─── Token ──────────────────────────────────────────────────────────────────

export async function createToken(email: string): Promise<string> {
  const enc = new TextEncoder();
  const payload = btoa(JSON.stringify({ email, iat: Date.now(), exp: Date.now() + TOKEN_TTL_MS }))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const key = await getHmacKey();
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return `${payload}.${toBase64url(sig)}`;
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const [payload, sigStr] = token.split('.');
    if (!payload || !sigStr) return null;
    const enc = new TextEncoder();
    const key = await getHmacKey();
    const sig = fromBase64url(sigStr);
    const valid = await crypto.subtle.verify('HMAC', key, sig, enc.encode(payload));
    if (!valid) return null;
    const data = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (data.exp && data.exp < Date.now()) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

// ─── Password hashing (PBKDF2 via Web Crypto) ───────────────────────────────

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const enc = new TextEncoder();
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = Array.from(saltBytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations: 100_000 },
    keyMaterial,
    512
  );
  const hash = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('');
  return { hash, salt };
}

export async function verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
  const enc = new TextEncoder();
  const saltBytes = Uint8Array.from(
    (salt.match(/.{2}/g) ?? []).map((byte) => parseInt(byte, 16))
  );
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations: 100_000 },
    keyMaterial,
    512
  );
  const attempt = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('');
  if (attempt.length !== hash.length) return false;
  // Constant-time compare
  let diff = 0;
  for (let i = 0; i < attempt.length; i++) diff |= attempt.charCodeAt(i) ^ hash.charCodeAt(i);
  return diff === 0;
}
