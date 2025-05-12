import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getStorage , removeStorage } from '@/app/utils/helper';

// Helper functions for storage
export default function CustomHeader() {
    const router = useRouter();
    const user = typeof window !== 'undefined' ? getStorage('user') : null;

    const handleLogout = async () => {
        // Optional: Call backend logout API to blacklist refresh token
        const refresh = getStorage('refresh_token');
        if (refresh) {
            try {
                await fetch('/api/logout/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh }),
                });
            } catch (e) {
                // Ignore errors for now
            }
        }
        removeStorage('access_token');
        removeStorage('refresh_token');
        removeStorage('user');
        router.push('/sign-in');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-[#10B981] hover:text-[#059669] transition-colors"
                    >
                        DoneEZ
                    </Link>
                    <div>
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#10B981] hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/sign-in">
                                <button
                                    className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#10B981] hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] transition-colors"
                                >
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}