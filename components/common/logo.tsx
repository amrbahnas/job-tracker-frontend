import Image from "next/image"
import React from "react"

const Logo = () => {
  return (
    <Image
      width={110}
      height={110}
      className="mt-2 w-20 shrink-0 sm:mt-0 sm:w-28"
      src="/images/logo/dawarly.png"
      alt="Dawarly Logo"
    />
  )
}

export default Logo
