import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MainLayout() {
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium transition window pinning rule
      gsap.fromTo(
        headerRef.current,
        { 
          backgroundColor: "rgba(245, 245, 245, 1)", 
          backdropFilter: "blur(0px)",
          borderBottomColor: "rgba(0, 0, 0, 0.05)"
        },
        {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottomColor: "rgba(0, 0, 0, 0.08)",
          scrollTrigger: {
            trigger: "body",
            start: "top -40px",
            end: "top -100px",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert(); // Structural cleaning pipeline
  }, []);

  return (
    <>
      <header ref={headerRef} className="sticky-header-container">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
