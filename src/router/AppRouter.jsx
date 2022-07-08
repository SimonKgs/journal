import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { ChekingAuth } from "../ui"
import { useCheckAuth } from "../hooks/useCheckAuth"

export const AppRouter = () => {

  const status = useCheckAuth();

  if ( status === 'cheking') {
    return <ChekingAuth />
  }

  return (
    <Routes>

        {
          ( status === 'authenticated' ) 
            /* JournalApp */
            ? <Route path="/*" element={ <JournalRoutes />} />
            /* Login & register */
            : <Route path="/auth/*" element={ <AuthRoutes />} />
        }
        <Route path="/*" element={ <Navigate to='/auth/login' />} />
    </Routes>
  )
}
