export interface Education {
	schoolName: string;
	graduationYear: number;
	majorDegreeName: string;
	minorDegreeName: string;
}

export interface Educations {
    profileId: string;
    educations: Education[];
}