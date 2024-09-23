'use client';

import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import FloatingCan from "@/components/FloatingCan";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Scene = () => {
    const canRef = useRef<Group>(null);
    const bgColors = ["#FFA6B5", "#E9CFF6", '#C4F1F9', '#D4F9E9', '#F9F1C2'];
    const isDesktop = useMediaQuery("(min-width: 768px)", true);
    useGSAP(() => {
          if (!canRef.current) return;
    
          const sections = gsap.utils.toArray(".alternating-section");
    
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".alternating-text-view",
              endTrigger: ".alternating-text-container",
              pin: true,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });
    
          sections.forEach((_, index) => {
            if (!canRef.current) return;
            if (index === 0) return;
    
            const isOdd = index % 2 !== 0;
    
            const xPosition = isDesktop ? (isOdd ? "-1" : "1") : 0;
            const yRotation = isDesktop ? (isOdd ? ".4" : "-.4") : 0;
            scrollTl
              .to(canRef.current.position, {
                x: xPosition,
                ease: "circ.inOut",
                delay: 0.5,
              })
              .to(
                canRef.current.rotation,
                {
                  y: yRotation,
                  ease: "back.inOut",
                },
                "<",
              )
              .to(".alternating-text-container", {
                backgroundColor: gsap.utils.wrap(bgColors, index),
              });
          });
        },
        { dependencies: [isDesktop] },
      );
    return (
        <group ref={canRef} position-x={1}>
            <FloatingCan flavor={"strawberryLemonade"}/>
            <Environment preset="warehouse" environmentIntensity={1.5}/>
        </group>
    )
}

export default Scene