import { useState } from "react"

export function useTrigger(activate) {
  const [trigger,setTrigger] = useState(activate)
  const toggleTrigger = () => {
    setTrigger(!trigger);
  }
  return [trigger, toggleTrigger]
}