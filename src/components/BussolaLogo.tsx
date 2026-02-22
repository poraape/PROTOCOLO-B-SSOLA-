// Extraido diretamente do repositorio de referencia e adaptado
// para CSS Custom Properties em vez de classes Tailwind

export const BussolaLogo = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: "block", flexShrink: 0 }}
  >
    {/* Anel externo */}
    <circle cx="20" cy="20" r="18" stroke="var(--brand-circle, #1E293B)" strokeWidth="2.5" />
    {/* Anel interno tracejado */}
    <circle
      cx="20"
      cy="20"
      r="14.5"
      stroke="var(--brand-circle-inner, #CBD5E1)"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
    {/* Marcadores N/S/L/O */}
    <rect x="19.5" y="4" width="1" height="4" rx="0.5" fill="var(--brand-circle, #1E293B)" />
    <rect x="19.5" y="32" width="1" height="4" rx="0.5" fill="var(--brand-muted, #94A3B8)" />
    <rect x="4" y="19.5" width="4" height="1" rx="0.5" fill="var(--brand-muted, #94A3B8)" />
    <rect x="32" y="19.5" width="4" height="1" rx="0.5" fill="var(--brand-muted, #94A3B8)" />
    {/* Agulha Norte - escura */}
    <path d="M20 8L24 20H16L20 8Z" fill="var(--brand-circle, #1E293B)" />
    {/* Agulha Sul - clara */}
    <path d="M20 32L16 20H24L20 32Z" fill="var(--brand-muted, #CBD5E1)" />
    {/* Elemento central amarelo - coracao/pivot */}
    <path
      d="M20 23.5C20 23.5 16 21.5 16 19C16 17.5 17.2 16.5 18.5 16.5C19.2 16.5 19.7 16.8 20 17.3C20.3 16.8 20.8 16.5 21.5 16.5C22.8 16.5 24 17.5 24 19C24 21.5 20 23.5 20 23.5Z"
      fill="#FACC15"
      stroke="var(--brand-circle, #1E293B)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
