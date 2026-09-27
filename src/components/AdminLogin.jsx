import { useState } from 'react';
import '../App.css';

function AdminLogin({ onLoginSuccess, onBackToHome }) {
  const [isNewAccount, setIsNewAccount] = useState(false); // false = Login mode, true = Sign Up mode
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Abhi ke liye seedha Dashboard pe le jate hain.
    // Baad mein yahan real email/password check (backend/API) lagega.
    onLoginSuccess();
  }

  return (
    <div className="auth-split-page">
      <div className="row g-0 min-vh-100">

        {/* LEFT SIDE — Form */}
        <div className="col-lg-6">
          <div className="auth-split-form">
            <button className="btn btn-link p-0 mb-4 text-muted small" onClick={onBackToHome}>
              ← Back to Home
            </button>

            <h1 className="auth-split-title">
              {isNewAccount ? 'Create account' : 'Welcome back'}
            </h1>
            <p className="auth-split-subtitle">
              {isNewAccount ? 'Set up your admin account to get started.' : "Let's get you signed in."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control auth-split-input"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-2 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control auth-split-input"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="auth-split-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {isNewAccount && (
                <div className="mb-2">
                  <input
                    type="password"
                    className="form-control auth-split-input"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              )}

              {!isNewAccount && (
                <div className="mb-4">
                  <a href="#" className="auth-split-link">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="btn auth-split-btn w-100 mt-3">
                {isNewAccount ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <p className="text-center mt-4 text-muted">
              {isNewAccount ? (
                <>
                  Already have an account?{' '}
                  <button className="btn btn-link p-0 auth-split-link" onClick={() => setIsNewAccount(false)}>
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  New here?{' '}
                  <button className="btn btn-link p-0 auth-split-link" onClick={() => setIsNewAccount(true)}>
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — Image + Text (mobile pe hide ho jata hai) */}
        <div className="col-lg-6 d-none d-lg-block">
          <div className="auth-split-image-panel">
            <h2 className="auth-split-right-title">Freshly brewed,<br />every single day</h2>
            <p className="auth-split-right-text">
              Manage The Coffee Club's menu, orders, and members — all from one place.
            </p>
            <img
              src="/coffee-club.jfif"
              alt="The Coffee Club"
              className="auth-split-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;