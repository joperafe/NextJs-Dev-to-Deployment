import Layout from "../components/Layout";
import { API_URL } from "../config/index";
import EventItem from "components/EventItem";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt.attributes} />;
      })}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/events?populate=*&_sort=date:ASC&_limit=3`);
  // const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  return {
    props: {
      events: events.data,
    },
    // revalidate: 1,
  };
}
