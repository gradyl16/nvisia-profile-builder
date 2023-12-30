/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse, delay, http } from 'msw';
import { ProfileMocks } from './profile.mocks';

const putEducation = http.put('*/education/batch', async () => {
    await delay();

    return HttpResponse.json({}, { status: 200 });
});

const putSkill = http.put('*/skill/batch', async () => {
    await delay();

    return HttpResponse.json({}, { status: 200 });
});

const getSkillOptions = http.get('*/skillcode', async () => {
    await delay();

    return HttpResponse.json(ProfileMocks.getSkillsOptions, { status: 200 });
});

const putCareerHighlights = http.put('*/highlight/batch', async () => {
    await delay();

    return HttpResponse.json({}, { status: 200 });
});

const putAboutMe = http.put('*/profile/about', async () => {
    await delay();

    return HttpResponse.json({}, { status: 200 });
});

const putCertification = http.put('*/certification/batch', async () => {
    await delay();

    return HttpResponse.json({}, { status: 200 });
});

const getCareerHighlights = http.get('*/highlight', async () => {
    await delay();

    return HttpResponse.json(ProfileMocks.getCareerHighlightsResponse, { status: 200 });
});

const getTitles = http.get('*/titlecode', async () => {
    await delay();

    return HttpResponse.json(ProfileMocks.titles, { status: 200 });
});

const getTitles500Error = http.get('*/titlecode', async () => {
    await delay();

    return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
});

const getProfileById = http.get('*/profile/:profileId', async ({ params }) => {
    await delay();
    const mockData = ProfileMocks.getProfileById(params.profileId as string);
    return HttpResponse.json(mockData, { status: 200 });
});

const createProfile = http.post('*/profile', async ({ request }) => {
    await delay();

    const body = await request.json();
    const bodyParams = (body?.valueOf() as any) ?? {};

    const profile = {
        // Random number between 1 - 100000 to simulate a random profile ID.
        profileId: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        ...bodyParams,
    };

    return HttpResponse.json(profile, { status: 200 });
});

const createProfile500Error = http.post('*/profile', async () => {
    await delay();

    return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
});

export const ProfileHandlers = {
    getTitles,
    getTitles500Error,
    createProfile,
    createProfile500Error,
    putEducation,
    putCertification,
    getProfileById,
    putCareerHighlights,
    getCareerHighlights,
    putAboutMe,
    putSkill,
    getSkillOptions,
};
