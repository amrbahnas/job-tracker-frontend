import React from "react"

export const Error = ({
  error,
  hideOkButton,
}: {
  error: any
  hideOkButton?: boolean
}) => {
  const [show, setShow] = React.useState(true)

  return (
    error &&
    show && (
      <div className="text-md text-destructive">
        {String(error)}
        {!hideOkButton && (
          <button
            onClick={() => setShow(false)}
            className="text-md ps-2 text-destructive underline"
          >
            ok
          </button>
        )}
      </div>
    )
  )
}
