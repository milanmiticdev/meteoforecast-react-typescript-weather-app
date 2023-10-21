// Hooks
import { useContext } from 'react';

// Context
import AppContext from '../contexts/AppContext.js';

// Styles
import styles from './Message.module.css';

const Message = (): JSX.Element => {
	const { message } = useContext(AppContext);

	return <p className={styles.message}>{message}</p>;
};

export default Message;
