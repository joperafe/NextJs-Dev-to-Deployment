import EventMap from "components/EventMap";
import EventMapTest from "components/EventMapTest";
import Layout from "../components/Layout";

const test = () => {
  return (
    // <Layout title="Test page">
    <div>
      <h1>Test</h1>
      <div style={{ height: 500 }}>
        {/* <EventMapTest /> */}
        <EventMap evt={{ id: 1, attributes: { address: "Eifel tower" } }} />
      </div>
    </div>
    // </Layout>
  );
};

export default test;
