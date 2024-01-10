import React from "react";
import Link from "next/link";

const Wtf = () => {
  return (
    <div className="md:w-96 mx-auto bg-black text-gray-200 flex flex-col justify-center py-4 h-screen overflow-y-scroll text-center">
      <h1 className="text-xl font-bold mb-4">The Tale of Coyote</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-lg font-semibold">The Enigmatic Trickster</h2>
          <p>
            In the heart of the American Southwest, under the vast, star-studded
            sky, roams Coyote, a creature as enigmatic as the desert moon...
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">The Fire Heist</h2>
          <p>
            Among the many tales woven around campfires, none is as beloved as
            the story of how Coyote stole fire for humanity...
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">The Chase and the Gift</h2>
          <p>
            Coyote's quest led him through realms untold, outwitting gods and
            spirits alike...
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">The Legacy Lives On</h2>
          <p>
            To this day, Coyote's spirit lingers in the laughter of children and
            the spark of a storyteller's eye...
          </p>
        </section>
        <div className="flex justify-center my-3">
          <Link
            href="/"
            className="px-2 py-1 rounded-full w-fit bg-yellow-600 border border-red-600"
          >
            go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wtf;
