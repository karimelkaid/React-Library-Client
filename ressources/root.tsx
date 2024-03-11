import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (<>
    <header>
      <h2><Link to="/">W42</Link></h2>
      <ul>
        <li>Lien 1</li>
        <li>Lien 2</li>
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
