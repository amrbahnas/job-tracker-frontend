import Image from "next/image"
import React from "react"

const Logo = () => {
  return (
    <Image
      width={110}
      height={110}
      className="mt-2 w-18 shrink-0 sm:mt-0 sm:w-24"
      src="/images/logo/dorly.png"
      alt="Dorly Logo"
    />
  )
}

export default Logo
