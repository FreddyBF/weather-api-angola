
export type LocationProps = {
    id: number;
    name:string;
    slug: string;
    province: string;
    lat: number;
    lon: number;
}

class LocationEntity {

    private constructor(private readonly props: LocationProps) {}

    public static create(props: LocationProps): LocationEntity {
        return new LocationEntity(props);
    }

    public static restore(props: LocationProps): LocationEntity {
        return new LocationEntity(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get slug() {
        return this.props.slug;
    }

    public get province() {
        return this.props.province;
    }

    public get lat() {
        return this.props.lat;
    }

    public get lon() {
        return this.props.lon;
    }
}

export { LocationEntity }