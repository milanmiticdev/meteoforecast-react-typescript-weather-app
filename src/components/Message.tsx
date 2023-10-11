import { useContext } from 'react';
import AppContext from '../contexts/AppContext.js';
import styles from './Message.module.css';

const Message = (): JSX.Element => {
	const { message } = useContext(AppContext);

	return <p className={styles.message}>{message}</p>;
};

export default Message;
