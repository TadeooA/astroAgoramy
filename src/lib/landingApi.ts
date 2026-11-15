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

/** Primer mensaje de error de cada campo devuelto por un 422. */
export const firstErrors = (errors?: Record<string, string[]>) =>
  Object.fromEntries(
    Object.entries(errors ?? {}).map(([field, msgs]) => [field, msgs?.[0] ?? 'Valor no válido'])
  ) as Record<string, string>
