interface PostItem {
    title: string;
    content: string;
    createdAt: string;
    idx: Number;
    _id: string;
}

interface PostSearchItem {
    idx: Number,
    words: string;
}

export type {
    PostItem,
    PostSearchItem
}