import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout";
import styles from "@/styles/Form.module.css";
import { useRouter } from "next/router";

export default function AddEventPage() {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>AddEventPage</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" name="name" id="name" value={values.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="performers">Event Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Event Venue</label>
            <input type="text" name="venue" id="venue" value={values.venue} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="address">Event Address</label>
            <input type="text" name="address" id="address" value={values.address} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="date">Event Date</label>
            <input type="date" name="date" id="date" value={values.date} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="time">Event Time</label>
            <input type="text" name="time" id="time" value={values.time} onChange={handleInputChange} />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}
