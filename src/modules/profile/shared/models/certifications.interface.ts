export interface Certification {
	title: string;
	year: number;
}

export interface Certifications {
    profileId: string;
    certifications: Certification[];
}