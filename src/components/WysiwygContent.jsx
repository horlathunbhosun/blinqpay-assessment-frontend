import React from "react";
import DOMPurify from "dompurify";

const WysiwygContent = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default WysiwygContent;
