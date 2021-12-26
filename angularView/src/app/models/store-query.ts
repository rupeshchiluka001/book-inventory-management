import { Store } from "./store";

export interface StoreQuery {
    stores: Store[],
    current: number,
    pages: number,
    value: string
}
