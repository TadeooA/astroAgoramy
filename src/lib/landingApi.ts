// Cliente para la API de formularios de la landing (app.agoramy.com).
// El backend solo acepta peticiones desde https://agoramy.com y https://www.agoramy.com (CORS).

const API_BASE = 'https://app.agoramy.com/api/landing'

export type LandingResult =
  | { ok: true; message: string }
  | { ok: false; status: number; message: string; errors?: Record<string, string[]> }

async function post(path: string, body: Record<string, unknown>): Promise<LandingResult> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return {
      ok: false,
      status: 0,
      message: 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
    }
  }

  const data = await res.json().catch(() => ({}) as Record<string, any>)

  if (res.ok) {
    return { ok: true, message: data.message || '¡Listo! Hemos recibido tus datos.' }
  }
  if (res.status === 429) {
    return {
      ok: false,
      status: 429,
      message: data.message || 'Demasiados envíos. Inténtalo de nuevo más tarde.',
    }
  }
  return {
    ok: false,
    status: res.status,
    message: data.message || 'Ocurrió un error al enviar el formulario. Inténtalo de nuevo.',
    errors: res.status === 422 ? data.errors : undefined,
  }
}

export interface ContactPayload {
  first_name: string
  last_name?: string
  email: string
  phone?: string
  message: string
  accept_privacy: boolean
  website: string
  _ts: number
  source_url?: string
}

export interface NewsletterPayload {
  email: string
  name?: string
  accept_privacy?: boolean
  website: string
  _ts: number
}

export const sendContact = (payload: ContactPayload) => post('contact', { ...payload })
export const subscribeNewsletter = (payload: NewsletterPayload) => post('newsletter', { ...payload })

// ---------------------------------------------------------------------------
// Alta de negocio (POST /api/register) con código por correo.
// Contrato: docs/landing/API-FORMULARIOS.md §3 del repo del backend.
//   1. register/code        { farmacyName, email, _hp_field } → manda el código
//   2. register/code/check  { email, code } → lo revisa SIN gastarlo
//   3. register             formulario completo + code → crea el negocio
// ---------------------------------------------------------------------------

const REGISTER_BASE = 'https://app.agoramy.com/api/register'

/** Respuesta cruda del backend: status HTTP (0 = sin red) y cuerpo JSON. */
export interface ApiReply {
  status: number
  ok: boolean
  /** `code` del cuerpo: CODE_RECENTLY_SENT, TOO_MANY_CODES, INVALID_CODE… */
  code?: string
  message: string
  errors?: Record<string, string[]>
  data: Record<string, any>
}

const NETWORK_ERROR = 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'

async function postRegister(path: string, body: Record<string, unknown>): Promise<ApiReply> {
  let res: Response
  try {
    res = await fetch(`${REGISTER_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return { status: 0, ok: false, message: NETWORK_ERROR, data: {} }
  }

  const data: Record<string, any> = await res.json().catch(() => ({}))
  // El alta contesta 422 también para rechazos sin campo (riesgo, demanda):
  // `success` manda sobre el status.
  const ok = res.ok && data.success !== false

  let message: string = data.message
  if (!message) {
    message = res.status === 429
      ? 'Demasiados intentos. Inténtalo de nuevo más tarde.'
      : ok ? '' : 'Ocurrió un error. Inténtalo de nuevo.'
  }

  return {
    status: res.status,
    ok,
    code: typeof data.code === 'string' ? data.code : undefined,
    message,
    errors: data.errors,
    data,
  }
}

export interface RegisterPayload {
  vertical: string
  farmacyName: string
  ownerName: string
  rfc: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  state: string
  password: string
  confirmPassword: string
  accept_terms: boolean
  /** Trampa del registro: SIEMPRE vacío. */
  _hp_field: string
}

export const sendRegistrationCode = (p: { farmacyName: string; email: string; _hp_field: string }) =>
  postRegister('/code', p)

export const checkRegistrationCode = (p: { email: string; code: string }) =>
  postRegister('/code/check', p)

export const registerBusiness = (p: RegisterPayload & { code: string }) => postRegister('', { ...p })

/** Primer mensaje de error de cada campo devuelto por un 422. */
export const firstErrors = (errors?: Record<string, string[]>) =>
  Object.fromEntries(
    Object.entries(errors ?? {}).map(([field, msgs]) => [field, msgs?.[0] ?? 'Valor no válido'])
  ) as Record<string, string>
