import { FC } from "react";

type Props = {
  name: string;
  photoSrc: string;
};

export const AboutPhoto: FC<Props> = ({ name, photoSrc }) => {
  return (
    <>
      <div className="about-author-container">
        <div className="about-author">
          <img src={photoSrc} className="about-author-image" />
        </div>
      </div>
      <h2 className="about-author-name">{name}</h2>
    </>
  );
};
