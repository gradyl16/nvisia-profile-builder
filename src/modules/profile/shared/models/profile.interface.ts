import { Highlight } from "./career-highlights.interface";
import { Certification } from "./certifications.interface";
import { Education } from "./educations.interface";
import { Skill } from "./skills.interface";
import { Title } from "./title.interface";

export interface Profile {
    profileId: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    yearsOfExperience: number;
    aboutMe: string;
    titleCode: Title;
    certifications: Certification[];
    educations: Education[];
    highlights: Highlight[];
    skills: Skill[];
}
