import { useDispatch } from 'react-redux';
import { setNewFormAdded } from '../redux/features/formSlice';
import { Form } from '../interfaces/interfaces';

interface Props {
  tile: Form;
  newFormAdded: boolean;
}

export function Tile(props: Props) {
  const { tile, newFormAdded } = props;

  const dispatch = useDispatch();

  if (newFormAdded) {
    setTimeout(() => dispatch(setNewFormAdded(false)), 2000);
  }

  return (
    <div className="tile">
      <div>
        <img className="profile-image" src={tile.image} alt="formImf" />
      </div>
      <div className="card">
        <span className="key-data">Name:</span>
        <span className="user-data">{tile.name}</span>
        <div></div>
      </div>
      <div className="card">
        <span className="key-data">Age:</span>
        <span className="user-data">{tile.age}</span>
        <div></div>
      </div>
      <div className="card">
        <span className="key-data">Gender:</span>
        <span className="user-data">{tile.gender}</span>
        <div></div>
      </div>
      <div className="card">
        <span className="key-data">Country:</span>
        <span className="user-data">{tile.country}</span>
        <div></div>
      </div>
      <div className="card">
        <span className="key-data">Email:</span>
        <span className="user-data">{tile.email}</span>
        <div></div>
      </div>
      <div className="card">
        <span className="key-data">Password Length:</span>
        <span className="user-data">{tile.password.length}</span>
        <div></div>
      </div>
    </div>
  );
}

export default Tile;