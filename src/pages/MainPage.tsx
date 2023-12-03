import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../redux/store';
import { Tile } from './Tile';

export default function MainPage() {
  const { formTiles, newFormAdded } = useSelector(
    (state: RootState) => state.form
  );

  return (
    <div>
      <div>
        <Link
          to="/uncontrolled-form"
        >
          <button className="classic-button">
            Uncontrolled Form
          </button>
        </Link>
        <Link
          to="/hook-form"
        >
          <button className="classic-button">
            Hook Form
          </button>
        </Link>
      </div>
      <div>
        {formTiles.length ? (
          formTiles.map((tile, index) => (
            <Tile
              key={index}
              tile={tile}
              newFormAdded={newFormAdded && index === 0 ? newFormAdded : false}
            />
          ))
        ) : (
          <h2>
            There is no data. Please, fill out and submit the form.
          </h2>
        )}
      </div>
    </div>
  )
}
