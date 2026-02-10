import { useCallback, useEffect, useState } from "react";

export function useAsync(funct, dependencies){
    const [loading, setLoading]= useState(false)
    const [err, setErr]= useState(null)
    
    const run = useCallback( async () => {
        setLoading(true)
        setErr(null)
            try{
                return await funct()
            }catch(e){
                setErr(e)
                return undefined
            }finally{
               setLoading(false)
            }
        }
    ,dependencies)

    return {run, loading, err}

} 