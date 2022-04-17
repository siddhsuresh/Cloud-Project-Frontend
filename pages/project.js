import Head from "next/head";
import useSWR from "swr";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { showNotification } from '@mantine/notifications';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import Navbar from "../components/navbar";
import { io } from "socket.io-client";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Home() {
  const [pumpState, setPumpState] = useState(false);
  const [conn, setConn] = useState(false);
  const { data, error } = useSWR(
    "https://drts-jcomp-20bps1042.herokuapp.com/API",
    fetcher,
    {
      refreshInterval: 500
    }
  );
  useEffect(() => {

    const socket = io("https://drts-jcomp-20bps1042.herokuapp.com/");
    socket.on("esp8266", (data) => {
      console.log("Connected", data);
      setConn(data);
    })
    socket.on("pumpState", (data) => {
      console.log("Pump State", data);
    }
    )
    socket.on("setSpeed", (data) => {
      console.log("Speed: ", data);
    });
  }, []);
  if (error) return <div>Error...</div>;
  if (!data) return (
    <>
      <Head>
        <title>CSE2021 | 20BPS1042 Presentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 ">
        <Head>
          <title>CSE2021 | 20BPS1042 Presentation</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="relative w-full max-w-lg">
          <div className="animate-blob absolute top-0 -left-4 w-100 h-100 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
          <div className="animate-blob1 absolute top-0 -right-4 w-100 h-100 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
        </div>
        <div className="text-xl font-bold text-center font-mono ">
          CSE2021 Distributed Real Time Systems
        </div>
        <div className="text-6xl font-mono font-extrabold text-center  p-5">
          Real Time Irrigation System
        </div>
        <div className="text-2xl font-mono font-bold text-center pb-10">
          Project Page
        </div>
        <div className="p-10 text-2xl font-mono font-bold flex flex-row gap-5 text-center pb-10 text-cyan-800">
          <svg className="animate-spin" width="20" height="20" fill="currentColor" class="tw-mr-2 tw-animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
            </path>
          </svg> Connecting to the API to get the latest data
        </div>
        <div class="bg-white w-1/2 mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col gap-10 select-none ">
          <div class="h-52 w-72 rounded-xl bg-gray-200 animate-pulse">
          </div>
          <div class="flex flex-col flex-1 gap-10 sm:p-2">
            <div class="flex flex-1 flex-col gap-3">
              <div class="bg-gray-200 w-full animate-pulse h-14 rounded-2xl">
              </div>
              <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
              </div>
              <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
              </div>
              <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
              </div>
              <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
              </div>
            </div>
            <div class="mt-auto flex gap-3">
              <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full">
              </div>
              <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full">
              </div>
              <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 ">
      <Head>
        <title>CSE2021 | 20BPS1042 Presentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar color="black"></Navbar>
      <div className="p-10 relative w-full max-w-lg">
        <div className="animate-blob absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
        <div className="animate-blob absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
      </div>
      <div className="text-xl font-bold text-center font-mono ">
        CSE2021 Distributed Real Time Systems
      </div>
      <div className="text-6xl font-mono font-extrabold text-center  p-5">
        Real Time Irrigation System
      </div>
      <div className="text-2xl font-mono font-bold text-center pb-10">
        Project Page
      </div>
      <div class="p-10 flex items-center space-x-10 hover:space-x-4 font-mono font-bold">
        {conn
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
        {data.esp32
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
      <LineChart
        width={1000}
        height={700}
        data={data.soil}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={3500} stroke="red" />
        <Line type="monotone" dataKey="soil" stroke="#8884d8" />
      </LineChart>
      <div className="flex flex-row gap-4">
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="font-mono min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                      >
                        Soil Moisture Reading
                      </th>
                      {/* <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Temperature Reading
                    </th> */}
                      <th
                        scope="col"
                        class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                      >
                        Motor State
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.soil.map((items) => (
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {items.time}
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {items.soil}
                          </p>
                        </td>
                        {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">-</p>
                      </td> */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {items.state ? (
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden="true"
                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span class="relative">ON</span>
                            </span>
                          ) : (
                            <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                              <span
                                aria-hidden="true"
                                class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                              ></span>
                              <span class="relative">OFF</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="font-mono min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                      >
                        Temperature
                      </th>
                      {/* <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Temperature Reading
                    </th> */}
                      {/* <th
                      scope="col"
                      class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Motor Speed
                    </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.dht.map((items) => (
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {items.time}
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {items.heat}
                          </p>
                        </td>
                        {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">-</p>
                      </td> */}
                        {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {items.state ? (
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden="true"
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">ON</span>
                          </span>
                        ) : (
                          <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden="true"
                              class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">OFF</span>
                          </span>
                        )}
                      </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
