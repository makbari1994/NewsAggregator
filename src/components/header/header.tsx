
import react from 'react';
import styles from './header.module.scss';
const Header = () => {


    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>News aggregator</div>
            </div>
        </>
    )
}

export default Header;