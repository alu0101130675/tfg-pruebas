import { useCallback, useState } from "react"

export function useTrigger(activate) {
  const [trigger,setTrigger] = useState(activate)
  const toggleTrigger =  useCallback(() => {
    setTrigger(prev => !prev);
  },[])
  return [trigger, toggleTrigger]
}