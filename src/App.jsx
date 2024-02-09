import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import PageLayout from "./Layout/PageLayout/PageLayout"
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import useAuthStore from "./store/authStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
 
  //To get the authenticated user 
  const [authUser] = useAuthState(auth);

  return (
    <>

    <PageLayout>
       <Routes>
         {/* if there is an authUser navigate to the homepage else navigae to the authentication page */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/auth" /> }/>
        <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" /> } />
        <Route path="/:username" element={<ProfilePage />} />


      </Routes>
    </PageLayout>
     
    </>
  )
}

export default App
