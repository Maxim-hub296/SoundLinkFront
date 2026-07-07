import {useState, useEffect} from 'react'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            setIsLoggedIn(true)
            const payload = JSON.parse(atob(token.split('.')[1]))
            setUser(payload.username || payload.user_id || 'Пользователь')
        }
    }, [])

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken')

        try {
            await fetch('/api/auth/logout/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({refresh_token: refreshToken}),
            })
        } catch {
        }

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsLoggedIn(false)
        setUser('')
    }

    if (!isLoggedIn) {
        return <Auth onAuth={() => {
            const token = localStorage.getItem('accessToken')
            const payload = JSON.parse(atob(token.split('.')[1]))
            setUser(payload.username || payload.user_id || 'Пользователь')
            setIsLoggedIn(true)
        }}/>
    }

    return <Dashboard user={user} onLogout={handleLogout}/>
}

export default App
