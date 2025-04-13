import Link from "next/link";
import { getBooksByCategory } from "../../../service/book-service"
import styles from "../../../styles/list.module.css";

export default async function BookList({ params }) {
  const { id } = await params
  const books = await getBooksByCategory(id);

  return (
    <div className={styles.div}>
      <div>
        <span>Business Books</span>
        <div>
          {books.map((item, index) => 
            {
                return (
                    <div key={index}>
                        <img src={item.book_image}></img>
                        <span>{item.title}</span>
                        <span>{item.author}</span>
                        <div><Link href={item.amazon_product_url}>Buy now →</Link></div>
                    </div>
                )
            }
          )}
        </div>
      </div>
    </div>
  )
}
