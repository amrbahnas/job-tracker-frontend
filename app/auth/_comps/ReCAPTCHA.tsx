import { GoogleReCaptcha } from "react-google-recaptcha-v3"
const ReCAPTCHA = ({ onChange }: { onChange: (value: string) => void }) => {
  return <GoogleReCaptcha onVerify={(token) => onChange(token || "")} />
}

export default ReCAPTCHA
