'use client';

import { useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import clsx from "clsx";
import { Group } from "three";

import { ArrowIcon } from "@/components/ArrowIcon";
import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { WavyCircles } from "./WavyCircles";

import gsap from "gsap";

const SPINS_ON_CHANGE = 8
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavor, setCurrentFlavor] = useState(0);
  const canRef = useRef<Group>(null);

  const updateFlavor = (idx: number) => { 
    if(!canRef.current) return;
    const nextFlavor = (idx + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(canRef.current.rotation, {
      y: idx > currentFlavor ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}` : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
      duration: 1,
      ease: "power2.inOut",
    }, 0)
    .to(".background, .wavy-circles-inner, .wavy-circles-outer", {
      backgroundColor: FLAVORS[nextFlavor].color,
      fill: FLAVORS[nextFlavor].color,
      duration: 1,
      ease: "power2.inOut",
    }, 0)
    .to(".text-area", {
      duration: 1,
      y: -10,
      opacity: 0,
    },0)
    .to({}, {onStart: () => setCurrentFlavor(nextFlavor)}, .5)
    .to(".text-area", {duration: 1, y: 0, opacity: 1}, .7)
  }


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto, 4fr, auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <ArrowButton onClick={() => updateFlavor(currentFlavor + 1)} direction="left" label="previous"/>
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0,0,1.5]}>
            <FloatingCan
              ref={canRef}
              floatIntensity={.3} 
              rotationIntensity={1} 
              flavor={FLAVORS[currentFlavor].flavor}
            />
          </Center>
          <Environment files="/hdr/lobby.hdr" environmentIntensity={.6} environmentRotation={[0,3,0]} />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        <ArrowButton onClick={() => updateFlavor(currentFlavor - 1)} direction="right" label="next"/>
      </div>
      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavor].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
      
    </section>
  );
};

export default Carousel;

type ArrowButtonType = {
  direction: "right" | "left";
  label: string;
  onClick: () => void;
}
const ArrowButton = ({ direction="right", onClick, label }: ArrowButtonType) => {
  return (
    <button onClick={onClick} className="size-12 rounded-full border-2 
      border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none 
      focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20">
        <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")}/>
        <span className="sr-only">{label}</span>
    </button>
  );
}