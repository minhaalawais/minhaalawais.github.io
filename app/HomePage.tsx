'use client';
import { data } from "@/types/main";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Socials from "@/components/Socials";
import Experiences from "@/components/experiences/Experiences";
import Contact from "@/components/Contact";
import CallToAction from "@/components/CallToAction";
import Header from "./Header";
import Footer from "./Footer";
import Blogs from "@/components/Blogs";

interface Props {
    data: data,
}

const HomePage = ({ data }: Props) => {
    console.log('data', data)
    return (
        <>
            <Header logo={data.main.name} />
            <Hero mainData={data.main} />
            <Socials socials={data.socials} />
            <About aboutData={data.about} name={data.main.name} />
            <Skills skillData={data.skills} />
            <Projects projectsData={data.projects} />
            <Experiences experienceData={data.experiences} educationData={data.educations} />
            <Blogs blogsData={data.blogs} />
            <Contact />
        </>
    )
}

export default HomePage

