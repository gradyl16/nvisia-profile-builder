import { Route, Routes } from 'react-router-dom';

import { Container } from '@mui/material';
import CreateProfile from './features/create-profile/create-profile';
import Header from './features/header/header';
import PreviewProfile from './features/preview-profile/preview-profile';
import ProfileLayout from './layout/profile.layout';
import ProfileWizardPage from './features/create-profile-wizard/profile-wizard.page';

export function ProfilePage() {
    return (
        <ProfileLayout>
            <Header />

            <Container maxWidth="md" sx={{ height: 'fit-content' }}>
                <Routes>
                    <Route path="/" element={<CreateProfile />} />
                    <Route path="new" element={<ProfileWizardPage />} />
                    <Route path="new/:profileId/:step" element={<ProfileWizardPage />} />
                    <Route path="preview" element={<PreviewProfile />} />
                </Routes>
            </Container>
        </ProfileLayout>
    );
}

export default ProfilePage;
