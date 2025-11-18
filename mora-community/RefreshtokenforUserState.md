How It Works Now:
Login: User logs in → backend sets refreshToken cookie + returns accessToken → frontend stores accessToken in Zustand
Page Reload: ProtectedRoute calls refresh() → sends cookie to /auth/refresh → gets new accessToken → fetches user data
Token Refresh: When accessToken expires, call refresh() again to get a new one using the httpOnly cookie
