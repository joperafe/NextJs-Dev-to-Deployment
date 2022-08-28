import styles from "@/styles/DashboardEvent.module.css";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";

export default function DashboardEvent({ evt, handleDelete }) {
  console.log("this evt ", evt);
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.attributes.slug}`}>
          <a>{evt.attributes.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt />
          <span> Edit Event</span>
        </a>
      </Link>
      <a href="#" className={styles.delete} onClick={() => handleDelete(evt.id)}>
        <span> Delete Event</span>
      </a>
      <p></p>
    </div>
  );
}
