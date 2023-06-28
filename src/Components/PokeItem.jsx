import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PokeItem({ item, colors, types }) {
  const params = useParams();
  const type = item.types[0].name;
  return (
    <Link to={`/pokemon/${item.name}`} className="custom-link">
      <div
        className="poke-box"
        key={item.id}
        style={{ backgroundColor: colors[type] }}
      >
        <img
          src={item.image}
          alt="xd"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        ></img>

        <div>
          <h2>{item.name}</h2>
        </div>

        <div className="pokelist-stats">
          <h3>Type : {item.types[0].name}</h3>
          <h3> KG : {item.weight}</h3>
        </div>
      </div>
    </Link>
  );
}

export default PokeItem;
