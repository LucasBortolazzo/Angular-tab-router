import { Route } from "@angular/compiler/src/core";

export interface Tab {
    name: string;
    component: any;
    active: boolean;
    route: Route | null;
    key: string;
}
