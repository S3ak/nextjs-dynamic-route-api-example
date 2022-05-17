import peopleJSON from "../../../libs/peopleJSON";

export default function handler(_req, res) {
  res.status(200).json({ data: peopleJSON });
}
