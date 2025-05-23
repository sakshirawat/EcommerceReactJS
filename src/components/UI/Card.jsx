import React from 'react';

const Card = (props) => {
  return (
    // Main container for the Card component
    <section
      // Applies base styling: white background, padding, margin, width
      // Allows additional custom classes to be passed via props.className
      className={`bg-white rounded-lg p-4 mx-auto my-16 w-[90%] max-w-xl ${props.className ? props.className : ''}`}
    >
      {/* Render any child components or content passed to the Card */}
      {props.children}
    </section>
  );
};

export default Card;
