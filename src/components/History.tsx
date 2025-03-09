import PropTypes from 'prop-types';

function History({ name }) {
  return <span>{name}</span>;
}

History.propTypes = {
  name: PropTypes.string.isRequired,
};

export default History;
