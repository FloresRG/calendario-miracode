import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-0 h-full w-full object-cover"
            >
                <source src="/videos/login.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-10 bg-black/50" />

            {/* Content Container */}
            <div className="relative z-20 flex w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                        <div className="flex flex-col items-center gap-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium text-white">
                                    {title}
                                </h1>
                                <p className="text-center text-sm text-white/70">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className="text-white">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
