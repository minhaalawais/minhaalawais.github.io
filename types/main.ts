type skill = {
    name: string,
    image: string,
    category: string
}

type project = {
    name: string,
    image: string[],
    techstack: string,
    category: string,
    links: {
        visit: string,
        code: string,
        video: string
    },
    description: string[]
}

type experience = {
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    desc: string[]
}

type education = {
    institute: string,
    degree: string,
    startDate: string,
    endDate: string,
}

type main = {
    name: string,
    titles: string[],
    heroImage: string,
    shortDesc: string,
    techStackImages: string[],
}

type about = {
    aboutImage: string,
    aboutImageCaption: string,
    title: string,
    about: string,
    resumeUrl: string,
    callUrl: string
}

type social = {
    name: string,
    icon: string,
    link: string
}

type Blog = {
    id: number,
    title: string,
    description: string,
    content: string,
    imageUrl: string,
    date: string,
    readTime: string,
    blogUrl: string
  }
  
type blogs = {
title: string,
blogs: Blog[]
}
  

type data = {
    main: main,
    about: about,
    skills: skill[],
    projects: project[],
    experiences: experience[],
    educations: education[],
    socials: social[],
    blogs: blogs
}

export type { 
    data, 
    main, 
    about, 
    skill, 
    project, 
    experience, 
    education, 
    social,
    Blog,
    blogs 
};