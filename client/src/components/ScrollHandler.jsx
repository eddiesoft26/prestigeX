import { useNavigate, useLocation } from "react-router-dom";

const useScrollToSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId, offset = -70) => {
    if (location.pathname !== "/") {
      // navigate home first
      navigate("/", { state: { scrollTo: sectionId, offset } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return scrollToSection;
};
