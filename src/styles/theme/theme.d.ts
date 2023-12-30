import '@mui/material/styles';

interface PaletteColorOptions {
    main: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
}

declare module '@mui/material/styles' {
    interface Palette {
        nvisiaRedOrange: PaletteColorOptions;
        nvisiaNavyBlue: PaletteColorOptions;
        nvisiaMarigoldYellow: PaletteColorOptions;
        nvisiaSteelBlue: PaletteColorOptions;
        nvisiaPowderBlue: PaletteColorOptions;
        nvisiaGrayscale: PaletteColorOptions;
    }

    interface PaletteOptions {
        nvisiaRedOrange?: PaletteColorOptions;
        nvisiaNavyBlue?: PaletteColorOptions;
        nvisiaMarigoldYellow?: PaletteColorOptions;
        nvisiaSteelBlue?: PaletteColorOptions;
        nvisiaPowderBlue?: PaletteColorOptions;
        nvisiaGrayscale?: PaletteColorOptions;
    }

    interface Theme {
        nvisiaRedOrange: PaletteColorOptions;
        nvisiaNavyBlue: PaletteColorOptions;
        nvisiaMarigoldYellow: PaletteColorOptions;
        nvisiaSteelBlue: PaletteColorOptions;
        nvisiaPowderBlue: PaletteColorOptions;
        nvisiaGrayscale: PaletteColorOptions;
    }

    interface ThemeOptions {
        nvisiaRedOrange?: PaletteColorOptions;
        nvisiaNavyBlue?: PaletteColorOptions;
        nvisiaMarigoldYellow?: PaletteColorOptions;
        nvisiaSteelBlue?: PaletteColorOptions;
        nvisiaPowderBlue?: PaletteColorOptions;
        nvisiaGrayscale?: PaletteColorOptions;
    }
}
