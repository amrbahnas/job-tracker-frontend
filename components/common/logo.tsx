import Image from "next/image"
import React from "react"

const Logo = () => {
  return (
    <Image
      width={110}
      height={100}
      className="mt-2 sm:mt-0"
      src="/images/logo/dorly.png"
      alt="Dorly Logo"
    />
  )
}

export default Logo
