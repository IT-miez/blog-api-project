import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
// eslint-disable-next-line no-use-before-define
import { fetchURL } from "../constants/fetchURL.js";


export default function useQuery(url) {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)


  const handleError = (error) => {
    setError(error.response?.data.err)
    setLoading(false)
  }

  // this function is calling useCallback to stop an infinite loop since it is in the dependency array of useEffect
  const runQuery = useCallback(() => {
    const handleSuccess = (res) => {
      setData(res.data)
      setLoading(false)
    }

    setLoading(true)
    axios.get(fetchURL+url).then(handleSuccess).catch(handleError)
  }, [url])

  useEffect(() => {
    runQuery()
  }, [runQuery])

    return { 
        data: data, 
        loading: loading, 
        error: error, 
        refetch: runQuery 
    }
}