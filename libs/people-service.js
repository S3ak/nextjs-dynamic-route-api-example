const baseURL = "http://localhost:3000";

export async function asyncFetchData(url = `${baseURL}/api/people`) {
  let peopleList = [];

  try {
    const response = await fetch(url);
    const json = await response.json();
    peopleList = json?.data ?? [];
  } catch (error) {
    console.warn("Could not fetch list", error);
  } finally {
    return peopleList;
  }
}

export async function asyncFetchPerson(
  guid = "unknown guid",
  url = `${baseURL}/api/people`
) {
  let person = {
    name: "John Doe",
    age: "unknown",
    company: "unknown",
    about: "Unknown"
  };

  if (!guid) {
    console.warn("GUID was not provided");
    return person;
  }

  try {
    const response = await fetch(`${url}/${guid}`);
    const json = await response.json();
    console.log("server response is >>>", json);
    return json.data;
  } catch (error) {
    console.warn("Could not find person", guid);
  }
}
