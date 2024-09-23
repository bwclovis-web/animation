"use client"

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import {useGSAP} from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bounded } from "@/components/Bounded";
import { Button } from "@/components/Button";
import { TextSplitter } from "@/components/TextSplit";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";

import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(() => {
    if(!ready && isDesktop) return;
    const introTl = gsap.timeline();
    
    introTl
    .set(".hero", {opacity: 1})
    .from(".hero-header-word", {
      scale: 3,
      opacity: 0,
      ease: "power4.in",
      delay: .3,
      stagger: .3
    })
    .from(".hero-sub", {
      opacity: 0,
      y: 30,
    }, "+=.5")
    .from(".hero-body", {
      opacity: 0,
      y: 10,
    })
    .from(".hero-btn", {
      opacity: 0,
      y: 10,
      duration: .5
    });
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        markers: false
      }
    });

    scrollTl
    .fromTo("body", {
      backgroundColor: "#FDE047",
    }, {
      backgroundColor: "#FD9F99D",
      overwrite: "auto"
    }, 0.5)
    .from(".text-side-heading .split-char", {
      y: "100%",
      scale: 1.3,
      rotate: -25,
      stagger: 0.1,
      duration: 1,
      opacity: 0,
      ease: "back.out(3)"
    })
    .from(".text-side-body", {
      y: 50,
      opacity: 0,
    })
  }, {dependencies: [ready, isDesktop]});

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      {isDesktop && (
        <View className="hero-scene sticky pointer-events-none top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={200} speed={2} repeat={true}/>
        </View>
      )}
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header lg:text-[13rem] text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem]">
              <TextSplitter text={asText(slice.primary.heading)} wordDisplayStyle="block" className="hero-header-word"/>
            </h1>
            <div className="hero-sub mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>

            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button buttonLink={slice.primary.button_link} buttonText={slice.primary.button_text} className="hero-btn mt-12"/>
          </div>
        </div>
  
        <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage 
            field={slice.primary.cans_image}
            className="md:hidden w-full"
            alt=""
          />
         <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
         </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
