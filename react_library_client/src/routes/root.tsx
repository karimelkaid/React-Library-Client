import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (<>
    <header>
      <h2><NavLink to="/">Home</NavLink></h2>
      <ul>
        <li><NavLink to="/authors">Authors</NavLink></li>
        <li><NavLink to="/books">Books</NavLink></li>
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
