import GoogleCaptcha from "react-google-recaptcha"

const ReCAPTCHA = ({ onChange }: { onChange: (value: string) => void }) => {
  return (
    <GoogleCaptcha
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      onChange={(token) => onChange(token || "")}
    />
  )
}

export default ReCAPTCHA
