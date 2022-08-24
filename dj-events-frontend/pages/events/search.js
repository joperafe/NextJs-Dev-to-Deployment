import { useRouter } from "next/router";
import qs from "qs";
import EventItem from "components/EventItem";
import Layout from "components/Layout";
import { API_URL } from "config";
import Link from "next/link";

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/events">Go back</Link>
      <h1>Search Results for {router.query.term}</h1>

      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt.attributes} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          { name: { $contains: term } },
          {
            performers: { $contains: term },
          },
          { description: { $contains: term } },
          { venue: { $contains: term } },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const res = await fetch(`${API_URL}/events?${query}`);
  // const res = await fetch(`${API_URL}/events?filters[name][$contains]=${term}`);
  const events = await res.json();

  return {
    props: {
      events: events.data,
    },
    // revalidate: 1,
  };
}
