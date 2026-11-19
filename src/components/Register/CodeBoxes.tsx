import { useEffect, useRef, type ClipboardEvent, type KeyboardEvent } from 'react'

export const CODE_LENGTH = 6

interface Props {
  /** Dígitos tecleados; '' en las casillas vacías. Siempre CODE_LENGTH elementos. */
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
  invalid?: boolean
  /** id del mensaje de error, para aria-describedby. */
  describedBy?: string
  /** Cambia para devolver el foco a la primera casilla (p. ej. tras un error). */
  focusKey?: number
}

const digitsOf = (text: string) => text.replace(/\D/g, '')

/**
 * Seis casillas, una por dígito. Escribir avanza, Backspace en una vacía
 * regresa, las flechas mueven. Pegar el código (o que el teclado del celular
 * lo autocomplete en la primera casilla con `one-time-code`) llena todas.
 */
const CodeBoxes = ({ value, onChange, disabled, invalid, describedBy, focusKey }: Props) => {
  const refs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (!disabled) refs.current[0]?.focus()
    // Sólo al montar y cuando el padre pide reenfocar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey])

  const focusAt = (i: number) => {
    const el = refs.current[Math.max(0, Math.min(CODE_LENGTH - 1, i))]
    el?.focus()
    el?.select()
  }

  /** Escribe `digits` a partir de la casilla `start` y enfoca la siguiente libre. */
  const fillFrom = (start: number, digits: string) => {
    const next = [...value]
    let i = start
    for (const d of digits) {
      if (i >= CODE_LENGTH) break
      next[i++] = d
    }
    onChange(next)
    focusAt(i >= CODE_LENGTH ? CODE_LENGTH - 1 : i)
  }

  const handleChange = (i: number, raw: string) => {
    const digits = digitsOf(raw)
    if (digits === '') {
      const next = [...value]
      next[i] = ''
      onChange(next)
      return
    }
    // Autocompletado del código entero en una casilla.
    if (digits.length >= CODE_LENGTH) {
      fillFrom(0, digits.slice(0, CODE_LENGTH))
      return
    }
    // Teclear sobre una casilla llena deja ambos dígitos: el nuevo es el último.
    fillFrom(i, digits.length === 2 && value[i] ? digits.slice(-1) : digits)
  }

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value[i] === '' && i > 0) {
      e.preventDefault()
      const next = [...value]
      next[i - 1] = ''
      onChange(next)
      focusAt(i - 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusAt(i - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusAt(i + 1)
    }
  }

  const handlePaste = (i: number, e: ClipboardEvent<HTMLInputElement>) => {
    const digits = digitsOf(e.clipboardData.getData('text'))
    if (!digits) return
    e.preventDefault()
    // Un código completo siempre empieza en la primera casilla.
    if (digits.length >= CODE_LENGTH) fillFrom(0, digits.slice(0, CODE_LENGTH))
    else fillFrom(i, digits)
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3" role="group" aria-label="Código de 6 dígitos">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Dígito ${i + 1} de ${CODE_LENGTH}`}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          onFocus={(e) => e.target.select()}
          className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-2xl font-semibold rounded-md border bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50 ${
            invalid ? 'border-red-500 text-red-600' : 'border-gray-300 text-gray-800'
          }`}
        />
      ))}
    </div>
  )
}

export default CodeBoxes
