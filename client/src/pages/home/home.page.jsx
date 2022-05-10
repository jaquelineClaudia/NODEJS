import { useState, useEffect } from 'react';

// Components
import TransferForm from '../../components/transfers/transfer-form/transfer-form.component';
import TransferHistory from '../../components/transfers/transfer-history/transfer-history.component';
import Button from '../../components/ui/button/button.component';

import classes from './home.module.css';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();
	const user = useSelector(state => state.users.user);

	const hideModalHandler = () => {
		setShowModal(false);
	};

	const showModalHandler = () => {
		setShowModal(true);
	};

	useEffect(() => {
		if(!user) navigate('/login');
	}, [user]);

	return (
		<div className={classes.container}>
			<div className={classes['transaction-container']}>
				<p>Need to send money? Click this button!</p>
				<p>Available amount: $500.00</p>
				<Button onClick={showModalHandler}>New transfer</Button>
			</div>

			{showModal && <TransferForm onHideModal={hideModalHandler} />}

			<div className={classes['transfers-list']}>
				<p className={classes['transfers-list__header']}>
					Your most recents transfers
				</p>
				<TransferHistory />
			</div>
		</div>
	);
};

export default Home;
