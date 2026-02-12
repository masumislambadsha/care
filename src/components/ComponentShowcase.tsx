"use client";

import GlassCard from "./GlassCard";
import SlideButton from "./SlideButton";
import StyledCard from "./StyledCard";
import StyledButton from "./StyledButton";

export default function ComponentShowcase() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Glass Card (Tailwind)
        </h2>
        <GlassCard>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">Card Title</h3>
            <p className="text-sm text-gray-600 mt-2">Your content here</p>
          </div>
        </GlassCard>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Styled Card (styled-components)
        </h2>
        <StyledCard>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">Styled Card</h3>
            <p className="text-sm text-gray-600 mt-2">With animation</p>
          </div>
        </StyledCard>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Slide Button (Tailwind)
        </h2>
        <SlideButton onClick={() => alert("Button clicked!")}>
          Click Me
        </SlideButton>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Styled Button (styled-components)
        </h2>
        <StyledButton onClick={() => alert("Styled button clicked!")}>
          Styled Button
        </StyledButton>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <SlideButton className="bg-teal-600 border-teal-600">
          Teal Button
        </SlideButton>
        <SlideButton className="bg-purple-600 border-purple-600">
          Purple Button
        </SlideButton>
        <SlideButton className="bg-orange-600 border-orange-600">
          Orange Button
        </SlideButton>
      </div>
    </div>
  );
}
