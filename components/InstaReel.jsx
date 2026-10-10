"use client"
import React, { useEffect } from 'react'

const InstaReel = ({id}) => {
   useEffect(() => {
    // load script if not already loaded
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        window.instgrm?.Embeds?.process();
      };
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <div>
    <blockquote
      className="instagram-media rounded-3xl"
      data-instgrm-permalink={`https://www.instagram.com/reel/${id}/`}
      data-instgrm-version="14"
      style={{ maxWidth: "400px", margin: "auto" }}
    />


      </div>
  );
}

export default InstaReel
