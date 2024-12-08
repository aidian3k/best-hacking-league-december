export type BodiesPositionsResponse = {
    data: {
        dates: DateRange,
        observer: ObserverData,
        table: TableData,
    }
}

export type DateRange = {
    from: Date;
    to: Date;
}

export type ObserverData = {
    location: {
        longitude: number;
        latitude: number;
        elevation: number;
    }
}

export type TableData = {
    header: string[];
    rows: RowData[]
}

export type RowData = {
    entry: EntryData;
    cells: CelestialBody[]
}

export type EntryData = {
    id: string;
    name: string;
}

export type CelestialBody = {
    id: string;
    name: string;
    distance: {
        fromEarth: {
            au: string;
            km: string;
        };
    };
    position: {
        horizontal: {
            altitude: {
                degrees: number;
                string: string;
            };
            azimuth: {
                degrees: number;
                string: string;
            };
        };
        horizonal: {
            altitude: {
                degrees: number;
                string: string;
            };
            azimuth: {
                degrees: number;
                string: string;
            };
        };
        equatorial: {
            rightAscension: {
                hours: number;
                string: string;
            };
            declination: {
                degrees: number;
                string: string;
            };
        };
        constellation: {
            id: string;
            short: string;
            name: string;
        };
    };
    extraInfo?: {
        elongation?: number;
        magnitude?: number;
        phase?: {
            angel: number;
            fraction: number;
            string: string;
        };
    };
}
