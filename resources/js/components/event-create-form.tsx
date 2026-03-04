import { DescriptionModal } from '@/components/description-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
    CalendarOff,
    CalendarPlus,
    ChevronRight,
    Clock,
    FileText,
    PlusCircle,
    Search,
    User,
    Users,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const eventColors = [
    { name: 'Video', value: '#2563eb', emoji: '🎥' },
    { name: 'Arte', value: '#92400e', emoji: '🖼️' },
    { name: 'Historia', value: '#eab308', emoji: '📜' },
    // Social Media Icons
    { name: 'Facebook', value: '#1877F2', emoji: '/icon/icons8-facebook.svg' },
    {
        name: 'Instagram',
        value: '#E1306C',
        emoji: '/icon/icons8-instagram.svg',
    },
    { name: 'TikTok', value: '#000000', emoji: '/icon/icons8-tiktok.svg' },
    { name: 'WhatsApp', value: '#25D366', emoji: '/icon/icons8-whatsapp.svg' },
    { name: 'YouTube', value: '#FF0000', emoji: '/icon/icons8-youtube.svg' },
];

interface EventCreateFormProps {
    selectedDate?: string | null;
    selectedCalendars?: any[];
    onEventCreated?: (event: any) => void;
    auth?: any;
}

export function EventCreateForm({
    selectedDate,
    selectedCalendars = [],
    onEventCreated,
    auth,
}: EventCreateFormProps) {
    const [selectedCalendarId, setSelectedCalendarId] = useState<string>('');
    const [form, setForm] = useState({
        titulo: '',
        descripcion: '',
        ubicacion: '',
        prioridad: 'Alta',
        color: '#2563eb',
        emoji: '📱',
        fecha_inicio: '',
        fecha_fin: '',
    });
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [userSearch, setUserSearch] = useState('');
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [showDates, setShowDates] = useState(false);

    // Set default calendar when calendars change
    useEffect(() => {
        if (selectedCalendars.length > 0) {
            setSelectedCalendarId(selectedCalendars[0].id.toString());
        }
    }, [selectedCalendars]);

    useEffect(() => {
        if (selectedDate) {
            const dateOnly = selectedDate.split('T')[0];
            setForm((prev) => ({
                ...prev,
                fecha_inicio: dateOnly + 'T09:30',
                fecha_fin: dateOnly + 'T18:00',
            }));
        }
    }, [selectedDate]);

    useEffect(() => {
        fetch('/users')
            .then((response) => response.json())
            .then((data) => setAllUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedCalendar = selectedCalendars.find(
            (c) => c.id.toString() === selectedCalendarId,
        );
        if (!selectedCalendar) return;

        setLoading(true);

        fetch(`/calendarios/${selectedCalendar.id}/eventos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRF-TOKEN':
                    document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || '',
            },
            body: JSON.stringify({ ...form, users: selectedUsers }),
        })
            .then((response) => response.json())
            .then((newEvent) => {
                onEventCreated?.(newEvent);
                // Reset form
                setForm({
                    titulo: '',
                    descripcion: '',
                    ubicacion: '',
                    prioridad: 'Alta',
                    color: '#2563eb',
                    emoji: '📱',
                    fecha_inicio: selectedDate
                        ? selectedDate.split('T')[0] + 'T09:30'
                        : '',
                    fecha_fin: selectedDate
                        ? selectedDate.split('T')[0] + 'T18:00'
                        : '',
                });
                setSelectedUsers([]);
                setUserSearch('');
            })
            .catch((error) => {
                console.error('Error creating event:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="scrollbar-thin flex max-h-[85vh] flex-col gap-6 overflow-y-auto p-2 pb-20">
            <Card className="border-none bg-transparent shadow-none">
                <CardContent className="space-y-6 px-0">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* 1. Basic Info Section */}
                        <div className="space-y-5">
                            <div className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase">
                                <FileText className="h-4 w-4" />
                                <span>Información Principal</span>
                            </div>

                            {selectedCalendars.length > 1 && (
                                <div className="space-y-2">
                                    <Label
                                        className="text-[13px] font-bold"
                                        htmlFor="calendar"
                                    >
                                        Calendario Destino
                                    </Label>
                                    <Select
                                        value={selectedCalendarId}
                                        onValueChange={setSelectedCalendarId}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl border-none bg-muted/30 shadow-inner focus:ring-2 focus:ring-primary/20">
                                            <SelectValue placeholder="Selecciona un calendario" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-border/50 shadow-2xl">
                                            {selectedCalendars
                                                .filter((calendar) =>
                                                    calendar.users?.some(
                                                        (u: any) =>
                                                            u.id ===
                                                                auth?.user
                                                                    ?.id &&
                                                            [
                                                                'owner',
                                                                'editor',
                                                            ].includes(
                                                                u.pivot
                                                                    ?.tipo_user,
                                                            ),
                                                    ),
                                                )
                                                .map((calendar) => (
                                                    <SelectItem
                                                        key={calendar.id}
                                                        value={calendar.id.toString()}
                                                        className="m-1 rounded-lg"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="h-2 w-2 rounded-full"
                                                                style={{
                                                                    backgroundColor:
                                                                        calendar
                                                                            .template
                                                                            ?.color ||
                                                                        'gray',
                                                                }}
                                                            />
                                                            {calendar.nombre}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label
                                    className="text-[13px] font-bold"
                                    htmlFor="titulo"
                                >
                                    Título del Evento
                                </Label>
                                <Textarea
                                    id="titulo"
                                    value={form.titulo}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            titulo: e.target.value,
                                        })
                                    }
                                    placeholder="Agregar titulo del evento..."
                                    className="h-auto min-h-[44px] rounded-xl border-none bg-muted/30 py-2 text-lg font-medium break-all shadow-inner focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>
                        </div>

                        {/* 2. Description Section */}
                        <div className="space-y-2">
                            <Label
                                className="text-[13px] font-bold"
                                htmlFor="descripcion"
                            >
                                Descripción / Notas
                            </Label>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDescriptionModalOpen(true)}
                                className="h-auto min-h-11 w-full justify-between rounded-xl border-2 border-dashed px-4 py-2 hover:border-primary/50 hover:bg-primary/5"
                            >
                                <div className="flex min-w-0 flex-1 items-center gap-2 text-left">
                                    <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                    <span
                                        className={cn(
                                            'line-clamp-[7] break-all whitespace-pre-wrap',
                                            form.descripcion
                                                ? 'font-medium'
                                                : 'font-normal text-muted-foreground',
                                        )}
                                    >
                                        {form.descripcion ||
                                            'Agregar detalles adicionales...'}
                                    </span>
                                </div>
                                <ChevronRight className="h-4 w-4 flex-shrink-0 opacity-30" />
                            </Button>
                        </div>

                        {/* 3. Appearance Section */}
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-[13px] font-bold">
                                    Color y Tema
                                </Label>
                                <Select
                                    value={form.color}
                                    onValueChange={(value) => {
                                        const selectedColor = eventColors.find(
                                            (c) => c.value === value,
                                        );
                                        setForm({
                                            ...form,
                                            color: value,
                                            emoji: selectedColor?.emoji || '📱',
                                        });
                                    }}
                                >
                                    <SelectTrigger className="h-11 rounded-xl border-none bg-muted/30 shadow-inner">
                                        <SelectValue placeholder="Color del evento" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/50 shadow-2xl">
                                        {eventColors.map((color) => (
                                            <SelectItem
                                                key={color.value}
                                                value={color.value}
                                                className="m-1 rounded-lg"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-5 w-5 rounded-full shadow-sm"
                                                        style={{
                                                            backgroundColor:
                                                                color.value,
                                                        }}
                                                    />
                                                    {color.emoji.includes(
                                                        '.svg',
                                                    ) ? (
                                                        <img
                                                            src={color.emoji}
                                                            alt={color.name}
                                                            className="h-5 w-5 object-contain"
                                                        />
                                                    ) : (
                                                        <span className="text-lg">
                                                            {color.emoji}
                                                        </span>
                                                    )}
                                                    <span className="font-medium">
                                                        {color.name}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* 4. Description Section */}

                        {/* 5. Invites Section */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase">
                                <Users className="h-4 w-4" />
                                <span>Invitados</span>
                            </div>

                            <div className="group relative">
                                <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-muted-foreground transition-colors group-focus-within:text-primary" />
                                <Input
                                    type="text"
                                    placeholder="Buscar por nombre o correo..."
                                    value={userSearch}
                                    onChange={(e) =>
                                        setUserSearch(e.target.value)
                                    }
                                    className="h-12 rounded-2xl border-none bg-muted/30 pl-12 shadow-inner transition-all placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {userSearch && (
                                <div className="animate-in overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-2xl backdrop-blur-md duration-300 fade-in slide-in-from-top-2">
                                    <div className="scrollbar-thin max-h-52 overflow-y-auto">
                                        {allUsers
                                            .filter(
                                                (u: any) =>
                                                    u.id !== auth?.user?.id &&
                                                    (u.name
                                                        .toLowerCase()
                                                        .includes(
                                                            userSearch.toLowerCase(),
                                                        ) ||
                                                        u.email
                                                            .toLowerCase()
                                                            .includes(
                                                                userSearch.toLowerCase(),
                                                            )) &&
                                                    !selectedUsers.includes(
                                                        u.id,
                                                    ),
                                            )
                                            .map((user: any) => (
                                                <div
                                                    key={user.id}
                                                    className="flex cursor-pointer items-center justify-between border-b border-border/20 p-3 transition-colors last:border-0 hover:bg-primary/5"
                                                    onClick={() => {
                                                        setSelectedUsers([
                                                            ...selectedUsers,
                                                            user.id,
                                                        ]);
                                                        setUserSearch('');
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                                                            <User className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold">
                                                                {user.name}
                                                            </p>
                                                            <p className="text-[10px] font-medium tracking-tight text-muted-foreground uppercase">
                                                                {user.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-full transition-all hover:bg-primary hover:text-white"
                                                    >
                                                        <PlusCircle className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {selectedUsers.length > 0 && (
                                <div className="space-y-3 rounded-2xl border border-border/40 bg-muted/10 p-4">
                                    <Label className="text-[11px] font-extrabold tracking-widest text-muted-foreground uppercase">
                                        Usuarios Seleccionados (
                                        {selectedUsers.length})
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedUsers.map((userId) => {
                                            const user = allUsers.find(
                                                (u: any) => u.id === userId,
                                            );
                                            return user ? (
                                                <div
                                                    key={userId}
                                                    className="detail-card group !mb-0 flex items-center gap-2 !p-1.5 pr-3"
                                                >
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                                                        <User className="h-3 w-3 text-primary" />
                                                    </div>
                                                    <span className="text-xs font-bold">
                                                        {user.name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedUsers(
                                                                selectedUsers.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        userId,
                                                                ),
                                                            )
                                                        }
                                                        className="flex h-5 w-5 items-center justify-center rounded-full bg-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-destructive hover:text-white"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-5">
                            <div className="text-sm font-bold tracking-wider text-primary uppercase">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowDates(!showDates)}
                                    className="ml-auto flex h-8 items-center gap-2 rounded-xl px-3 text-sm"
                                >
                                    {showDates ? (
                                        <>
                                            <CalendarOff className="h-4 w-4" />
                                            Ocultar fechas
                                        </>
                                    ) : (
                                        <>
                                            <CalendarPlus className="h-4 w-4" />
                                            Agregar fechas
                                        </>
                                    )}
                                </Button>
                            </div>

                            {showDates && (
                                <>
                                    <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase">
                                        <Clock className="h-4 w-4" />
                                        <span>Fecha y Hora</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[13px] font-bold">
                                            Inicio
                                        </Label>
                                        <DateTimePicker
                                            date={
                                                form.fecha_inicio
                                                    ? new Date(
                                                          form.fecha_inicio,
                                                      )
                                                    : undefined
                                            }
                                            setDate={(date) =>
                                                setForm({
                                                    ...form,
                                                    fecha_inicio: date
                                                        ? date.toISOString()
                                                        : '',
                                                })
                                            }
                                            className="h-11 rounded-xl border-none bg-muted/30 shadow-inner"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[13px] font-bold">
                                            Fin (Opcional)
                                        </Label>
                                        <DateTimePicker
                                            date={
                                                form.fecha_fin
                                                    ? new Date(form.fecha_fin)
                                                    : undefined
                                            }
                                            setDate={(date) =>
                                                setForm({
                                                    ...form,
                                                    fecha_fin: date
                                                        ? date.toISOString()
                                                        : '',
                                                })
                                            }
                                            className="h-11 rounded-xl border-none bg-muted/30 shadow-inner"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        {/* Submit Actions */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="h-12 w-full rounded-2xl bg-primary font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] hover:bg-primary/90 active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        <span>Procesando...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <PlusCircle className="h-5 w-5" />
                                        <span>Crear Evento Oficial</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <DescriptionModal
                isOpen={isDescriptionModalOpen}
                onClose={() => setIsDescriptionModalOpen(false)}
                description={form.descripcion}
                onDescriptionChange={(newDescription: string) =>
                    setForm({ ...form, descripcion: newDescription })
                }
                title="Detalles del Evento"
            />
        </div>
    );
}
