export interface User {
    getLists: any;
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    lists: List[];
}

export interface List{
    id: string;
    name: string;
    gamesIds: string[];
}
