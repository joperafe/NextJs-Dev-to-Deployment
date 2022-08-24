import EventItem from "components/EventItem";
import Layout from "components/Layout";
import Pagination from "components/Pagination";
import { API_URL, PER_PAGE } from "config";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt.attributes} />;
      })}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?populate=*&_sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
  );
  const events = await eventRes.json();

  return {
    props: {
      events: events.data || [],
      page: +page,
      total: total.data.length,
    },
    // revalidate: 1,
  };
}
