import { ProfileHandlers } from './handlers/profile/profile.handlers';


export const handlers = [
    ProfileHandlers.getTitles, 
    ProfileHandlers.createProfile,
    ProfileHandlers.putEducation,
    ProfileHandlers.putCertification,
    ProfileHandlers.getProfileById,
    ProfileHandlers.getCareerHighlights,
    ProfileHandlers.putCareerHighlights,
    ProfileHandlers.putAboutMe,
    ProfileHandlers.getSkillOptions,
    ProfileHandlers.putSkill,
    ProfileHandlers.getProfileById,
];
