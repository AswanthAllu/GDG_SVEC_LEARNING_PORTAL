// src/data.js

export const courses = [
  {
    id: "web-dev",
    title: "Web Development Series 1",
    description: "Master HTML, CSS, and Tools from scratch in this exclusive series.",
    icon: "</>",
    episodes: [
      { 
        id: 1, 
        title: "Introduction to Web Development", 
        desc: "Learn the basics of web development and insights into how the web works.", 
        videoUrl: "https://mega.nz/embed/XP4n2DbS#pRrkK2YWXYQC1hL_5teqvAAtzBqPBTMadPQvFGIpalA", 
        quiz: [
          { 
            question: "1. What is Web Development?", 
            options: ["Creating mobile applications", "Building websites and web applications", "Designing only the frontend of a website", "Writing only JavaScript code"], 
            answer: "Building websites and web applications" 
          },
          { 
            question: "2. Which of the following is a frontend technology?", 
            options: ["Python", "HTML", "Node.js", "MongoDB"], 
            answer: "HTML" 
          },
          { 
            question: "3. What does the backend of a website handle?", 
            options: ["User interactions on the webpage", "Styling and layout of a website", "Database management and server-side logic", "Animations and visual effects"], 
            answer: "Database management and server-side logic" 
          },
          { 
            question: "4. Which database is commonly used for backend development?", 
            options: ["React", "MongoDB", "CSS", "Bootstrap"], 
            answer: "MongoDB" 
          },
          { 
            question: "5. What is Full Stack Development?", 
            options: ["Working only with frontend technologies", "Managing cloud services", "Developing both frontend and backend of a website", "Writing only CSS and JavaScript"], 
            answer: "Developing both frontend and backend of a website" 
          },
          { 
            question: "6. Which of the following is a backend technology?", 
            options: ["CSS", "JavaScript", "Django", "HTML"], 
            answer: "Django" 
          },
          { 
            question: "7. What is the main difference between a static and a dynamic website?", 
            options: ["Static websites use JavaScript, while dynamic websites use HTML", "Static websites require databases, dynamic websites do not", "Static websites display fixed content, while dynamic websites generate content based on user interactions", "There is no difference"], 
            answer: "Static websites display fixed content, while dynamic websites generate content based on user interactions" 
          },
          { 
            question: "8. Which of these is NOT a benefit of learning web development?", 
            options: ["High demand in the job market", "Ability to create and innovate", "Learning how to use Microsoft Word", "Freelancing and startup opportunities"], 
            answer: "Learning how to use Microsoft Word" 
          },
          { 
            question: "9. Which of the following technologies is used to style a webpage?", 
            options: ["HTML", "CSS", "JavaScript", "Node.js"], 
            answer: "CSS" 
          },
          { 
            question: "10. What should you do to become a good web developer?", 
            options: ["Only watch tutorials and never practice", "Start coding, build projects, and stay updated with new technologies", "Avoid asking questions or participating in discussions", "Focus only on frontend development and ignore backend technologies"], 
            answer: "Start coding, build projects, and stay updated with new technologies" 
          }
        ]
      }
    ]
  }
];