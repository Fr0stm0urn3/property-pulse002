import Link from "next/link"

const InfoBox = ({
  header,
  children,
  buttonInfo,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
}) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${backgroundColor}`}>
      <h2 className={`text-2xl font-bold ${textColor}`}>{header}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 ${buttonInfo.bgHover}`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  )
}

export default InfoBox
