//@ts-nocheck
import Head from "next/head";
import useSWR from "swr";
import { SegmentedControl } from '@mantine/core';
import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@mantine/core";
import Navbar from "../components/navbar";
import { io } from "socket.io-client";
import { LineChart } from "@carbon/charts-react";
import { createStyles, Table, ScrollArea } from '@mantine/core';
import { useCurrentUser } from "app/users/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import Link from "next/link";
import { useRouter } from "next/router";
import {gSSP} from "app/blitz-server"

type Props = {
  userId: unknown
  publicData: SessionContext["$publicData"]
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const getServerSideProps = gSSP<Props>(async ({ctx}) => {
  const {session} = ctx
  if(!session.userId) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false
      }
    }
  }else{
    return {
      props: {
        userId: session.userId,
        publicData: session.publicData
      }
    }
  }
})

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
        }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const UserInfo = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
        className="button small"

          onClick={async () => {
            await logoutMutation().then(() => {
              router.push(Routes.LoginPage())
            })
          }}
        >
          Logout
        </button>
        <style jsx >
        {`
          .buttons {
            display: grid;
            grid-auto-flow: column;
            grid-gap: 0.5rem;
          }
          .button {
            font-size: 1rem;
            background-color: #6700eb;
            padding: 1rem 2rem;
            color: #f4f4f4;
            text-align: center;
          }

          .button.small {
            padding: 0.5rem 1rem;
          }

          .button:hover {
            background-color: #45009d;
          }

          .button-outline {
            border: 2px solid #6700eb;
            padding: 1rem 2rem;
            color: #6700eb;
            text-align: center;
          }

          .button-outline:hover {
            border-color: #45009d;
            color: #45009d;
          }
        `}
      </style>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} passHref>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()} passHref>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

