import { useRef } from "react";
import StudyPage from "../components/Study";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";

import data from "../public/data/bye_service.json";

export default function Home() {
  return (
    <>
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
      <div className="container mx-auto mb-10"></div>
      <div className="laptop:mt-20 mt-10">
        <div className="mt-5">
          <h1
            //   ref="test"
            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
          >
            "test"a
          </h1>
        </div>
        <p> global css test</p>
      </div>
      <StudyPage></StudyPage>
      <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
        <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
        <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
          {data.services.map((service, index) => (
            <ServiceCard
              key={index}
              name={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
      <div
        // className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        //   mounted && "dark" === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
        // } hover:scale-105 link`}
        // className="w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 hover:bg-slate-800 hover:scale-105 link bg-blue-500"
        className="visible w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 hover:bg-slate-800 hover:scale-105 link bg-blue-500"
      >
        <h1 className="text-3xl">Heading</h1>
        <p className="mt-5 opacity-40 text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </>
  );
}
