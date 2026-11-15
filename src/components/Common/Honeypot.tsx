import type { InputHTMLAttributes } from 'react'

// Campo trampa anti-spam: oculto con CSS (no type="hidden" ni display:none)
// para que los bots lo rellenen y las personas no lo vean.
const Honeypot = ({ id, ...inputProps }: { id: string } & InputHTMLAttributes<HTMLInputElement>) => (
  <div
    aria-hidden="true"
    style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
  >
    <label htmlFor={id}>Sitio web</label>
    <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" {...inputProps} />
  </div>
)

export default Honeypot
