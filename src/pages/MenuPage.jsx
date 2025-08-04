import React from 'react'
import { useAuth } from "../contextes/AuthProvider";

export default function MenuPage() {
       const { user, loading, logUser } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
        {user?.mail?user.mail:"faut ce log"}
        
    </div>
  )
}
