import { forwardRef, ReactNode } from "react"
import { Group } from "three"
import { Float } from "@react-three/drei"
import { SodaCan, SodaCanProps } from "./SodaCan"

type FloatCanType = {
    flavor?: SodaCanProps["flavor"]
    floatIntensity?: number
    floatingRange?: [number, number]
    speed?: number
    rotationIntensity?: number
    children?: ReactNode
}

const FloatingCan = forwardRef<Group, FloatCanType>(({
    flavor ="blackCherry",
    floatIntensity = 1,
    floatingRange = [-.2, .2],
    speed= 1.3,
    rotationIntensity = 1,
    children,
    ...props
    }, ref) => {

  return (
    <group ref={ref} {...props}>
        <Float
            speed={speed}
            rotationIntensity={rotationIntensity}
            floatIntensity={floatIntensity}
            floatingRange={floatingRange}
        >
            {children}
            <SodaCan flavor={flavor}/>
        </Float>
    </group>
  )
})

FloatingCan.displayName = "FloatingCan"

export default FloatingCan