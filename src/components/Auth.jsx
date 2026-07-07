import { useState } from 'react'

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const url = isLogin ? '/api/auth/login/' : '/api/auth/register/'

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || data.detail || 'Ошибка запроса')
        return
      }

      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      onAuth()
    } catch {
      setError('Сервер недоступен')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>SoundLink</h1>
        <div className="auth-tabs">
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => { setIsLogin(true); setError('') }}
          >
            Вход
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => { setIsLogin(false); setError('') }}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  )
}
