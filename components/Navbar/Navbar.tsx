import Link from "next/link";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        REACT ANIMATION BENCHMARK
      </Link>

      <div className="nav-links">
        <Link href="/framer" className="nav-link">
          Framer Motion
        </Link>
        <Link href="/gsap" className="nav-link">
          GSAP
        </Link>
        <Link href="/react-spring" className="nav-link">
          React Spring
        </Link>
        <Link href="/vanilla-css" className="nav-link">
          Vanilla CSS
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
