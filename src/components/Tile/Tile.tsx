import "./Tile.css";

interface TileProps {
  number: number;
  image?: string;
}

const Tile = ({ number, image }: TileProps) => {
  const classNames = [
    "tile",
    number % 2 == 0 ? "black-tile" : "white-tile",
  ].join(" ");

  return (
    <div className={classNames}>
      {image && (
        <div
          className="chess-piece"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      )}
    </div>
  );
};

export default Tile;
