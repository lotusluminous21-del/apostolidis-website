"use client"

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react"
import { BootIntro } from "@/components/layout/boot-intro"

type BootContextValue = {
    complete: boolean
}

const BootContext = createContext<BootContextValue | null>(null)

export function BootProvider({ children }: { children: ReactNode }) {
    const [complete, setComplete] = useState(false)

    const handleBootComplete = useCallback(() => {
        setComplete(true)
    }, [])

    const value = useMemo(() => ({ complete }), [complete])

    return (
        <BootContext.Provider value={value}>
            {children}
            {!complete && <BootIntro onComplete={handleBootComplete} />}
        </BootContext.Provider>
    )
}

export function useBootComplete(): boolean {
    const ctx = useContext(BootContext)
    if (!ctx) return true
    return ctx.complete
}
