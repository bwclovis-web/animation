import { LinkField } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import clsx from "clsx"

type ButtonProps = {
    buttonLink: LinkField
    buttonText: string | null
    className?: string
}
export const Button = ({buttonLink, buttonText, className }: ButtonProps) => {
  return (
    <PrismicNextLink field={buttonLink} 
        className={clsx("rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-500 hover:bg-orange-800", className)}>
        {buttonText}
    </PrismicNextLink>
  )
}
