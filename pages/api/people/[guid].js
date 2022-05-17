import peopleJSON from "../../../libs/peopleJSON";

export default function handler(req, res) {
  const foundPerson = peopleJSON.find(
    (person) => person.guid === req.query.guid
  );
  console.log("Server is processing request", foundPerson?.name);

  res.status(200).json({ data: foundPerson });
}
