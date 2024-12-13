export function FrFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3 2"
      width="16"
      height="16"
      {...props}
    >
      <path d="M0,0 h3 v2 h-3 z" fill="#ED2939" />
      <path d="M0,0 h2 v2 h-2 z" fill="#fff" />
      <path d="M0,0 h1 v2 h-1 z" fill="#002395" />
    </svg>
  );
}
