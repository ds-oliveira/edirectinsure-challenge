import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router'
import styles from './board.module.css'
import Button from './button'


export default function Board({ children, userName }) {
    const router = useRouter()

    const removeCookies = () => {
        cookieCutter.set('token', '', { expires: new Date(0) })
        router.push("/")
    }

    return (
        <div className={styles.board}>
            <div className={styles.header}>
                EDirectinsure TODO List
                <div className={styles.userInfo}>
                    <span>{userName}</span>&nbsp;
                    <Button backgroundColor="red" float="right" marginTop="5px" clickFunction={removeCookies}>SIGN OUT</Button>
                </div>
            </div>
            <div className={styles.body}>{children}</div>
        </div>
    )
}