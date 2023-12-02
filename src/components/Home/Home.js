import React, { useState , useEffect} from "react";
import "./Home.css";
import Slider from "react-slick";
import '../common-components/slick';
import settings, { carousel } from "../common-components/slick";
import { NavLink } from "react-router-dom";

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isUser, setIsUser] = useState(false);
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticatedUser');
        if (isAuthenticated === 'true') {
          setIsUser(true);
        }
      }, []);

    const items = [
        {
            src: "https://t3.ftcdn.net/jpg/03/09/59/80/360_F_309598037_FrfMLAfTQrstsVg5SZMaGH1Uef6s69EB.jpg",
            caption: "Assignments"        
        },
        {
            src: "https://img.freepik.com/premium-vector/quiz-symbol-neon-illustration-night-isolated-design-elements_168425-181.jpg",
            caption: "Quizzes",
            toroute: isUser ? '/quiz' : '/'       
         },
        {
            src: "https://uploads-ssl.webflow.com/60b8bc3a2747671228dc5a32/6177ca0a1c7d002ff87054c0_post%2016%20young%20people%20wellbeing%20workshop-p-1080.jpeg",
            caption: "Workshops"
        }
    ];

    const filteredItems = items.filter(item => 
        item.caption.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(prevSearchTerm => e.target.value);
    };
    

    return (
        <div>
            <div className="searchInput_Container">
                <input
                    id="searchInput"
                    type="text"
                    placeholder="Type here to search courses"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className="btn btn-success w-10" type="submit">
                    Search
                </button>
            </div>
            <Slider {...carousel}>
                <div className="home-images">
                    <img src="https://www.verywellmind.com/thmb/BCSbXade5vJqDHOdQPJcnc11oqs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-517044699-5aa5ed828e1b6e003672dc54.jpg" alt="course" />
                </div>
                <div className="home-images">
                    <img src="https://blog-media.byjusfutureschool.com/bfs-blog/2022/04/22062735/Article-Page-3-2.png" alt="course" />
                </div>
                <div className="home-images">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwGuIrld5JBrLq-FORZK3rmE7cxZUzVqs8Q&usqp=CAU" alt="course" />
                </div>
                <div className="home-images">
                    <img src="https://www.reactive-executive.com/wp-content/uploads/2023/02/quel-est-le-role-du-manager-management-et-sa-hierarchie-Reactive-Executive.webp" alt="course" />
                </div>
            </Slider>
            <br></br>
            <h2>Learnings</h2>
            <Slider {...settings}>
                {filteredItems.map(item => (
                    <NavLink to={item.toroute} className="home-image-wrapper" key={item.caption} >
                        <img src={item.src} alt={item.caption} />
                        <div className="caption">{item.caption}</div>
                    </NavLink>
                ))}
            </Slider>
        </div>
    );
}

export default Home;
