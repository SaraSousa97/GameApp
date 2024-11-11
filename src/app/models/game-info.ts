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
    minimumSystemRequirements: string;
    screenshots: ListScreenshots[];
}

export interface ListScreenshots{
    id: string;
    image: string;
}
