import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Historys from '../components/Historys';
import styles from './Detail.module.css';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [characterDetail, setCharacterDetail] = useState({});

  const getCharactorDetail = async () => {
    const json = await (
      await fetch(
        `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`
      )
    ).json();
    setCharacterDetail(json.data.results[0]);
    console.log(json.data.results[0]);
    setLoading(false);
  };

  useEffect(() => {
    getCharactorDetail();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.characterDetail}>
          <div className={styles.characterImage}>
            <img
              src={`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`}
              alt={characterDetail.name}
            />
          </div>
          <div className={styles.characterDescription}>
            <span>{characterDetail.name}</span>
            <Historys historys={characterDetail.events}>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
