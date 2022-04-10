import Head from "next/head";
import useSWR from "swr";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Home() {
  const { data, error } = useSWR(
    "https://drts-jcomp-20bps1042.herokuapp.com/API?q=soil",
    fetcher,
    {
      refreshInterval: 500
    }
  );
  const { data: tempdata, error: temperror } = useSWR(
    "https://drts-jcomp-20bps1042.herokuapp.com/API?q=dht",
    fetcher,
    {
      refreshInterval: 500
    }
  );
  //console.log(error);
  if (error||temperror) return <div>Error.</div>;
  if (!data||!tempdata) return <div>Loading...</div>;
  console.log(data);
  console.log(tempdata)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>CSE2021 | 20BPS1042 Presentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-full max-w-lg">
        <div className="animate-blob absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
        <div className="animate-blob delay-1000 absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-80"></div>
      </div>
      <div className="text-xl font-bold text-center font-mono p-2">
        VIT Chennai Winter Semester 2022
      </div>
      <div className="text-xl font-bold text-center font-mono ">
        CSE2021 Distributed Real Time Systems
      </div>
      <div className="text-6xl font-mono font-extrabold text-center  p-5">
        Real Time Irrigation System
      </div>
      <div className="text-2xl font-mono font-bold text-center pb-10">
        Presented By 20BPS1042 Siddharth Suresh
      </div>

      <LineChart
        width={1000}
        height={700}
        data={data}
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
        <ReferenceLine y={3500} label="CutOff" stroke="red" />
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
                  {data.map((items) => (
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
                  {tempdata.map((items) => (
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
