type Division = { amount: number; name: Intl.RelativeTimeFormatUnit };
type Locales = string | string[] | undefined;
type UnitDisplay = 'short' | 'long' | 'narrow' | undefined;

const dateDivisions: Division[] = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' },
];

export const createTimeAgoFormatter = (locales: Locales) => {
    const relativeDateFormatter = new Intl.RelativeTimeFormat(locales);

    return {
        format: (date: Date) => {
            const now = new Date();
            let duration = (date.getTime() - now.getTime()) / 1000;

            for (let i = 0; i < dateDivisions.length; i++) {
                const division = dateDivisions[i];
                if (Math.abs(duration) < division.amount) {
                    return relativeDateFormatter.format(Math.round(duration), division.name);
                }
                duration /= division.amount;
            }
        },
    };
};

const divMod = (n: number, m: number) => [Math.floor(n / m), n % m];

interface DurationFormatterOptions {
    unitDisplay?: UnitDisplay;
    listStyle?: Intl.ListFormatStyle;
    showMilliseconds?: boolean;
}

export const createDurationFormatter = (
    locale: Locales,
    {
        unitDisplay = 'long',
        listStyle = 'long',
        showMilliseconds = false,
    }: DurationFormatterOptions = {}
) => {
    const timeUnitFormatter = (locale: Locales, unit: string, unitDisplay: UnitDisplay) => {
        return Intl.NumberFormat(locale, { style: 'unit', unit, unitDisplay }).format;
    };

    const fmtDays = timeUnitFormatter(locale, 'day', unitDisplay);
    const fmtHours = timeUnitFormatter(locale, 'hour', unitDisplay);
    const fmtMinutes = timeUnitFormatter(locale, 'minute', unitDisplay);
    const fmtSeconds = timeUnitFormatter(locale, 'second', unitDisplay);
    const fmtMilliseconds = timeUnitFormatter(locale, 'millisecond', unitDisplay);

    const listFormatter = new Intl.ListFormat(locale, {
        style: listStyle,
        type: 'conjunction',
    });

    return {
        format: (milliseconds: number) => {
            let days, hours, minutes, seconds;

            [days, milliseconds] = divMod(milliseconds, 864e5);
            [hours, milliseconds] = divMod(milliseconds, 36e5);
            [minutes, milliseconds] = divMod(milliseconds, 6e4);
            [seconds, milliseconds] = divMod(milliseconds, 1e3);

            const formats = [
                days ? fmtDays(days) : '',
                hours ? fmtHours(hours) : '',
                minutes ? fmtMinutes(minutes) : '',
                seconds ? fmtSeconds(seconds) : '',
                showMilliseconds && milliseconds ? fmtMilliseconds(milliseconds) : '',
            ];

            return listFormatter.format(formats.filter((v) => v !== ''));
        },
    };
};
