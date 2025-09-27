'use client';
import React, { useRef, useEffect } from 'react'
import { IoIosGlobe } from "react-icons/io";
import { useRouter } from "next/navigation";

const caseStudyList = [
  {
    "id": "1",
    "name": "Startup Growth",
    "icon": "react-icon/startup",
    "title": "SG1",
    "des": "Discover how we helped a startup triple its online traffic through a complete website redesign."
  },
  {
    "id": "2",
    "name": "Ecommerce Boost",
    "icon": "react-icon/ecommerce",
    "title": "EB2",
    "des": "A case study on the optimization of an e-commerce site that increased sales by 40% in just 3 months."
  },
  {
    "id": "3",
    "name": "B2B Branding",
    "icon": "react-icon/branding",
    "title": "BB3",
    "des": "How we supported a B2B company in building a strong and credible digital identity."
  },
  {
    "id": "4",
    "name": "Saas Ux",
    "icon": "react-icon/saas",
    "title": "SU4",
    "des": "Implementation of a UX/UI strategy that improved the conversion rate of a SaaS platform by 25%."
  },
  {
    "id": "5",
    "name": "Digital Transformation",
    "icon": "react-icon/digital",
    "title": "DT5",
    "des": "A successful digital transformation for an SME that automated its processes and gained efficiency."
  }
]


const Page = () => {
  const scrollRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const el = scrollRef.current;

    const onWheel = (e) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;

      // Only hijack scroll when not at the ends
      if (e.deltaY > 0 && !atEnd) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      } else if (e.deltaY < 0 && !atStart) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const handleCardClick = (id)=>{
    router.push(`/CaseStudy/${id}`);
  }

  return (
    <div className="cs-container">
      
      {/* Top Section */}
      <div className="cs-top-section">
        <h1 className="cs-heading">Case Study Page</h1>
        <p className="cs-subtext">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error autem,
          animi molestias at esse ea distinctio officiis veniam obcaecati pariatur
          corrupti nemo sequi optio magni delectus libero commodi, similique omnis.
        </p>
      </div>
      
      {/* Horizontal Scroll Section */}
      <div ref={scrollRef} className="cs-scroll-section">
        {caseStudyList.map((list, index) => (
          <div 
            key={index} 
            className="cs-card"
            onClick={() => handleCardClick(list.id)}
          >
            <div className="cs-card-header">
              <div className="cs-card-left">
                <p className="cs-card-name">{list.name}</p>
                <div className="cs-card-icon"><IoIosGlobe /></div>
              </div>
              <div className="cs-card-title">{list.title}</div>
            </div>
            <div className="cs-card-description">
              {list.des}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page;