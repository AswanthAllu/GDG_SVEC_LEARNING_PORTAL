// src/data.js

export const courses = [
  {
    id: "web-dev",
    title: "Static Web Development",
    description: "Master in Static Web page Design and Deployment",
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
      },
      {
        id: 2,
        title: "HTML & CSS Essentials",
        desc: "Deep dive into the structure and styling of the web.",
        videoUrl: "https://mega.nz/embed/nexQkCgS#JoQDoz3eHNEWlakz27Hjv3TqoMxPEXH5uFmtsR3KApI",
        quiz: [
          {
            question: "1. What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High-Level Text Language", "Hyper Transfer Markup Language", "Hyper Text Machine Language"],
            answer: "Hyper Text Markup Language"
          },
          {
            question: "2. Which of the following is a frontend technology?",
            options: ["Python", "HTML", "Node.js", "MongoDB"],
            answer: "HTML"
          },
          {
            question: "3. Which of the following is used to structure the content of a webpage?",
            options: ["JavaScript", "CSS", "HTML", "Python"],
            answer: "HTML"
          },
          {
            question: "4. What does CSS stand for?",
            options: ["Computer Style Sheets", "Cascading Style System", "Creative Styling System", "Cascading Style Sheets"],
            answer: "Cascading Style Sheets"
          },
          {
            question: "5. Which of the following is NOT a valid CSS property?",
            options: ["color", "font-size", "background-color", "create-box"],
            answer: "create-box"
          },
          {
            question: "6. In CSS, how do you select an element by its class?",
            options: ["#classname", ".classname", "classname", "@classname"],
            answer: ".classname"
          },
          {
            question: "7. What are the four components of the CSS Box Model?",
            options: ["Width, Height, Background, Border", "Padding, Margin, Border, Content", "Style, Layout, Color, Font", "Class, ID, Tag, Attribute"],
            answer: "Padding, Margin, Border, Content"
          },
          {
            question: "8. Which of the following is a correct example of a CSS rule?",
            options: ["color:red; font-size:32px;", "color = red; font-size = 32px;", "color - red; font-size - 32px;", "color:red font-size:32px;"],
            answer: "color:red; font-size:32px"
          },
          {
            question: "9. What does the backend of a website handle?",
            options: ["User interactions on the webpage", "Styling and layout of a website", "Database management and server-side logic", "Animations and visual effects"],
            answer: "Database management and server-side logic"
          },
          {
            question: "10. Which of the following statements is TRUE?",
            options: ["HTML is used for styling a webpage.", "CSS is responsible for the structure of a webpage.", "HTML and CSS work together to create a webpage.", "CSS is used to create backend logic for websites."],
            answer: "HTML and CSS work together to create a webpage."
          }
        ]
      },
      {
        id: 3,
        title: "VS Code & Development Setup",
        desc: "Set up your environment and learn the most popular code editor in the world.",
        videoUrl: "https://mega.nz/embed/HSgRzRDL#KpGCflAlQWF4AUPdU0xtwmgi207bpGCIba0vXDdnyGw",
        quiz: [
          {
            question: "1. What does “VS Code” stand for?",
            options: ["Visual Source Code", "Visual Studio Code", "Version Source Code", "Verified Studio Code"],
            answer: "Visual Studio Code"
          },
          {
            question: "2. Which company developed VS Code?",
            options: ["Apple", "Google", "Microsoft", "Adobe"],
            answer: "Microsoft"
          },
          {
            question: "3. What is the primary use of VS Code?",
            options: ["Video editing", "Writing and debugging code", "Photo editing", "Data analysis"],
            answer: "Writing and debugging code"
          },
          {
            question: "4. VS Code is mainly used for which type of development?",
            options: ["Graphic design", "Web and software development", "Game development only", "Mobile-only development"],
            answer: "Web and software development"
          },
          {
            question: "5. Which language is NOT natively supported by VS Code?",
            options: ["JavaScript", "Python", "C++", "Klingon"],
            answer: "Klingon"
          },
          {
            question: "6. What is the purpose of extensions in VS Code?",
            options: ["Add visual effects", "Add new functionalities and support for more languages", "Slow down the editor", "Change your hardware"],
            answer: "Add new functionalities and support for more languages"
          },
          {
            question: "7. Which extension helps with auto-completion and AI-based code suggestions?",
            options: ["Prettier", "GitLens", "Copilot", "Code Runner"],
            answer: "Copilot"
          },
          {
            question: "8. What is the shortcut to open the terminal in VS Code?",
            options: ["Ctrl + Shift + T", "Ctrl + ` (backtick)", "Ctrl + Alt + N", "Ctrl + Q"],
            answer: "Ctrl + ` (backtick)"
          },
          {
            question: "9. Which extension is useful for formatting code consistently?",
            options: ["Bracket Pair Colorizer", "Prettier", "Live Server", "IntelliSense"],
            answer: "Prettier"
          },
          {
            question: "10. Why do developers prefer VS Code over other editors?",
            options: ["It's lightweight and open source", "It has built-in Git and extension support", "It supports multiple programming languages", "All of the above"],
            answer: "All of the above"
          }
        ]
      }
    ]
  }
];