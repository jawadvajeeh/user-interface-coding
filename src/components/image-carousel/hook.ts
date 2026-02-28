import { useEffect, type RefObject } from "react";
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
  scrollRef?: RefObject<HTMLDivElement | null>;
};

export const useImageCarousel = ({
  numberOfSlides,
  autoNext = false,
  slideIndex = 0,
  scrollRef,
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

  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        const i = Math.round(el.scrollLeft / w);
        console.log(i, w);
        setCurrIndex(clampIndex(numberOfSlides, i));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const ro = new ResizeObserver(() => {
      // Snap to the current slide on resize to avoid fractional positions.
      scrollTo(currIndex);
      onScroll();
    });
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  function nextSlide() {
    // setCurrIndex((prev) => clampIndex(numberOfSlides, prev + 1));
    scrollTo(currIndex + 1);
  }

  function scrollTo(i: number) {
    const el = scrollRef?.current;
    if (!el) return;
    const clamped = clampIndex(numberOfSlides, i);
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }

  function prevSlide() {
    // setCurrIndex((prev) => clampIndex(numberOfSlides, prev - 1));
    scrollTo(currIndex - 1);
  }

  function showSlide(index: number) {
    setCurrIndex(clampIndex(numberOfSlides, index));
  }

  return { currIndex, nextSlide, prevSlide, showSlide };
};
