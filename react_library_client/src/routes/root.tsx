import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (<>
    <header>
      <h2><NavLink to="/">W42</NavLink></h2>
      <ul>

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
