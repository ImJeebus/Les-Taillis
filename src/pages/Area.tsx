import './Area.css';
import { Link } from 'react-router-dom';
import Profile from '../components/Profiles/Profile';

const Area = () => {
  const buttons = [
    { value: 'adminLegal', text: 'Admin / Legal' },
    { value: 'marketing', text: 'Marketing' },
    { value: 'mainHouse', text: 'Main House' },
    { value: 'pidge', text: 'Pidge' },
    { value: 'barn', text: 'Barn' },
    { value: 'poolArea', text: 'Pool Area' },
    { value: 'allTasks', text: 'All Tasks' },
  ];

  return (
    <div className="areaContainer">
      {/* <NavBar /> */}
      <Profile />
      <div className="areaGridContainer">
        <div className="areaGrid">
          {buttons.map(({ value, text }) => (
            <Link
              key={value}
              to={`/tasklist/${value}`}
              className={`areaButton area${value}`}
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Area;
