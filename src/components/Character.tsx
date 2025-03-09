import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Character.module.css';

function Character({ id, name, thumbnailUrl }) {
  return (
    <div className={styles.character}>
      <img src={thumbnailUrl} alt={name} className={styles.character__img} />
      <div>
        <h2 className={styles.character__name}>
          <Link to={`/marvel/${id}`}>{name}</Link>
        </h2>
      </div>
    </div>
  );
}

Character.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
};

export default Character;
