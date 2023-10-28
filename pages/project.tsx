import { useEffect, useState } from "react";
import { gSSP } from "app/blitz-server";
import { SessionContext } from "@blitzjs/auth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Props = {
  userId: unknown;
  publicData: SessionContext["$publicData"];
};

const fetchAPI = async (): Promise<{
  items: Record<string, any>[];
  count: number;
}> => {
  const response = await axios.get(
    `https://azki8at90f.execute-api.us-east-1.amazonaws.com`
  );
  return response.data;
};

export const getServerSideProps = gSSP<Props>(async ({ ctx }) => {
  const { session } = ctx;
  if (!session.userId) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        userId: session.userId,
        publicData: session.$publicData,
      },
    };
  }
});

export default function Home() {
  const [motorState, setMotorState] = useState("OFF");
  useEffect(() => {
    const websocket = new WebSocket(
      "wss://nmuhd2ezxc.execute-api.us-east-1.amazonaws.com/production"
    );
    websocket.onopen = () => {
      console.log("Connected to WebSocket");
    };
    websocket.onmessage = (event) => {
      console.log("Message received from server: ", event.data);
      setMotorState(event.data);
    }
    return () => {
      websocket.close();
    };
  }, []);
  const { data } = useQuery({
    queryKey: ["api"],
    queryFn: () => fetchAPI(),
    refetchInterval: 5000,
    suspense: false,
  });
  return (
    <>
      {motorState}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {data?.items
            .sort((a, b) => a.id - b.id)
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ color: item.color }}>{item.soil}</td>
                <td>{item.state}</td>
              </tr>
            ))}
          <tr>
            <td>Total</td>
            <td>{data?.count}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

Home.suppressFirstRenderFlicker = true;
