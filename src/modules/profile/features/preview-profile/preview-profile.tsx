import About from './about';
import { Box } from '@mui/system';
import CareerHighlights from './career-highlights';
import Divider from './divider';
import EducationAndCertificates from './education-and-certifications';
import Header from './header';
import Skills from './skills';
import styles from './preview-profile.module.scss';

export function PreviewProfile() {
    return (
        <Box className={styles['container']}>
            <Header />
            <Box className={styles['sections-container']}>
                <Box display="flex" flexDirection="column" gap={4}>
                    <CareerHighlights />
                    <EducationAndCertificates />
                </Box>
                <Divider />
                <Box display="flex" flexDirection="column" gap={4}>
                    <Skills />
                    <About />
                </Box>
            </Box>
        </Box>
    );
}

export default PreviewProfile;
