import React from 'react'
import { useAuthStore } from '@/stores/useAuthStore.js';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner.jsx';
const ProtectedRoute = () => {
    const { accessToken, user, refresh, fetchMe, loading } = useAuthStore();
    const [starting, setStarting] = React.useState(true);
    // run for the fisrt render confirming token existence
    const init = async () => {
        if (!accessToken) {
            try {
                await refresh();
            }
            catch (error) {
                console.error('Error during protected route init:', error);
            }
        }
        if (accessToken && !user) {
            await fetchMe();
        }
        setStarting(false);
    }
    React.useEffect(() => {
        init();
    }, []);
    // loading state while checking token
    if (starting || loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size={16} />
            </div>
        )
    }
    // if no token redirect to signin
    if (!accessToken) {
        return (
            // replace gonna change the root path to /signin
            <Navigate to="/signin" replace />
        )
    }
    return (
        <Outlet>
        </Outlet>
    )
}

export default ProtectedRoute;
