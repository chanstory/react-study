import Link from "next/link";
import { getBestSellerCategorys } from "../../service/book-service"
import styles from "../../styles/home.module.css";


export default async function Home() {
  const bestSellerCategorys = await getBestSellerCategorys();

  return (
    <div className={styles.div}>
      <div>
        <span>The New York Times Best Seller Explorer</span>
        <div>
          {bestSellerCategorys.map((item, index) => 
            <Link href={`/list/${item.list_name_encoded}`} key={index}>{item.display_name} →</Link>
          )}
        </div>
      </div>
    </div>
  )
}