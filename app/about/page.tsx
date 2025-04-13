import Link from "next/link";
import { getBestSellerCategorys } from "../../service/book-service"
import styles from "../../styles/about.module.css";


export default async function About() {
  const bestSellerCategorys = await getBestSellerCategorys();

  return (
    <div className={styles.div}>
      <div>
        <span>The New York Times Best Seller Explorer</span>
        <div>
            <p>Welcome to the official explorer for the New York Times Best Seller list exploere.</p>
            <p>We hope you enjoy stay!</p>
        </div>
      </div>
    </div>
  )
}