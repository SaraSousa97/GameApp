export interface GameInfo {
    id: string;
    title: string;
    thumbnail: string;
    status: string;
    shortDescription: string;
    gameURL: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    releaseDate: string;
    freetogameProfileUrl: string;
    minimumSystemRequirements: minimumSystemRequirements;
    screenshots: ListScreenshots[];
}

export interface ListScreenshots{
    id: string;
    image: string;
}

export interface minimumSystemRequirements{
    graphics: string;
    memory: string;
    os: string;
    processor: string;
    storage: string;
}
