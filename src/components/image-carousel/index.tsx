import { ChevronLeft, ChevronRight } from "lucide-react";
import { useImageCarousel } from "./hook";

type Image = {
  src: string;
  alt?: string;
};

type ImageCarouselProps = {
  images: Image[];
  width?: number;
  autoNext?: boolean;
};

function ImageCarousel({
  images,
  width = 450,
  autoNext = false,
}: ImageCarouselProps) {
  if (!images || images.length === 0) return null;
  const {
    currIndex: slideIndex,
    nextSlide,
    prevSlide,
    showSlide,
  } = useImageCarousel({ numberOfSlides: images.length, autoNext });
  return (
    <div style={{ maxWidth: width }} className=" relative w-full">
      {/*slide*/}
      <div className="aspect-video bg-red-100 flex overflow-hidden">
        {images.map((image, idx) => (
          <img
            style={{ translate: `${-100 * slideIndex}%` }}
            key={idx}
            alt={image.alt}
            src={image.src}
            loading="lazy"
            className=" w-full h-full shrink-0  object-cover transition-transform duration-300"
          />
        ))}
      </div>
      <button
        onClick={() => prevSlide()}
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full w-8 h-8 bg-transparent cursor-pointer hover:bg-black flex justify-center items-center"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={() => nextSlide()}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full w-8 h-8 bg-transparent cursor-pointer hover:bg-black flex justify-center items-center"
      >
        <ChevronRight className="text-white" />
      </button>
      <div className="flex justify-center  p-1">
        <div className="bg-gray-300/30 flex p-1 rounded-md gap-4">
          {images.map((_, idx) => (
            <button
              onClick={() => showSlide(idx)}
              key={idx}
              className={`w-2 h-2 rounded-full border ${idx === slideIndex && "bg-red-500"}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ImageCarousel };
