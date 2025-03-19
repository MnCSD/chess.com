import React from "react";
import { MainSection } from "../sections/main-section";
import { PuzzleSection } from "../sections/puzzle-section";
import { LessonsSection } from "../sections/lessons-section";

export const HomeView = () => {
  return (
    <div className="max-w-[1080px] mx-auto ">
      <div className="p-2 pt-11 flex flex-col gap-y-10">
        <MainSection />

        <PuzzleSection />

        <LessonsSection />
      </div>
    </div>
  );
};
