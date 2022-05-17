import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { asyncFetchData } from "../libs/people-service";

export default function IndexPage(props) {
  const [list, setList] = useState(props?.defaultPeople ?? []);

  const fetchMyAPI = useCallback(async () => {
    let data = await asyncFetchData();
    setList(data);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return (
    <div>
      <ul>
        {list.map(({ _id, guid, name = "unknown" }) => (
          <li key={_id}>
            <Link href={`/people/${guid}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps({ params }) {
  let defaultPeople = (await asyncFetchData()) ?? [];

  return {
    props: {
      defaultPeople
    }
  };
}
