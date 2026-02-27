import { useEffect } from "react";
import { useState } from "react";

function clampIndex(len: number, idx: number) {
  if (idx === len) return 0;
  if (idx < 0) return len - 1;
  return idx;
}

type ImageCarouselConfig = {
  numberOfSlides: number;
  autoNext?: boolean;
  slideIndex?: number;
};

export const useImageCarousel = ({
  numberOfSlides,
  autoNext = false,
  slideIndex = 0,
}: ImageCarouselConfig) => {
  const [currIndex, setCurrIndex] = useState(slideIndex);

  useEffect(() => {
    let id: number;
    if (autoNext) {
      id = setInterval(() => {
        nextSlide();
      }, 1500);
    }

    return () => clearInterval(id);
  }, []);

  function nextSlide() {
    setCurrIndex((prev) => clampIndex(numberOfSlides, prev + 1));
  }

  function prevSlide() {
    setCurrIndex((prev) => clampIndex(numberOfSlides, prev - 1));
  }

  function showSlide(index: number) {
    setCurrIndex(clampIndex(numberOfSlides, index));
  }

  return { currIndex, nextSlide, prevSlide, showSlide };
};
