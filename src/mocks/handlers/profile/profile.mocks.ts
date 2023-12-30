import { Highlight } from '@src/modules/profile/shared/models/career-highlights.interface';
import { Profile } from '@src/modules/profile/shared/models/profile.interface';
import { Skill, SkillOption } from '@src/modules/profile/shared/models/skills.interface';
import { Title } from '@src/modules/profile/shared/models/title.interface';


const titles: Title[] = [
    {
        titleCodeId: 1,
        code: 'sd',
        description: 'Software Developer',
    },
    {
        titleCodeId: 2,
        code: 'se',
        description: 'Software Engineer',
    },
    {
        titleCodeId: 3,
        code: 'tl',
        description: 'Team Lead',
    },
    {
        titleCodeId: 4,
        code: 'ta',
        description: 'Technical Architect',
    },
    {
        titleCodeId: 5,
        code: 'sta',
        description: 'Senior Technical Architect',
    },
    {
        titleCodeId: 6,
        code: 'parc',
        description: 'Principal Architect',
    },
    {
        titleCodeId: 7,
        code: 'tf',
        description: 'Technical Fellow',
    },
    {
        titleCodeId: 8,
        code: 'pd',
        description: 'Product Dude',
    },
    {
        titleCodeId: 9,
        code: 'pm',
        description: 'Project Manager',
    },
];

const getCareerHighlightsResponse: Highlight[] = [
    {
        title: 'Lead a Major Project',
        description:
            'Led the development and launch of a new product, resulting in a 20% increase in customer engagement.',
    },
    {
        title: 'Awesome Software Person',
        description: 'Promise, I am the best.',
    },
    {
        title: 'President of the Software',
        description: 'It always work on my machine.',
    },
];

const getSkillsResponse: Skill[] = [
    {
        skillCodeId: 0,
        skillId: 0,
        description: 'I am good at AWS',
    },
    {
        skillCodeId: 1,
        skillId: 1,
        description: 'I am good at Java',
    },
    {
        skillCodeId: 2,
        skillId: 2,
        description: 'I am good at React',
    },
    {
        skillCodeId: 3,
        skillId: 3,
        description: 'I am good at JavaScript',
    },
    {
        skillCodeId: 4,
        skillId: 4,
        description: 'I am good at ...',
    },
    {
        skillCodeId: 5,
        skillId: 5,
        description: 'I am good at .....',
    },
    {
        skillCodeId: 6,
        skillId: 6,
        description: 'I am good at ...',
    },
];

const getSkillsOptions: SkillOption[] = [
    {
        skillCodeId: 0,
        label: '',
    },
    {
        skillCodeId: 1,
        label: 'Java',
    },
    {
        skillCodeId: 2,
        label: 'React',
    },
    {
        skillCodeId: 3,
        label: 'Super Skill',
    },
    {
        skillCodeId: 4,
        label: 'Leadership',
    },
    {
        skillCodeId: 5,
        label: 'Budget Management',
    },
    {
        skillCodeId: 6,
        label: 'Agile Methodologies',
    },
];

const getProfileById = (profileId: string): Profile => ({
    profileId: parseInt(profileId),
    firstName: 'Jane',
    lastName: 'Doe',
    emailAddress: 'janedoecool@gmail.com',
    yearsOfExperience: 5,
    aboutMe: "string",
    titleCode: {
        titleCodeId: 0,
        code: "string",
        description: "string",
    },
    certifications: [
        {
            title: "AWS Certified Developer - Associate",
            year: 2021,
        },
        {
            title: "Azure Developer Associate",
            year: 2023,
        },
    ],
    educations: [
        {
            schoolName: "University of Illinois (Chicago)",
            graduationYear: 2020,
            majorDegreeName: "Computer Science",
            minorDegreeName: "Mathematics",
        },
        {
            schoolName: "DePaul University Chicago",
            graduationYear: 2022,
            majorDegreeName: "Computer Engineering",
            minorDegreeName: "Business",
        },
    ],
    highlights: [
        {
            title: "string",
            description: "string",
        },
    ],
    skills: [
        {
            skillCodeId: 1,
            description: 'I am good at AWS',
        },
        {
            skillCodeId: 2,
            description: 'I am good at AWS',
        },
        {
            skillCodeId: 3,
            description: 'I am good at AWS',
        },
        {
            skillCodeId: 4,
            description: 'I am good at AWS',
        },
        {
            skillCodeId: 5,
            description: 'I am good at AWS',
        },
        {
            skillCodeId: 6,
            description: 'I am good at AWS',
        },
    ],
});

export const ProfileMocks = {
    titles,
    getCareerHighlightsResponse,
    getSkillsResponse,
    getSkillsOptions,
    getProfileById,
};
