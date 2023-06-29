import { gsap } from "gsap";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Slide(e) {
  gsap.fromTo( ".menu",{ x: 40, fill: 'blue', }, { x: -500, fill: 'green' });
}