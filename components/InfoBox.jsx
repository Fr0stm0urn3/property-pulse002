import Link from "next/link"

const InfoBox = ({
  heading,
  textColor = "text-gray-800",
  backgroundColor = "bg-gray-100",
  buttonInfo,
  children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-bold ${textColor}`}>{heading}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  )
}

export default InfoBox