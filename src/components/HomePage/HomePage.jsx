import { useRef, useState, useEffect } from "react";
import "./HomePage.css";
import { IoMenu, IoClose } from "react-icons/io5";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebookSquare,
  FaArrowCircleRight,
} from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myImg from "../../assets/images/file.webp";
import { data } from "../skills";

function HomePage() {
  const navOptions = ["Home", "About Me", "Projects", "Skills", "Contact Me"];
  const [active, setActive] = useState("Home");
  const [sidebar, setSidebar] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
  });
  const sidebarRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNo" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    const {
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ID,
      VITE_EMAILJS_PUBLIC_ID,
    } = import.meta.env;
    const { name, email, phoneNo, message } = formData;

    if (!name || !email || !phoneNo || !message) {
      toast.warning("Fill all the fields of contact form");
      return;
    }

    const formatMsg = `Email: ${email}\nPhone No.: ${phoneNo}\nMessage: ${message}`;

    const data = {
      service_id: VITE_EMAILJS_SERVICE_ID,
      template_id: VITE_EMAILJS_TEMPLATE_ID,
      user_id: VITE_EMAILJS_PUBLIC_ID,
      template_params: {
        from_name: name,
        to_name: "Adarsh",
        message: formatMsg,
      },
    };

    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log(res.data);
      toast.success("Email was sent successfully");
    } catch (error) {
      toast.error("There was an error, Please try again.");
      console.error(error);
    }

    setFormData({
      name: "",
      email: "",
      phoneNo: "",
      message: "",
    });
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebar(false);
    }
  };

  useEffect(() => {
    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  const scrollToSection = (sectionID) => {
    setActive(sectionID);
    setSidebar(false);
    document
      .getElementById(sectionID.toLowerCase())
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="text-[#e2e8f0] w-full">
        <header className="w-full fixed top-0 z-20">
          <nav className="w-full flex justify-between px-16 py-2 max-900:px-12 max-450:px-6 bg-[#0f172a5f] border-b-2 border-[#ffffff2a] backdrop-blur-[10px]">
            <div className="logo cursor-pointer text-7xl max-900:text-6xl max-650:text-5xl">
              At
            </div>
            <div className="navOptions flex justify-center items-center max-650:hidden">
              {navOptions.map((value, index) => (
                <p
                  onClick={() => scrollToSection(value)}
                  className={`navLinks text-2xl cursor-pointer ${
                    index === 0 ? "m-0" : "ml-6"
                  } ${active === value ? "active" : ""}`}
                  key={index}
                >
                  {value}
                </p>
              ))}
            </div>
            <button
              className="text-4xl hidden max-650:block"
              onClick={() => setSidebar(true)}
            >
              <IoMenu />
            </button>
          </nav>
        </header>
        <aside className="fixed top-0 left-0 z-30">
          <nav
            className={`${
              sidebar ? "w-80 opacity-100 " : "w-0 opacity-0"
            } pop-up flex justify-center items-center flex-col text-2xl gap-3 bg-[#233662] relative transition-all duration-500 ease-in`}
            ref={sidebarRef}
          >
            <button
              className="text-4xl absolute top-4 right-6"
              onClick={() => setSidebar(false)}
            >
              <IoClose />
            </button>
            {navOptions.map((value, index) => (
              <p
                key={index}
                onClick={() => scrollToSection(value)}
                className={`navLinks text-2xl cursor-pointer ${
                  active === value ? "active" : ""
                }`}
              >
                {value}
              </p>
            ))}
          </nav>
        </aside>
      </main>
      <div className="mainSection gap-20 px-16 pt-40 pb-5 text-[#94a3b8] flex flex-col justify-center items-center max-900:pt-28 max-450:pt-20 max-450:px-6">
        <ToastContainer
          position="top-right"
          autoClose={2998}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <section
          id="home"
          className="flex w-11/12 gap-2 max-900:flex-col-reverse max-900:gap-12 max-900:w-full max-[500px]:gap-6"
        >
          <div className="left w-6/12 max-900:w-full">
            <h1 className="text-6xl mb-1 text-[#D3DDEE] font-bold max-900:text-5xl max-900:m-0 max-450:text-4xl">
              Adarsh Tiwari
            </h1>
            <h2 className="text-3xl text-[#D3DDEE] max-900:text-2xl max-450:text-xl">
              FrontEnd Developer
            </h2>
            <p className="mt-12 mb-44 max-1050:mt-8 max-1050:mb-24 text-2xl font-thin w-10/12 max-900:w-full max-900:mt-2 max-900:mb-5 max-900:text-xl max-450:text-lg">
              I specialize in crafting engaging and user-friendly web
              application interfaces, prioritizing seamless experiences and
              innovative design solutions to elevate user interactions and
              satisfaction.
            </p>
            <div className="socialLinks flex text-3xl gap-2">
              <FaGithub className="hover:text-[#D3DDEE] cursor-pointer" />
              <FaLinkedin className="hover:text-[#D3DDEE] cursor-pointer" />
              <FaInstagram className="hover:text-[#D3DDEE] cursor-pointer" />
              <FaFacebookSquare className="hover:text-[#D3DDEE] cursor-pointer" />
            </div>
          </div>
          <div className="right w-6/12 flex justify-center items-center max-900:w-full">
            <img
              src={myImg}
              alt="myImage"
              className="myImg w-4/6 max-1050:w-5/6 flex justify-center items-center  rounded-3xl overflow-hidden border-2 max-900:w-3/6 max-650:w-4/6"
            />
          </div>
        </section>
        <section
          id="about me"
          className="flex flex-col items-center my-10 max-900:m-0"
        >
          <h1 className="text-6xl text-[#D3DDEE] mb-8 font-bold max-900:text-5xl max-450:text-4xl text-center">
            About Me
          </h1>
          <p className="text-2xl w-7/12 max-900:w-9/12 max-650:w-10/12 max-[550px]:w-full font-normal max-[550px]:text-xl">
            Hello! I am Adarsh Tiwari, a passionate web developer with a
            background in computer applications. I hold a Bachelor of Computer
            Applications (BCA) from Deen Dayal Upadhyaya Gorakhpur University.
            <br />
            <br />
            My journey in web development began during my college days, where I
            worked on various projects that sparked my interest in creating
            dynamic and user-friendly websites. Notable among these are a pizza
            ordering website and a news article platform, both of which allowed
            me to refine my development skills and gain practical experience.
            <br />
            <br />
            I am driven by a love for problem-solving and a desire to build
            efficient, aesthetically pleasing web solutions. I find joy in the
            process of turning ideas into reality through code, and I am always
            eager to learn and adapt to new technologies.
            <br />
            <br />
            Looking ahead, I aim to continue growing as a full-stack developer,
            taking on challenging projects that push the boundaries of my
            knowledge. My ultimate goal is to leverage my skills to contribute
            to innovative tech solutions that make a meaningful impact.
          </p>
        </section>
        <section
          id="projects"
          className="text-center w-11/12 max-900:w-full flex items-center flex-col"
        >
          <h1 className="text-6xl text-[#D3DDEE] font-bold max-900:text-5xl max-900:m-0 max-450:text-4xl mb-4">
            My Projects
          </h1>
          <p className="text-2xl w-7/12 max-900:xl max-650:w-full max-450:text-lg">
            We put your ideas and thus your wishes in the form of a unique web
            project that inspires you and you customers.
          </p>

          <div className="projectCardCollection">
            <div className="projectWidget">
              <div className="projectCard glass-card border border-[#ffffff1a]">
                <iframe src="https://the-indian-times.vercel.app/"></iframe>
              </div>
              <a
                href="https://the-indian-times.vercel.app/"
                className="onHover"
              >
                <div className="gap">
                  <h1>News Article</h1>
                  <p>Project was about precision and information</p>
                </div>
                <FaArrowCircleRight />
              </a>
            </div>
            <div className="projectWidget">
              <div className="projectCard glass-card border border-[#ffffff1a]">
                <iframe src="https://pizza-website-sooty.vercel.app/"></iframe>
              </div>
              <a
                href="https://pizza-website-sooty.vercel.app/"
                className="onHover"
              >
                <div className="gap">
                  <h1>Pizza</h1>
                  <p>Project was about precision and information</p>
                </div>
                <FaArrowCircleRight />
              </a>
            </div>
          </div>
        </section>
        <section
          id="skills"
          className="flex flex-col text-center items-center my-20 max-900:m-0"
        >
          <h1 className="text-6xl text-[#D3DDEE] font-bold max-900:text-5xl max-900:m-0 max-450:text-4xl mb-4">
            My Skills
          </h1>
          <p className="skillsDescription text-2xl w-8/12 max-900:xl max-650:w-full max-450:text-lg">
            I put your ideas and thus your wishes into the form of a unique web
            project that inspires you and your customers.
          </p>
          <div className="skillsCardCollection flex gap-7 flex-wrap  justify-center mt-16">
            {data.map((value) => (
              <div className="skillWidget flex flex-col gap-4" key={value.name}>
                <div className="skillsCard w-44 h-44 border border-[#ffffff1a] rounded-xl flex flex-col justify-around items-center transition-all duration-500 ease-in-out  hover:border border-[#e2e8f0] glass-card hover:scale-[1.1] ">
                  <img src={value.img} alt={value.name} className="w-1/2 " />
                  <p className="text-2xl mb-2">{value.percentage}</p>
                </div>
                <p className="text-2xl text-white">{value.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          id="contact me"
          className=" text-center w-11/12 max-900:w-full flex items-center"
        >
          <div className="content flex w-full justify-center items-center  max-900:flex-col gap-8 max-900:gap-12">
            <>
              <div className="w-full max-w-[40%] max-900:max-w-[65%] max-650:max-w-[90%] max-450:max-w-[100%] border-2 backdrop-blur-[10px] border-[#ffffff2a] bg-[#ffffff1a] rounded-lg shadow-md p-6">
                <h2 className="text-5xl font-bold text-white mb-6 max-650:text-4xl">
                  Drop your Contact
                </h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={formData.name}
                    className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 text-xl max-450:text-lg"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 text-xl max-450:text-lg"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 text-xl max-450:text-lg"
                    placeholder="Phone Number"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-gray-100 h-32 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 text-xl max-450:text-lg"
                    placeholder="Message"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 text-2xl max-450:text-xl"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </>
            <div className="myContactDetails flex flex-col justify-center items-center w-full gap-4 max-900:mb-4">
              <h1 className="text-5xl max-650:text-4xl">Adarsh Tiwari</h1>
              <span className="myPhoneNo flex justify-center items-center gap-3">
                <a
                  href="tel:+919555350284"
                  className="text-3xl max-650:text-2xl"
                >
                  +91 95553-50284
                </a>
              </span>
              <span className="myEmail flex justify-center items-center  gap-3">
                <a
                  href="mailto:at.wrath9616@gmail.com"
                  className="text-3xl  max-650:text-2xl"
                >
                  at.wrath9616@gmail.com
                </a>
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
