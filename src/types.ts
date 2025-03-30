type CoinsType = {
    coins: number
}

type AddUrlErrorType = {
    url?:String,
    user_id?:String
}

type SummaryType ={
    url: string;
    user_id: number;
    title: string;
    id: string;
    created_at: Date;
    response: string | null;
}