import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill="currentColor"
    viewBox="0 0 6.35 6.35"
    {...props}
  >
    <path
      d="M1.497 4.516V.77L2.932.042v5.56ZM4.853 5.166V1.343L3.418.75v5.559Z"
      style={{
        display: "inline",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: ".0240141px",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default SvgComponent
