export interface ItemType extends Document {
    id: string;
    name: string;
}

export interface ItemList {
    id: string;
    name: string;
    items: ItemType[];
    user: User;
    invitedGuests: User[];
    guests: User[];
}

export interface User {
    id: string;
    name: string;
    token: string;
    listInvitations: ItemList[];
    activeList: ItemList;
}