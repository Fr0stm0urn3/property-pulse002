"use client"

import ClipLoader from "react-spinners/ClipLoader"

const override = {
  display: "block",
  margin: "150px auto",
}

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      loading={loading}
      color="#333"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  )
}

export default Spinner
