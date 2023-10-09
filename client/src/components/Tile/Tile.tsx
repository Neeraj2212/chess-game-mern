import "./Tile.css";

interface TileProps {
  number: number;
  withinReachOfActivePiece?: boolean;
  hasEnemyPiece?: boolean;
  image?: string;
}

const Tile = ({
  number,
  image,
  withinReachOfActivePiece,
  hasEnemyPiece,
}: TileProps) => {
  const classNames = [
    "tile",
    number % 2 == 0 ? "black-tile" : "white-tile",
    !hasEnemyPiece && withinReachOfActivePiece ? "within-reach" : "",
    withinReachOfActivePiece && hasEnemyPiece ? "enemy-in-reach-piece" : "",
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
