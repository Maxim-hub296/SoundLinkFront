export default function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>SoundLink</h1>
        <p className="welcome">Добро пожаловать, {user}!</p>
        <div className="token-info">
          <p>Вы авторизованы</p>
          <p className="token-label">Access Token:</p>
          <code className="token-value">{localStorage.getItem('accessToken')?.slice(0, 30)}...</code>
        </div>
        <button className="auth-submit logout-btn" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </div>
  )
}
