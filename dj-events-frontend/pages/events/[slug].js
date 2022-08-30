import { API_URL } from "config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import styles from "../../styles/Event.module.css";

export default function EventPage({ evt }) {
  const router = useRouter();

  // const deleteEvent = async (e) => {
  //   if (confirm("Are you sure?")) {
  //     const res = await fetch(`${API_URL}/events/${evt.id}`, {
  //       method: "DELETE",
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       toast.error(data.message);
  //     } else {
  //       router.push("/events");
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div> */}
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("pt-pt")} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer />
        {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              src={
                evt.attributes.image && evt.attributes.image.data
                  ? evt.attributes.image.data.attributes.url
                  : "/images/event-default.png"
              }
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>

        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href="/events">
          <a className={styles.back}> {"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events?populate=*`);
  const events = await res.json();

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?filters[slug]=${slug}&populate=*`);
  const events = await res.json();

  return {
    props: { evt: events.data[0] },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/slug`);

//   const events = await res.json();

//   return {
//     props: { evt: events[0] },
//   };
// }
