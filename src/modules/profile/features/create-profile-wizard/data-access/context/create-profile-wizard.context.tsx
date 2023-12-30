import { ComponentType, ReactNode, createContext, useContext, useState } from 'react';

import AboutMe from '../../features/about-me/about-me';
import CareerHighlights from '../../features/career-highlights/career-highlights';
import { EducationAndCertifications } from '../../features/education-and-certifications/education-and-certifications';
import PersonalInformation from '../../features/personal-information/personal-information';
import { useNavigate } from 'react-router-dom';
import Skills from '../../features/skills/skills';

interface Step {
    label: string;
    component: ComponentType;

    route: string;
}

const steps: Step[] = [
    {
        label: 'Personal Information',
        component: PersonalInformation,

        route: 'personal-information',
    },
    {
        label: 'Education & Certifications',
        component: EducationAndCertifications,

        route: 'education-and-certifications',
    },
    {
        label: 'About Me',
        component: AboutMe,

        route: 'about-me',
    },
    {
        label: 'Career Highlights',
        component: CareerHighlights,

        route: 'career-highlights',
    },
    {
        label: 'Skills',
        component: Skills,

        route: 'skills',
    },
];

interface CreateProfileWizardContextState {
    activeStepIndex: number;
    setActiveStepIndex: (index: number) => void;

    steps: Step[];

    nextStep: (profileId: number) => void;
    previousStep: (profileId: number) => void;
}

const initialState: CreateProfileWizardContextState = {
    activeStepIndex: 0,
    setActiveStepIndex: () => {},

    steps: [],

    nextStep: () => {},
    previousStep: () => {},
};

const CreateProfileWizardContext = createContext<CreateProfileWizardContextState>(initialState);

interface CreateProfileWizardContextProviderProps {
    children: ReactNode;
}

export const CreateProfileWizardContextProvider = ({
    children,
}: CreateProfileWizardContextProviderProps) => {
    const navigate = useNavigate();

    const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

    const nextStep = (profileId: number) => {
        const hasNextStep = activeStepIndex < steps.length - 1;

        if (!hasNextStep) {
            return;
        }

        const nextStep = activeStepIndex + 1;

        setActiveStepIndex(nextStep);
        navigate(`/profile/new/${profileId}/${steps[nextStep].route}`);
    };

    const previousStep = (profileId: number) => {
        const hasPreviousStep = activeStepIndex > 0;

        if (!hasPreviousStep) {
            return;
        }

        const previousStep = activeStepIndex - 1;

        setActiveStepIndex((currentStepIndex) => currentStepIndex - 1);
        navigate(`/profile/new/${profileId}/${steps[previousStep].route}`);
    };

    return (
        <CreateProfileWizardContext.Provider
            value={{ activeStepIndex, setActiveStepIndex, steps, nextStep, previousStep }}>
            {children}
        </CreateProfileWizardContext.Provider>
    );
};

export const useCreateProfileWizard = () => useContext(CreateProfileWizardContext);
