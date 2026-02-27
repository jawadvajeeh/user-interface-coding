import { ImageCarousel } from "./components/image-carousel";
import { images } from "./components/image-carousel/data";

function App() {
  return (
    <main className="playground">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Image Carousel</h1>
      </div>
      <ImageCarousel images={images} width={500} autoNext={false} />
    </main>
  );
}

export default App;
