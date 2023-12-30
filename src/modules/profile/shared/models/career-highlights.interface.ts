{/* Interface for an individual highlight*/}
export interface Highlight {
    title: string;
    description: string;
}

{/* Interface to be sent to the API*/}
export interface CareerHighlights {
    profileId: string;
    highlights: Highlight[];
}