export default function Home() {
  const [esp8266, setesp8266] = useState(false);
  const [esp32, setesp32] = useState(false);
  const { classes, cx } = useStyles();
  const [activePage, setActivePage] = useState("col");
  const [scrolled, setScrolled] = useState(false);
  function checkGroupH(group) {
    if (group.group === "heat") {
      return true
    }
    else {
      return false
    }
  }
  function checkGroupS(group) {
    if (group.group === "soil") {
      return true
    }
    else {
      return false
    }
  }
  const { data, error } = useSWR(
    "https://drts-jcomp-20bps1042.herokuapp.com/API",
    fetcher,
    {
      refreshInterval: 200
    }
  );
  const { data: data2, error: error2 } = useSWR(
    "https://drts-jcomp-20bps1042.herokuapp.com/responseTime",
    fetcher,
    {
      refreshInterval: 200
    }
  );
  useEffect(() => {
    const socket = io("https://drts-jcomp-20bps1042.herokuapp.com/");
    socket.on("esp8266", (data) => {
      console.log("ESP8266 Connection State ", data);
      setesp8266(data);
    })
    socket.on("esp32", (data) => {
      console.log("ESP32 Connected State ", data);
      setesp32(data);
    });
    socket.on("pumpState", (data) => {
      console.log("Pump State", data);
    }
    )
    socket.on("setSpeed", (data) => {
      console.log("Speed: ", data);
    });
  }, []);
  if (error || error2) return <div>Error...</div>;
  if (!data || !data2) return <div>Loading...</div>;
  console.log(data);
  console.log(data2);
  const resultH = data.readings.filter(checkGroupH);
  const resultS = data.readings.filter(checkGroupS);
  //Get the last reading
  const lastReadingS = resultS[resultS.length - 1];
  console.log(resultH);
  console.log(resultS);
  const rowsH = resultH.map((row) => {
    const time = new Date(row.time);
    return (
      <tr key={row.time}>
        <td>{time.toLocaleString()}</td>
        <td className="font-semibold">{row.heat}</td>
      </tr>
    )
  });
  const difference = [];
  const rowsS = resultS.map((row) => {
    const time = new Date(row.time);
    return (
      <tr key={row.time} className="font-semibold">
        <td className="font-normal">{time.toLocaleString()}</td>
        {row.soil < 3800 ? <td className="text-blue-700">{row.soil} - Wet</td> : <td className="text-amber-800">{row.soil} - Dry</td>}
        {row.state ? <td className="text-green-600">ON</td> : <td className="text-red-600">OFF</td>}
      </tr>
    )
  });
  const a3 = data2.esp32req.map(t1 => ({...t1, ...data2.esp8266acks.find(t2 => t2.id === t1.id)}))
  console.log("Merged",a3);
  const timediff = a3.map((row) => {
    const time32 = new Date(row.timeesp32);
    const time26 = new Date(row.timeesp8266);
    const diff = time26.getTime() - time32.getTime();
    //convert to seconds
    const seconds = diff / 1000;
    difference.push({
      group:"responseTime",
      diff:seconds,
      id:row.id
    });
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{time32.toLocaleString()}</td>
        <td>{time26.toLocaleString()}</td>
        <td>{diff}</td>
      </tr>
    )
  });
  console.log("Time Difference",difference)
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-2 ">
      <Head>
        <title>CSE2026 | Presentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar color="black"></Navbar>
      <div className="p-10 relative w-full max-w-lg">
        <div className="animate-blob absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
        <div className="animate-blob absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
      </div>
      <div className="text-xl font-bold text-center ">
        CSE2026 Cloud Computing      </div>
      <div className="text-6xl font-extrabold text-center  p-5">
        Real Time Irrigation System
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserInfo />
      </Suspense>
      <div className="text-2xl font-bold text-center pb-10">
        Project Page
      </div>
      <div class="p-10 flex items-center space-x-10 hover:space-x-4 font-bold">
        {esp8266
          ? <button
            className="z-5 block p-4 font-bold text-green-700 transition-all bg-green-100 filter rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
            type="button"
          >
            Connected to ESP8266
          </button>
          : <button
            className="z-5 block p-4 font-bold text-red-700 transition-all bg-red-100 filter rounded-full active:bg-red-50 hover:scale-110 focus:outline-none focus:ring"
            type="button"
          >
            Disconneted from ESP8266
          </button>
        }
        <button
            class="z-5 block p-4 font-bold text-blue-700 transition-all bg-blue-100 filter rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
            type="button"
          >Current Motor State: {resultS.length>0&&esp8266?lastReadingS.state?<span>ON</span>:<span>OFF</span>:<span>Disconneted</span>} </button>
        {esp32
          ? <button
            class="z-5 block p-4 font-bold text-blue-700 transition-all bg-blue-100 filter rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
            type="button"
          >
            Connected to ESP32
          </button>
          : <button
            className="z-5 block p-4 font-bold text-red-700 transition-all bg-red-100 filter rounded-full active:bg-red-50 hover:scale-110 focus:outline-none focus:ring"
            type="button"
          >
            Disconnected from ESP32
          </button>
        }
      </div>
      <div className="p-10 md:w-1/2 w-full flex items-center justify-center">
        <SegmentedControl
          value={activePage}
          onChange={setActivePage}
          fullWidth
          size="lg"
          radius="lg"
          color="blue"
          transitionDuration={700}
          transitionTimingFunction="linear"
          data={[
            { label: 'Collected Data', value: 'col' },
            { label: 'Logged Data', value: 'log' },
          ]}
          sx={() => ({
            backgroundColor: "rgba(0,0,0,0.05)",
            backdropFilter: "blur(5px)",
            borderRadius: "20px"
          })}
        />
      </div>
      <div className="container p-10">
        {activePage === "col" ? <>
          <LineChart
            data={data.readings}
            options={{
              "title": "Data Collected",
              "axes": {
                "left": {
                  "title": "Temperature (°C)",
                  "mapsTo": "heat"
                },
                "bottom": {
                  "scaleType": "time",
                  "mapsTo": "time",
                  "title": "Time"
                },
                "right": {
                  "title": "Soil Dampeness (V)",
                  "mapsTo": "soil",
                  "correspondingDatasets": [
                    "soil"
                  ]
                }
              },
              "curve": "curveMonotoneX",
              "height": "400px"
            }}>
          </LineChart>
          <div className="p-10" />
          <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table sx={{ minWidth: 700 }}>
              <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <tr>
                  <th>Time</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody>{rowsH}</tbody>
            </Table>
          </ScrollArea>
          <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table sx={{ minWidth: 700 }}>
              <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <tr>
                  <th>Time</th>
                  <th>Soil Reading</th>
                  <th>Motor State</th>
                </tr>
              </thead>
              <tbody>{rowsS}</tbody>
            </Table>
          </ScrollArea>
        </>
          :
          <>
          <LineChart
            data={difference}
            options={{
              "title": "Response Time of Microcontrollers",
              "axes": {
                "bottom": {
                  "title": "ID",
                  "mapsTo": "id",
                  "scaleType": "linear"
                },
                "left": {
                  "mapsTo": "diff",
                  "title": "Turn Around Time (s)",
                  "scaleType": "linear"
                },
                "right": {
                  "title": " ",
                }
              },
              "height": "400px",
              "curve": "curveMonotoneX",
            }}>
          </LineChart>
            <ScrollArea sx={{ height: 300,padding:"5%" }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table sx={{ minWidth: 700 }}>
              <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <tr>
                  <th>Id</th>
                  <th>ESP32 Request Time</th>
                  <th>ESP8266 Acknowledgement Time</th>
                  <th>Time Difference (Network Overhead) in ms</th>
                </tr>
              </thead>
              <tbody>{timediff}</tbody>
            </Table>
          </ScrollArea>
          </>
        }
      </div>
    </div>
  );
}

Home.suppressFirstRenderFlicker = true



