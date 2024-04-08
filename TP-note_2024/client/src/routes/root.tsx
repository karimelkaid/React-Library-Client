import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (<>
    <header>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        {
          // ====
          // TODO: ajouter les liens vers les autres pages de l'application
          // ====
        }
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
