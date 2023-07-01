import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default function ArrowSvg(){

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 16 16"
            fill="none"
        >
            <Path
            fill="#868FA0"
            d="M6.47 9.97a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 0 0-1.06 1.06L8.44 8 6.47 9.97Z"
            />
            <Path
            fill="#868FA0"
            fillRule="evenodd"
            d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
            clipRule="evenodd"
            />
        </Svg>
    )
}