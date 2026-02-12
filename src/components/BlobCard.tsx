// app/components/BlobBorderCard.tsx
"use client";

import React from "react";

type BlobBorderCardProps = {
  children: React.ReactNode;
  blobColor?: string;
};

const BlobBorderCard: React.FC<BlobBorderCardProps> = ({
  children,
  blobColor = "#ff0000",
}) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* outer shadow + rounded container (like .card) */}
      <div className="relative w-full h-full rounded-[14px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] overflow-hidden">
        {/* inner white glass background (.bg) */}
        <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] z-20 rounded-[10px] bg-white/95 backdrop-blur-[24px] outline outline-2 outline-white overflow-hidden">
          {/* real card content goes here */}
          <div className="relative z-30 h-full w-full">{children}</div>
        </div>

        {/* animated blob under the card (.blob) */}
        <div
          className="
            absolute z-10
            h-[150px] w-[150px]
            rounded-full
            blur-[12px]
            animate-blobBounce
          "
          style={{
            top: "50%",
            left: "50%",
            backgroundColor: blobColor,
          }}
        />
      </div>
    </div>
  );
};

export default BlobBorderCard;
