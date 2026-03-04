import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BarChart,
    Calendar as CalendarIcon,
    Instagram,
    Facebook,
    Play,
    Share2,
    Users,
    Youtube,
    Zap,
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-white font-sans text-zinc-900 transition-colors duration-300 selection:bg-red-600/30 dark:bg-[#0A0202] dark:text-white">
            <Head title="Admus Productions | Calendario y Marketing" />

            {/* Background Gradients for Modern Look */}
            {/* Light Mode Gradients */}
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.05),rgba(255,255,255,0))] dark:hidden" />
            <div className="pointer-events-none absolute top-1/4 right-0 -z-10 h-[500px] w-[500px] max-w-full translate-x-1/3 -translate-y-1/2 rounded-full bg-red-100/50 blur-[120px] dark:hidden" />
            <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] max-w-full -translate-x-1/3 translate-y-1/3 rounded-full bg-orange-50/50 blur-[100px] dark:hidden" />

            {/* Dark Mode Gradients (Reds) */}
            <div className="pointer-events-none fixed inset-0 -z-10 hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.15),rgba(0,0,0,0))] dark:block" />
            <div className="pointer-events-none absolute top-1/4 right-0 -z-10 hidden h-[500px] w-[500px] max-w-full translate-x-1/3 -translate-y-1/2 rounded-full bg-red-700/10 blur-[120px] dark:block" />
            <div className="pointer-events-none absolute bottom-0 left-0 -z-10 hidden h-[400px] w-[400px] max-w-full -translate-x-1/3 translate-y-1/3 rounded-full bg-orange-700/10 blur-[100px] dark:block" />

            {/* NAVIGATION BAR */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/60 backdrop-blur-xl transition-colors duration-300 supports-[backdrop-filter]:bg-white/60 dark:border-red-900/30 dark:bg-black/60 dark:supports-[backdrop-filter]:bg-black/60">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src="/images/logo.png"
                                alt="Admus Productions Logo"
                                className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(220,38,38,0.3)] transition-all dark:drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                            />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight uppercase">
                            Admus{' '}
                            <span className="font-medium text-red-600 dark:text-red-500">
                                Productions
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <AppearanceToggleDropdown className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" />
                        <Link href={auth.user ? dashboard() : login()}>
                            <Button
                                className="rounded-full border-0 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5 hover:from-red-500 hover:to-red-600 dark:shadow-red-900/50"
                                size="sm"
                            >
                                {auth.user ? 'Ir al Panel' : 'Iniciar Sesión'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6">
                {/* HERO SECTION */}
                <section className="relative z-10 flex flex-col items-center py-20 text-center text-balance lg:py-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8"
                    >
                        <Badge
                            variant="outline"
                            className="rounded-full border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold tracking-wider text-red-600 uppercase backdrop-blur-sm transition-colors dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-500"
                        >
                            🔥 Producción Audiovisual
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white"
                    >
                        Todo tu{' '}
                        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent dark:from-red-400 dark:to-red-600">
                            Marketing
                        </span>{' '}
                        y{' '}
                        <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent dark:from-red-600 dark:to-red-800">
                            Calendario
                        </span>{' '}
                        en un solo lugar.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-600 transition-colors sm:text-xl dark:text-gray-400"
                    >
                        Planifica guiones, colabora con tu equipo de rodaje y
                        publica tus videos de manera eficiente. El centro de
                        control para creadores de impacto.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
                    >
                        <Button
                            size="lg"
                            className="group h-14 w-full rounded-full border-0 bg-gradient-to-r from-red-600 to-red-800 px-8 text-base font-bold text-white shadow-xl shadow-red-900/20 transition-all hover:scale-[1.02] hover:from-red-500 hover:to-red-700 sm:w-auto dark:shadow-red-900/40"
                        >
                            Comenzar Proyecto
                            <ArrowRight
                                size={18}
                                className="ml-2 transition-transform group-hover:translate-x-1"
                            />
                        </Button>
                    </motion.div>
                </section>

                {/* DASHBOARD PREVIEW MOCKUP */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="glass-effect relative z-10 mx-auto mb-32 max-w-5xl rounded-3xl border border-zinc-200/80 bg-white/40 p-2 shadow-xl backdrop-blur-2xl transition-colors duration-300 sm:p-4 dark:border-red-900/30 dark:bg-black/40 dark:shadow-2xl"
                >
                    <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-red-100/50 via-transparent to-red-50/50 opacity-80 blur-xl dark:from-red-600/10 dark:to-red-900/10 dark:opacity-50" />

                    <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white shadow-[0_0_30px_rgba(220,38,38,0.05)] transition-colors duration-300 dark:border-white/5 dark:bg-[#0D0D0D] dark:shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                        {/* Mockup Top Bar */}
                        <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4 py-3 transition-colors dark:border-white/5 dark:bg-white/[0.02]">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-red-400 dark:bg-red-500/80" />
                                <div className="h-3 w-3 rounded-full bg-yellow-400 dark:bg-yellow-500/80" />
                                <div className="h-3 w-3 rounded-full bg-green-400 dark:bg-green-500/80" />
                            </div>
                            <div className="ml-4 flex w-1/3 items-center justify-center rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-500 shadow-sm transition-colors dark:border-white/5 dark:bg-black dark:text-gray-500">
                                <span className="truncate">
                                    calendario.admusproductions.com
                                </span>
                            </div>
                        </div>
                        {/* Calendar Area */}
                        <div className="pointer-events-none bg-white p-4 opacity-90 transition-colors duration-300 sm:p-8 dark:bg-[#0D0D0D]">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-zinc-800 dark:text-white">
                                    Cronograma de Producción -{' '}
                                    {new Date().toLocaleString('es', {
                                        month: 'long',
                                    })}
                                </h3>
                                <div className="flex gap-2">
                                    <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-white/5" />
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-500">
                                        <CalendarIcon size={14} />
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Using dark classes to handle visual modes for the calendar area */}
                                <div className="scale-[0.98] transform-gpu opacity-80 transition-all dark:opacity-60 dark:contrast-125">
                                    <FullCalendar
                                        plugins={[dayGridPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={false}
                                        height="380px"
                                        dayMaxEvents={true}
                                    />
                                </div>
                                {/* Gradient overly to blend it slightly into mockup */}
                                <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent transition-colors duration-300 dark:from-[#0D0D0D]" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SOCIAL MEDIA / PUBLISHING SECTION */}
                <section className="relative mb-24 overflow-hidden rounded-3xl border-y border-zinc-200/50 bg-gradient-to-b from-transparent via-red-50/50 to-transparent py-24 transition-colors duration-300 dark:border-red-900/20 dark:via-red-950/20">
                    <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200/20 blur-[100px] transition-colors dark:bg-red-600/5" />

                    <div className="relative z-10 px-6 text-center">
                        <Badge
                            variant="outline"
                            className="mb-4 border-red-200 bg-white/80 text-red-600 backdrop-blur-md transition-colors dark:border-red-500/30 dark:bg-black/50 dark:text-red-400"
                        >
                            <Share2 size={12} className="mr-2 inline" />{' '}
                            Distribución
                        </Badge>
                        <h2 className="mb-4 text-3xl font-extrabold text-zinc-900 transition-colors sm:text-4xl dark:text-white">
                            Publica tus videos donde está tu audiencia
                        </h2>
                        <p className="mx-auto mb-16 max-w-2xl text-zinc-600 transition-colors dark:text-gray-400">
                            Lleva tus producciones al siguiente nivel
                            programando y publicando tu contenido audiovisual
                            directamente en las plataformas más importantes.
                        </p>

                        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
                            <SocialCard
                                icon={<Youtube size={32} />}
                                name="YouTube"
                                color="hover:border-red-500 hover:shadow-red-500/10 dark:hover:shadow-red-500/20 hover:text-red-600 dark:hover:text-red-500"
                            />
                            <SocialCard
                                icon={
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                }
                                name="TikTok"
                                color="hover:border-cyan-500 hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/20 hover:text-cyan-600 dark:hover:text-cyan-400"
                            />
                            <SocialCard
                                icon={<Instagram size={32} />}
                                name="Instagram"
                                color="hover:border-pink-500 hover:shadow-pink-500/10 dark:hover:shadow-pink-500/20 hover:text-pink-600 dark:hover:text-pink-500"
                            />
                            <SocialCard
                                icon={<Facebook size={32} />}
                                name="Facebook"
                                color="hover:border-purple-500 hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 hover:text-purple-600 dark:hover:text-purple-500"
                            />
                        </div>
                    </div>
                </section>

                {/* FEATURES BENTO GRID */}
                <section className="pb-32">
                    <div className="mb-16 text-center">
                        <h2 className="mb-6 text-3xl font-extrabold text-zinc-900 transition-colors sm:text-4xl dark:text-white">
                            Todo para escalar tu producción
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-zinc-600 transition-colors dark:text-gray-400">
                            Centraliza tus guiones, estados de rodaje y entregas
                            en un flujo de trabajo visualizado.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid gap-6 md:grid-cols-3"
                    >
                        <FeatureCard
                            icon={<CalendarIcon size={26} />}
                            title="Planificador Visual"
                            description="Visualiza todos tus rodajes, entregas y publicaciones en un calendario interactivo. Arrastra y suelta para organizar el mes."
                        />
                        <FeatureCard
                            icon={<Users size={26} />}
                            title="Aprobaciones de Equipo"
                            description="Colabora con clientes y tu crew. Agrega comentarios, aprueba cortes de video y gestiona permisos fácilmente."
                        />
                        <FeatureCard
                            icon={<BarChart size={26} />}
                            title="Reportes Automatizados"
                            description="Genera informes de rendimiento y estado de proyectos. Analiza métricas clave para campañas audiovisuales."
                        />
                    </motion.div>
                </section>

                {/* FINAL CTA */}
                <section className="relative mb-24 overflow-hidden rounded-[2.5rem] border border-red-100 bg-gradient-to-br from-red-50 via-white to-zinc-50 px-6 py-20 text-center transition-colors duration-300 dark:border-red-500/20 dark:from-red-900/40 dark:via-black dark:to-black">
                    <div className="absolute top-0 right-0 p-12 text-red-600 opacity-5 dark:text-red-500 dark:opacity-5">
                        <Zap size={120} />
                    </div>
                    <div className="relative z-10 mx-auto max-w-2xl">
                        <h2 className="mb-6 text-4xl font-extrabold text-zinc-900 transition-colors dark:text-white">
                            ¿Listo para retomar el control?
                        </h2>
                        <p className="mb-10 text-lg text-zinc-600 transition-colors dark:text-gray-400">
                            Únete a Admus Productions y optimiza el tiempo de
                            tus proyectos visuales con herramientas
                            profesionales.
                        </p>
                        <Button
                            size="lg"
                            className="h-14 rounded-full border-0 bg-red-600 px-10 text-base font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-red-700 dark:bg-white dark:text-black dark:shadow-red-900/50 dark:hover:bg-gray-200"
                        >
                            Agendar Reunión
                        </Button>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="border-t border-zinc-200/50 bg-zinc-50/50 pt-16 pb-12 transition-colors duration-300 dark:border-red-900/30 dark:bg-black">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 text-sm md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-full mb-8 lg:col-span-2 lg:mb-0">
                        <div className="mb-4 flex items-center gap-2">
                            <img
                                src="/images/logo.png"
                                alt="Admus Productions Logo Small"
                                className="h-8 w-auto object-contain"
                            />
                            <span className="text-lg font-bold text-zinc-900 uppercase transition-colors dark:text-white">
                                Admus
                            </span>
                        </div>
                        <p className="mb-6 max-w-xs text-zinc-500 transition-colors dark:text-gray-500">
                            La plataforma definitiva que unifica tu calendario
                            de contenidos y gestión de producciones
                            audiovisuales.
                        </p>
                        <div className="flex gap-4 text-zinc-400 transition-colors dark:text-gray-400">
                            <a
                                href="#"
                                className="transition-colors hover:text-red-600 dark:hover:text-red-500"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-bold shadow-sm hover:border-red-500/50 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                                    YT
                                </div>
                            </a>
                            <a
                                href="#"
                                className="transition-colors hover:text-red-600 dark:hover:text-red-500"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-bold shadow-sm hover:border-red-500/50 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                                    IG
                                </div>
                            </a>
                            <a
                                href="#"
                                className="transition-colors hover:text-red-600 dark:hover:text-red-500"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-bold shadow-sm hover:border-red-500/50 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                                    TK
                                </div>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-zinc-900 transition-colors dark:text-white">
                            Producto
                        </h4>
                        <ul className="space-y-3 text-zinc-500 transition-colors dark:text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                                >
                                    Calendario
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                                >
                                    Analíticas
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                                >
                                    Colaboración
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-zinc-900 transition-colors dark:text-white">
                            Recursos
                        </h4>
                        <ul className="space-y-3 text-zinc-500 transition-colors dark:text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                                >
                                    Portafolio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                                >
                                    Casos de Éxito
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-zinc-900 transition-colors dark:text-white">
                            Legal
                        </h4>
                        <ul className="space-y-3 text-zinc-500 transition-colors dark:text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                                >
                                    Privacidad
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                                >
                                    Términos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mx-auto mt-16 max-w-7xl border-t border-zinc-200/50 px-6 pt-8 text-center text-xs text-zinc-400 transition-colors duration-300 dark:border-red-900/30 dark:text-gray-500">
                    © {new Date().getFullYear()} Admus Productions. Todos los
                    derechos reservados.
                </div>
            </footer>
        </div>
    );
}

// Sub-componente para redes sociales
function SocialCard({
    icon,
    name,
    color,
}: {
    icon: React.ReactNode;
    name: string;
    color: string;
}) {
    return (
        <div
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-500 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:shadow-none ${color}`}
        >
            <div className="mb-3">{icon}</div>
            <span className="text-sm font-bold text-zinc-800 transition-colors dark:text-white">
                {name}
            </span>
        </div>
    );
}

// Sub-componente para las tarjetas de funcionalidades
function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            <Card className="group h-full overflow-hidden border-zinc-200 bg-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-xl dark:border-white/10 dark:bg-black/40 dark:hover:border-red-500/30 dark:hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)]">
                <CardContent className="p-8">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-500">
                        {icon}
                    </div>
                    <h4 className="mb-4 text-xl font-bold text-zinc-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
                        {title}
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-600 transition-colors dark:text-gray-400">
                        {description}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
