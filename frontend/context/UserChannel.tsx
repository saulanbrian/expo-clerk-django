import { useAuth } from "@clerk/clerk-expo";
import React, { createContext, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";


const WS_URL = process.env.EXPO_PUBLIC_WS_URL

type UserChannelContextType = {}

const UserChannelContext = createContext<
  UserChannelContextType | null
>(null)

export default function UserChannelContextProvider(
  { children }: { children: React.ReactNode }
) {

  const { getToken, isSignedIn } = useAuth()
  const socketRef = useRef<ReconnectingWebSocket>(null)

  const urlProvider = useCallback(async () => {
    const token = await getToken()
    return `${WS_URL}/ws/user_channel?token=${token}`
  }, [getToken])

  useEffect(() => {

    (async () => {
      if (isSignedIn) {
        const socket = new ReconnectingWebSocket(urlProvider)

        socket.onopen = (e) => {
          console.log('connected')
        }

        socket.onclose = (e) => {
          console.log('disconnected')
        }

        socketRef.current = socket
      }
      else {
        socketRef.current?.close()
      }
    })();

    return () => {
      socketRef.current?.close()
    }
  }, [isSignedIn])

  return (
    <UserChannelContext.Provider value={{}}>
      {children}
    </UserChannelContext.Provider>
  )
}
