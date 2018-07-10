export interface ISession {
    id: number;
    title: string;
    description: string;
    startsAt: string;
    endsAt: string;
    isServiceSession: boolean;
    isPlenumSession: boolean;
    speakers: string[];
    categoryItems: number[];
    questionAnswers: IQuestion[];
    roomId: number;
    room?: ISortableObject;
}

export interface ISpeaker {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
    tagLine?: string;
    profilePicture?: string;
    isTopSpeaker?: boolean;
    links: ILink[];
    sessions: number[];
    fullName: string;
}

export interface ILink {
    title: string;
    url: string;
    linkType: string;
}

export interface IQuestion {
    question?: string;
}

export interface ISortableObject {
    id: number;
    name: string;
    sort: number;
}

export interface ICategory {
    id: number;
    title: string;
    items: ISortableObject[];
}

export interface IConferenceInfo {
    sessions: ISession[];
    speakers: ISpeaker[];
    questions: IQuestion[];
    categories: ICategory[];
    rooms: ISortableObject[];
}
