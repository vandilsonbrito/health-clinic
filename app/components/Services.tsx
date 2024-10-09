
'use client';
import { MdOutlinePregnantWoman, MdBloodtype, MdPsychology, MdChildCare, MdFaceUnlock   } from "react-icons/md";
import { LiaTeethSolid, LiaEyeSolid  } from "react-icons/lia";
import { FaTeethOpen, FaNutritionix  } from "react-icons/fa";
import { GiHeartBeats, GiArmSling  } from "react-icons/gi";
import { RiSpeakFill } from "react-icons/ri";
import ServiceContainer from "./ServiceContainer";
import { useEffect } from "react";
import Aos from 'aos';


export default function Services() {
    useEffect(() => {
      Aos.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        offset: 20
      })
    }, []);

    return (
      <section className="w-full max-w-7xl h-full flex flex-col justify-center items-center bg-white" id="especialidades" data-aos="fade-up">
          <div className="w-full flex justify-center mt-10">
              <h2 className="text-3xl font-semibold text-center">Especialidades</h2>
          </div>
          <div className="w-full flex flex-wrap gap-3 mt-14 justify-center">
              <ServiceContainer icon={<MdOutlinePregnantWoman/>} title={'Obstetrícia'} />
              <ServiceContainer icon={<LiaTeethSolid/>} title={'Odontologia'} />
              <ServiceContainer icon={<GiHeartBeats/>} title={'Cardiologia'} />
              <ServiceContainer icon={<LiaEyeSolid />} title={'Oftalmologia'} />
              <ServiceContainer icon={<FaTeethOpen/>} title={'Odontopediatria'} />
              <ServiceContainer icon={<FaNutritionix />} title={'Nutrologia'} />
              <ServiceContainer icon={<RiSpeakFill/>} title={'Fonoaudiologia'} />
              <ServiceContainer icon={<MdBloodtype />} title={'Endocrinologia'} />
              <ServiceContainer icon={<MdPsychology/>} title={'Psicologia'} />
              <ServiceContainer icon={<MdChildCare />} title={'Pediatria'} />
              <ServiceContainer icon={<MdFaceUnlock />} title={'Dermatologia'} />
              <ServiceContainer icon={<GiArmSling />} title={'Ortopedia'} />
          </div>  
      </section>
    )
}
