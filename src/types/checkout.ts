import { Route } from "./route";

// ROUTE
export type RouteForm = {
    currentRoutes: Route[];
};

// ABOUT
export type AboutForm = {
    dateOfUpload: string;
    timeOfArrival: string;
    cargoWeight: string;
    typeOfCargo: string;
    cargoSize: {
        length: string;
        weight: string;
        height: string;
        unit: string;
    };
    forwardingService: boolean;
    totalPrice: number;
};

// LEAVE A COMMENT
export type CommentForm = {
    leaveComment: string;
}

// CONTACT INFO
export type ContactForm = {
    contact: {
        fullName: string;
        email: string;
        phoneNumber: string;
    }
}
