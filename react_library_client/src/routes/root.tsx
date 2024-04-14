import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (<>
    <header>
      <h2><NavLink to="/">React Library Client</NavLink></h2>
      <ul>
        <li><NavLink to="/authors">Auteurs</NavLink></li>
        <li><NavLink to="/books">Livres</NavLink></li>
      </ul>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
      <em>Made with React & react-router</em>
    </footer>
  </>);
}
