import { ReactNode } from 'react';
import styles from './profile.layout.module.scss';

interface ProfileLayoutProps {
    children: ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
    return <div className={styles['container']}>{children}</div>;
}

export default ProfileLayout;
