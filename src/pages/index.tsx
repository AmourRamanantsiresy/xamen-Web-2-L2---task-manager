import { HomeProps } from "@/types";
import { formatDateTime } from "@/utils";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";


/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {
  // get the timestamp (ms) of these two dates
  const diff = Math.abs(server.getTime() - client.getTime());

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return `${days} days, ${hours} hours, ${minutes}  minutes, ${seconds} seconds`
};

export default function Home({ serverTime }: HomeProps) {
  const clientDate = new Date()
  const serverDate = new Date(serverTime)
  const timeDiff = calculateTimeDifference(clientDate, serverDate)

  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{formatDateTime(serverDate)}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{timeDiff}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const serverTime = new Date().getTime();
  return {
    props: {
      serverTime
    }
  }
}