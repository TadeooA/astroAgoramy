import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { useCallback, useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import Honeypot from '../Common/Honeypot'
import CodeBoxes, { CODE_LENGTH } from './CodeBoxes'
import {
  checkRegistrationCode,
  firstErrors,
  registerBusiness,
  sendRegistrationCode,
  type ApiReply,
  type RegisterPayload,
} from '../../lib/landingApi'

// Alta de negocio con código por correo — contrato en el backend:
// docs/landing/API-FORMULARIOS.md §3. Las reglas de abajo son espejo de
// `TenantRegistrationRequest`; el servidor vuelve a validar todo.

const TERMS_URL = 'https://app.agoramy.com/legal/terminos-prueba'
// Espejo de `App\Support\TrialTerms::VERSION` del backend. Sólo se muestra:
// la versión que queda registrada la pone el servidor al crear la cuenta.
// Cuando el backend la suba, subirla aquí también.
const TERMS_VERSION = '2026-08-18'

const STATES = [
  'CDMX', 'Estado de México', 'Jalisco', 'Nuevo León', 'Puebla', 'Guanajuato', 'Veracruz',
  'Michoacán', 'Oaxaca', 'Chiapas', 'Chihuahua', 'Baja California', 'Sonora', 'Coahuila',
  'Tamaulipas', 'Guerrero', 'San Luis Potosí', 'Sinaloa', 'Hidalgo', 'Tabasco', 'Yucatán',
  'Durango', 'Morelos', 'Zacatecas', 'Quintana Roo', 'Aguascalientes', 'Tlaxcala', 'Nayarit',
  'Campeche', 'Colima', 'Baja California Sur',
] as const

const STATE_LABELS: Record<string, string> = { CDMX: 'Ciudad de México' }

// `App\Support\Vertical`. Los rótulos cambian con el giro: preguntar «Nombre
// de la Farmacia» a quien da de alta una ferretería hace dudar.
const VERTICALS = {
  pharmacy: { label: 'Farmacia', nameLabel: 'Nombre de la farmacia', placeholder: 'Ej. Farmacia San Rafael' },
  retail: { label: 'Tienda / Abarrotes', nameLabel: 'Nombre de la tienda', placeholder: 'Ej. Abarrotes La Esquina' },
  hardware: { label: 'Ferretería / Tlapalería', nameLabel: 'Nombre de la ferretería', placeholder: 'Ej. Ferretería El Tornillo' },
} as const
type Vertical = keyof typeof VERTICALS

const schema = yup.object({
  vertical: yup.string().oneOf(Object.keys(VERTICALS) as Vertical[]).default('pharmacy').required(),
  farmacyName: yup.string().trim()
    .required('Escribe el nombre del negocio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  ownerName: yup.string().trim()
    .required('Escribe el nombre del propietario')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  rfc: yup.string().trim().uppercase()
    .required('Escribe el RFC')
    .min(12, 'El RFC debe tener al menos 12 caracteres')
    .max(13, 'El RFC no puede exceder 13 caracteres')
    .matches(/^[A-Z]{3,4}\d{6}[A-Z0-9]{3}$/, 'Formato de RFC inválido'),
  email: yup.string().trim().lowercase()
    .required('Escribe tu correo electrónico')
    .email('Escribe un correo electrónico válido')
    .max(255, 'El correo no puede exceder 255 caracteres'),
  phone: yup.string().trim()
    .required('Escribe un teléfono')
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede exceder 15 caracteres')
    .matches(/^[0-9+\-\s()]+$/, 'Formato de teléfono inválido'),
  address: yup.string().trim()
    .required('Escribe la dirección')
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(200, 'La dirección no puede exceder 200 caracteres'),
  postalCode: yup.string().trim()
    .required('Escribe el código postal')
    .matches(/^(0[1-9]|[1-9][0-9])[0-9]{3}$/, 'El código postal son 5 dígitos (01000 a 99999)'),
  city: yup.string().trim()
    .required('Escribe la ciudad')
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad no puede exceder 50 caracteres'),
  state: yup.string()
    .required('Selecciona un estado')
    .oneOf([...STATES] as string[], 'Selecciona un estado'),
  password: yup.string()
    .required('Crea una contraseña')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'La contraseña no puede exceder 50 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/\d/, 'Debe contener al menos un número'),
  confirmPassword: yup.string()
    .required('Repite la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  accept_terms: yup.boolean().default(false)
    .oneOf([true], 'Debes aceptar los términos de la cuenta de prueba'),
  _hp_field: yup.string().default(''),
})

type RegisterFormValues = yup.InferType<typeof schema>

const FIELDS = [
  'vertical', 'farmacyName', 'ownerName', 'rfc', 'email', 'phone', 'address',
  'postalCode', 'city', 'state', 'password', 'confirmPassword', 'accept_terms',
] as const

const EMPTY_CODE = () => Array<string>(CODE_LENGTH).fill('')

const inputClass =
  'py-2 px-4 leading-6 block w-full border border-gray-300 rounded text-sm focus:border-primary focus:ring-0'

const Field = ({
  id,
  label,
  error,
  hint,
  className = '',
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}) => (
  <div className={`mb-5 ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-600">
      {label}
    </label>
    {children}
    {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    {error && (
      <p id={`${id}-error`} className="text-xs text-red-600 mt-2">
        {error}
      </p>
    )}
  </div>
)

const TextInput = ({
  id,
  reg,
  error,
  ...rest
}: {
  id: string
  reg: UseFormRegisterReturn
  error?: string
} & InputHTMLAttributes<HTMLInputElement>) => (
  <input
    id={id}
    className={inputClass}
    aria-invalid={error ? true : undefined}
    aria-describedby={error ? `${id}-error` : undefined}
    {...rest}
    {...reg}
  />
)

type Step = 'form' | 'code' | 'done'

const RegisterForm = () => {
  const [step, setStep] = useState<Step>('form')
  const [formNotice, setFormNotice] = useState<string | null>(null)

  // Datos con los que se pidió el código. El alta viaja con ESTOS, no con lo
  // que haya en el formulario después: el código es del correo al que se mandó.
  const [sent, setSent] = useState<RegisterPayload | null>(null)
  const [digits, setDigits] = useState<string[]>(EMPTY_CODE)
  const [cooldown, setCooldown] = useState(0)
  const [codeError, setCodeError] = useState<string | null>(null)
  const [codeInfo, setCodeInfo] = useState<string | null>(null)
  const [busy, setBusy] = useState<null | 'checking' | 'creating' | 'resending'>(null)
  const [focusKey, setFocusKey] = useState(0)
  const [done, setDone] = useState<{ message: string; redirectUrl?: string } | null>(null)
  const lastTried = useRef<string | null>(null)
  // Hasta que React hidrata, el botón va deshabilitado: un envío nativo
  // mandaría la contraseña al servidor estático (o, con GET, a la URL).
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const {
    handleSubmit,
    register,
    watch,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { vertical: 'pharmacy', state: '', accept_terms: false, _hp_field: '' },
  })

  const vertical = (watch('vertical') || 'pharmacy') as Vertical
  const copy = VERTICALS[vertical] ?? VERTICALS.pharmacy

  // Cuenta regresiva de «Reenviar código».
  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  /** Errores de campo de un 422 → formulario, y lo vuelve a mostrar. */
  const backToFormWithErrors = (reply: ApiReply) => {
    const fieldErrors = firstErrors(reply.errors)
    let first: (typeof FIELDS)[number] | null = null
    for (const field of FIELDS) {
      if (fieldErrors[field]) {
        setError(field, { type: 'server', message: fieldErrors[field] })
        first ??= field
      }
    }
    setStep('form')
    setFormNotice(first ? 'Revisa los campos marcados.' : reply.message)
    if (first) setTimeout(() => setFocus(first!), 0)
  }

  const resetCode = () => {
    setDigits(EMPTY_CODE())
    lastTried.current = null
    setFocusKey((k) => k + 1)
  }

  const goToCode = (payload: RegisterPayload, wait: number, info: string) => {
    setSent(payload)
    setCooldown(wait)
    setCodeInfo(info)
    setCodeError(null)
    setStep('code')
    resetCode()
  }

  /** Pide el código. Lo usan «Continuar» y «Reenviar código». */
  const requestCode = async (payload: RegisterPayload) => {
    const reply = await sendRegistrationCode({
      farmacyName: payload.farmacyName,
      email: payload.email,
      _hp_field: payload._hp_field,
    })

    if (reply.ok) {
      goToCode(payload, Number(reply.data.resend_in) || 60, reply.message || 'Te mandamos un código a tu correo.')
      return
    }
    if (reply.code === 'CODE_RECENTLY_SENT') {
      // Ya hay uno en camino para este correo: sirve el mismo.
      goToCode(payload, Number(reply.data.retry_after) || 60, reply.message)
      return
    }
    if (reply.status === 422) {
      backToFormWithErrors(reply)
      return
    }
    // 429 TOO_MANY_CODES, red caída, 5xx.
    if (step === 'code') setCodeError(reply.message)
    else setFormNotice(reply.message)
  }

  const onSubmit = async (values: RegisterFormValues) => {
    setFormNotice(null)
    await requestCode({ ...values, vertical: values.vertical, accept_terms: true })
  }

  const resend = async () => {
    if (!sent || cooldown > 0 || busy) return
    setBusy('resending')
    setCodeError(null)
    await requestCode(sent)
    setBusy(null)
  }

  const changeEmail = () => {
    setStep('form')
    setCodeError(null)
    setCodeInfo(null)
    setTimeout(() => setFocus('email'), 0)
  }

  const invalidCode = (reply: ApiReply) => {
    setCodeError(reply.errors?.code?.[0] ?? reply.message)
    resetCode()
  }

  const confirm = useCallback(
    async (code: string) => {
      if (!sent || busy) return
      lastTried.current = code
      setCodeError(null)

      // 1) Revisarlo sin gastarlo: un dígito mal tecleado no quema uno de los
      //    3 intentos por hora del alta.
      setBusy('checking')
      const check = await checkRegistrationCode({ email: sent.email, code })
      if (!check.ok) {
        setBusy(null)
        if (check.code === 'INVALID_CODE' || check.status === 422) invalidCode(check)
        else setCodeError(check.message)
        return
      }

      // 2) El alta, con todo el formulario más el código.
      setBusy('creating')
      const reply = await registerBusiness({ ...sent, code })
      setBusy(null)

      if (reply.ok) {
        const redirectUrl: string | undefined = reply.data.redirect_url
        setDone({ message: reply.message, redirectUrl })
        setStep('done')
        if (redirectUrl) setTimeout(() => window.location.assign(redirectUrl), 6000)
        return
      }
      // Venció o se quemó entre el check y el alta.
      if (reply.code === 'INVALID_CODE') {
        invalidCode(reply)
        return
      }
      // Un campo que sólo revisa el alta (RFC ya registrado, etc.).
      const fieldErrors = Object.keys(reply.errors ?? {}).filter((f) => f !== 'code')
      if (reply.status === 422 && fieldErrors.length > 0) {
        backToFormWithErrors(reply)
        return
      }
      // Riesgo, demanda alta, 429 del alta, red.
      setCodeError(reply.message)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sent, busy],
  )

  // Al llenar las seis casillas se confirma solo.
  const code = digits.join('')
  useEffect(() => {
    if (step === 'code' && code.length === CODE_LENGTH && !busy && code !== lastTried.current) {
      confirm(code)
    }
  }, [code, step, busy, confirm])

  const err = (f: keyof RegisterFormValues) => errors[f]?.message as string | undefined

  return (
    <section className="py-12 lg:pb-24 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* ---------- Paso 1: formulario ---------- */}
          <form
            noValidate
            method="post"
            action="#"
            hidden={step !== 'form'}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-10 relative"
          >
            <Honeypot id="register-hp" {...register('_hp_field')} />

            <h2 className="text-xl font-medium text-gray-800 mb-6">Tu negocio</h2>
            <div className="grid md:grid-cols-2 md:gap-x-6">
              <Field id="vertical" label="Giro" error={err('vertical')}>
                <select id="vertical" className={inputClass} {...register('vertical')}>
                  {(Object.keys(VERTICALS) as Vertical[]).map((v) => (
                    <option key={v} value={v}>
                      {VERTICALS[v].label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="farmacyName" label={copy.nameLabel} error={err('farmacyName')}>
                <TextInput id="farmacyName" reg={register('farmacyName')} error={err('farmacyName')}
                  placeholder={copy.placeholder} autoComplete="organization" />
              </Field>
              <Field id="ownerName" label="Nombre del propietario" error={err('ownerName')}>
                <TextInput id="ownerName" reg={register('ownerName')} error={err('ownerName')}
                  placeholder="Tu nombre completo" autoComplete="name" />
              </Field>
              <Field id="rfc" label="RFC" error={err('rfc')}>
                <TextInput id="rfc" reg={register('rfc')} error={err('rfc')}
                  placeholder="XAXX010101000" autoCapitalize="characters" maxLength={13} />
              </Field>
            </div>

            <h2 className="text-xl font-medium text-gray-800 mb-6 mt-4">Contacto y dirección</h2>
            <div className="grid md:grid-cols-2 md:gap-x-6">
              <Field id="email" label="Correo electrónico" error={err('email')}
                hint="Te mandaremos un código para confirmarlo.">
                <TextInput id="email" type="email" reg={register('email')} error={err('email')}
                  placeholder="tu@correo.com" autoComplete="email" />
              </Field>
              <Field id="phone" label="Teléfono" error={err('phone')}>
                <TextInput id="phone" type="tel" reg={register('phone')} error={err('phone')}
                  placeholder="55 1234 5678" autoComplete="tel" />
              </Field>
              <Field id="address" label="Dirección" error={err('address')} className="md:col-span-2">
                <TextInput id="address" reg={register('address')} error={err('address')}
                  placeholder="Calle, número, colonia" autoComplete="street-address" />
              </Field>
              <Field id="postalCode" label="Código postal" error={err('postalCode')}>
                <TextInput id="postalCode" reg={register('postalCode')} error={err('postalCode')}
                  placeholder="06600" inputMode="numeric" maxLength={5} autoComplete="postal-code" />
              </Field>
              <Field id="city" label="Ciudad" error={err('city')}>
                <TextInput id="city" reg={register('city')} error={err('city')}
                  placeholder="Ciudad" autoComplete="address-level2" />
              </Field>
              <Field id="state" label="Estado" error={err('state')}>
                <select id="state" className={inputClass} autoComplete="address-level1" {...register('state')}>
                  <option value="" disabled>
                    Selecciona estado
                  </option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {STATE_LABELS[s] ?? s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <h2 className="text-xl font-medium text-gray-800 mb-6 mt-4">Tu acceso</h2>
            <div className="grid md:grid-cols-2 md:gap-x-6">
              <Field id="password" label="Contraseña" error={err('password')}
                hint="Mínimo 8 caracteres, con una mayúscula y un número.">
                <TextInput id="password" type="password" reg={register('password')} error={err('password')}
                  autoComplete="new-password" />
              </Field>
              <Field id="confirmPassword" label="Confirmar contraseña" error={err('confirmPassword')}>
                <TextInput id="confirmPassword" type="password" reg={register('confirmPassword')}
                  error={err('confirmPassword')} autoComplete="new-password" />
              </Field>
            </div>

            <div className="mb-6">
              <div className="flex items-start gap-2">
                <input id="accept_terms" type="checkbox"
                  className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  {...register('accept_terms')} />
                <label htmlFor="accept_terms" className="text-sm text-gray-600">
                  Acepto los{' '}
                  <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    términos de la cuenta de prueba
                  </a>{' '}
                  y el{' '}
                  <a href="/privacy/" className="text-primary hover:underline">
                    aviso de privacidad
                  </a>{' '}
                  de Agoramy (versión {TERMS_VERSION}).
                </label>
              </div>
              {err('accept_terms') && <p className="text-xs text-red-600 mt-2">{err('accept_terms')}</p>}
            </div>

            <button
              type="submit"
              disabled={!hydrated || isSubmitting}
              className="inline-flex items-center justify-center w-full sm:w-auto text-sm bg-primary text-white font-medium leading-6 py-2.5 px-6 rounded-md transition-all hover:shadow-lg hover:shadow-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando código…' : 'Continuar'}
            </button>
            {formNotice && (
              <p role="alert" className="text-sm mt-4 text-red-600">
                {formNotice}
              </p>
            )}
          </form>

          {/* ---------- Paso 2: código ---------- */}
          {step === 'code' && sent && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-10 text-center">
              <h2 className="text-2xl font-medium text-gray-800 mb-3">Revisa tu correo</h2>
              <p className="text-gray-600 mb-1">
                Mandamos un código de 6 dígitos a <strong className="text-gray-800 break-all">{sent.email}</strong>.
              </p>
              <p className="text-sm text-gray-500 mb-8">Vence en 15 minutos. Si no lo ves, busca en spam o promociones.</p>

              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault()
                  if (code.length === CODE_LENGTH) confirm(code)
                }}
              >
                <CodeBoxes
                  value={digits}
                  onChange={(v) => {
                    setDigits(v)
                    if (codeError) setCodeError(null)
                  }}
                  disabled={busy === 'checking' || busy === 'creating'}
                  invalid={!!codeError}
                  describedBy={codeError ? 'code-error' : undefined}
                  focusKey={focusKey}
                />

                <div className="min-h-12 mt-4" aria-live="polite">
                  {codeError ? (
                    <p id="code-error" role="alert" className="text-sm text-red-600">
                      {codeError}
                    </p>
                  ) : busy === 'checking' ? (
                    <p className="text-sm text-gray-500">Revisando el código…</p>
                  ) : busy === 'creating' ? (
                    <p className="text-sm text-gray-500">Creando tu negocio…</p>
                  ) : (
                    codeInfo && <p className="text-sm text-gray-500">{codeInfo}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={code.length !== CODE_LENGTH || !!busy}
                  className="mt-2 inline-flex items-center justify-center w-full sm:w-auto text-sm bg-primary text-white font-medium leading-6 py-2.5 px-8 rounded-md transition-all hover:shadow-lg hover:shadow-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {busy === 'creating' ? 'Creando…' : 'Crear mi cuenta'}
                </button>
              </form>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm">
                <button
                  type="button"
                  onClick={resend}
                  disabled={cooldown > 0 || !!busy}
                  className="text-primary font-medium hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
                >
                  {busy === 'resending'
                    ? 'Reenviando…'
                    : cooldown > 0
                      ? `Reenviar código en ${cooldown} s`
                      : 'Reenviar código'}
                </button>
                <button
                  type="button"
                  onClick={changeEmail}
                  disabled={busy === 'checking' || busy === 'creating'}
                  className="text-gray-600 hover:text-gray-800 hover:underline disabled:opacity-50"
                >
                  Cambiar correo
                </button>
              </div>
            </div>
          )}

          {/* ---------- Paso 3: listo ---------- */}
          {step === 'done' && done && (
            <div role="status" className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-10 text-center">
              <h2 className="text-2xl font-medium text-gray-800 mb-3">¡Correo confirmado!</h2>
              <p className="text-gray-600 mb-6">{done.message}</p>
              {done.redirectUrl && (
                <>
                  <p className="text-sm text-gray-500 mb-4">Te llevamos a tu sistema en unos segundos.</p>
                  <a
                    href={done.redirectUrl}
                    className="inline-flex items-center text-sm bg-primary text-white font-medium leading-6 py-2.5 px-6 rounded-md transition-all hover:shadow-lg hover:shadow-primary/80"
                  >
                    Ir a mi sistema
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RegisterForm
