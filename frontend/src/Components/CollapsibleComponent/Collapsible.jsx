import { useState, useRef, useEffect } from 'react';
import './Collapsible.css';

export default function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen, children]);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-container">
      <div className="collapsible-header" onClick={toggleCollapsible}>
        <h3>{title}</h3>
        <button>
          {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-angle-down"></i>}
        </button>
      </div>
      <div
        ref={contentRef}
        className={`collapsible-content ${isOpen ? 'open' : ''}`}
      >
        {children}
      </div>
    </div>
  );
}
