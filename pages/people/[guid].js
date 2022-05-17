import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { asyncFetchData, asyncFetchPerson } from "../../libs/people-service";

export default function Person({
  defaultPerson = {
    name: "Unknown",
    company: "Unknown",
    age: "Unknown",
    about: "Unknown"
  }
}) {
  const router = useRouter();
  const currentPersonGuid = router.query.guid;
  const [person, setPerson] = useState(defaultPerson);

  const fetchMyAPI = useCallback(async () => {
    console.warn("currentPersonGuid >>>", currentPersonGuid);
    let data = await asyncFetchPerson(currentPersonGuid);
    console.log("person data", data);
    if (data) setPerson(data);
  }, [currentPersonGuid]);

  useEffect(() => {
    fetchMyAPI();
  }, []);

  const { name, about, company, age } = person;

  return (
    <div>
      <Head>
        <title>Person {name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ textAlign: "center", width: "40%", margin: "auto" }}>
        <h1>{name}</h1>
        <h2>{age}</h2>

        <div>
          <h3>{company}</h3>
          <p>{about}</p>
        </div>
        <Link href="/">Back to main</Link>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  let paths = [];

  try {
    const people = await asyncFetchData();
    paths = people.map(({ guid }) => {
      return {
        params: {
          guid
        }
      };
    });
  } catch (error) {
    return console.warn("error", error);
  }

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const defaultPerson = await asyncFetchPerson(params.guid);

  return {
    props: {
      defaultPerson
    }
  };
}