import { AxiosApiResponse } from '../models/axios-api-response.interface';
import { AxiosError } from 'axios';
import { PersonalInformationFormSchema } from '@src/modules/profile/features/create-profile-wizard/features/personal-information/personal-information-form.schema';
import { Profile } from '@src/modules/profile/shared/models/profile.interface';
import { Title } from '@src/modules/profile/shared/models/title.interface';
import api from '../api.client';
import { Education } from '@src/modules/profile/shared/models/educations.interface';
import { Certification } from '@src/modules/profile/shared/models/certifications.interface';
import { Highlight } from '@src/modules/profile/shared/models/career-highlights.interface';
import { Skill, SkillOption } from '@src/modules/profile/shared/models/skills.interface';

interface CreateProfileRequestParams extends PersonalInformationFormSchema {
    emailAddress: string;
}

const getTitles = async (): Promise<AxiosApiResponse<Title[]>> => {
    try {
        const response = await api.get<Title[]>('/titlecode');

        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const createProfile = async (
    params: CreateProfileRequestParams
): Promise<AxiosApiResponse<Profile>> => {
    try {
        const body = { ...params };
        const response = await api.post<Profile>('/profile', body);

        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const putEducation = async (params: { profileId: string; educations: Education[] }): Promise<AxiosApiResponse<Education[]>> => {
    try {
        const body = { ...params };
        const response = await api.put<Education[]>('/education/batch', body);
        
        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const putCareerHighlights = async (data: { profileId: string; highlights: Highlight[] }): Promise<AxiosApiResponse<Highlight[]>> => {
    try {
        const response = await api.put('/highlight/batch', data);

        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const putAboutMe = async (params: { profileId: string; aboutMe: string }): Promise<AxiosApiResponse<Profile>> => {
    try {
        const body = { ...params };
        const response = await api.put<Profile>('/profile/about', body);
        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const putCertification = async (params: { profileId: string; certifications: Certification[] }): Promise<AxiosApiResponse<Certification[]>> => {
    try {
        const body = { ...params };
        const response = await api.put<Certification[]>('/certification/batch', body);
        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const getCareerHighlights = async (profileId: string): Promise<AxiosApiResponse<Highlight[]>> => {
    try {
        console.log('got the profileId', profileId);
        const response = await api.get('/highlight');

        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const putSkill = async (data: {
    profileId: string;
    skills: Skill[];
}): Promise<AxiosApiResponse<Skill[]>> => {
    try {
        const response = await api.put('/skill/batch', data);

        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const getSkillOptions = async (): Promise<AxiosApiResponse<SkillOption[]>> => {
    try {
        const response = await api.get('/skillcode');

        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

const getProfileById = async (profileId: string): Promise<AxiosApiResponse<Profile>> => {   //----------------------ADDED
    try {
        const response = await api.get(`/profile/${profileId}`); 

        return { response: response.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

export const ProfileService = {
    getTitles,
    createProfile,
    putEducation,
    putCertification,
    getProfileById,
    putCareerHighlights,
    getCareerHighlights,
    putAboutMe,
    putSkill,
    getSkillOptions,
};
