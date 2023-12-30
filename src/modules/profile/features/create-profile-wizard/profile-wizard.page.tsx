import { CreateProfileWizardContextProvider } from './data-access/context/create-profile-wizard.context';
import ProfileWizard from './features/profile-wizard/profile-wizard';

export function ProfileWizardPage() {
    return (
        <CreateProfileWizardContextProvider>
            <ProfileWizard />
        </CreateProfileWizardContextProvider>
    );
}

export default ProfileWizardPage;
