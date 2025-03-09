import PropTypes from 'prop-types';
import History from './History';
import styles from './Historys.module.css';

function Historys({ historys }) {
  return <div>{historys.items.map(history => <History name={history.name}>)}</div>;
}

Historys.propTypes = {
  historys: PropTypes.array.isRequired,
};

export default Historys;
